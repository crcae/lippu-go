"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LinkMode } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { isReservedSlug, normalizeSlug } from "@/lib/slug";
import { validateTargetUrl } from "@/lib/target-url";

function optionalString(formData: FormData, name: string): string | null {
  const value = String(formData.get(name) || "").trim();
  return value ? value : null;
}

function parseDate(value: string): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function readLinkPayload(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const rawSlug = String(formData.get("slug") || title).trim();
  const slug = normalizeSlug(rawSlug);
  const targetUrlInput = String(formData.get("targetUrl") || "").trim();
  const mode: LinkMode = String(formData.get("mode") || "LANDING") === "REDIRECT" ? LinkMode.REDIRECT : LinkMode.LANDING;
  const active = formData.get("active") === "on";
  const description = optionalString(formData, "description");
  const venue = optionalString(formData, "venue");
  const eventDate = parseDate(String(formData.get("eventDate") || ""));

  if (!title) throw new Error("El título es obligatorio.");
  if (!slug || isReservedSlug(slug)) throw new Error("El slug no es válido o está reservado.");

  const targetUrl = validateTargetUrl(targetUrlInput);
  if (!targetUrl.ok) throw new Error(targetUrl.error);

  return { title, slug, targetUrl: targetUrl.url, mode, active, description, venue, eventDate };
}

export async function createShortLinkAction(formData: FormData) {
  await requireAdmin();
  const payload = readLinkPayload(formData);
  await prisma.shortLink.create({ data: payload });
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateShortLinkAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const payload = readLinkPayload(formData);
  await prisma.shortLink.update({ where: { id }, data: payload });
  revalidatePath("/admin");
  revalidatePath(`/${payload.slug}`);
  redirect("/admin");
}

export async function deleteShortLinkAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.shortLink.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function toggleShortLinkAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const link = await prisma.shortLink.findUniqueOrThrow({ where: { id } });
  await prisma.shortLink.update({ where: { id }, data: { active: !link.active } });
  revalidatePath("/admin");
}
