import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logOutClick } from "@/lib/analytics";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const link = await prisma.shortLink.findUnique({ where: { slug } });
  if (!link || !link.active) {
    return NextResponse.redirect(new URL("/", _request.url));
  }
  await logOutClick(link.id);
  return NextResponse.redirect(link.targetUrl, 302);
}
