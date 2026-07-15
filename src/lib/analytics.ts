import { createHash } from "crypto";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

function hashIp(value: string | null): string | null {
  if (!value) return null;
  return createHash("sha256").update(value).digest("hex").slice(0, 24);
}

export async function logView(linkId: string): Promise<void> {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent");
  const referrer = headersList.get("referer");
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headersList.get("x-real-ip");

  await prisma.$transaction([
    prisma.shortLink.update({ where: { id: linkId }, data: { views: { increment: 1 } } }),
    prisma.linkEvent.create({
      data: {
        linkId,
        type: "VIEW",
        userAgent: userAgent?.slice(0, 500),
        referrer: referrer?.slice(0, 500),
        ipHash: hashIp(ip),
      },
    }),
  ]);
}

export async function logOutClick(linkId: string): Promise<void> {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent");
  const referrer = headersList.get("referer");
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headersList.get("x-real-ip");

  await prisma.$transaction([
    prisma.shortLink.update({ where: { id: linkId }, data: { outClicks: { increment: 1 } } }),
    prisma.linkEvent.create({
      data: {
        linkId,
        type: "OUT_CLICK",
        userAgent: userAgent?.slice(0, 500),
        referrer: referrer?.slice(0, 500),
        ipHash: hashIp(ip),
      },
    }),
  ]);
}
