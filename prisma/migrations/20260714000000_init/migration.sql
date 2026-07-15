-- CreateEnum
CREATE TYPE "LinkMode" AS ENUM ('LANDING', 'REDIRECT');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('VIEW', 'OUT_CLICK');

-- CreateTable
CREATE TABLE "ShortLink" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "venue" TEXT,
    "eventDate" TIMESTAMP(3),
    "targetUrl" TEXT NOT NULL,
    "mode" "LinkMode" NOT NULL DEFAULT 'LANDING',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "views" INTEGER NOT NULL DEFAULT 0,
    "outClicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShortLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkEvent" (
    "id" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "userAgent" TEXT,
    "referrer" TEXT,
    "ipHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LinkEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortLink_slug_key" ON "ShortLink"("slug");

-- CreateIndex
CREATE INDEX "LinkEvent_linkId_createdAt_idx" ON "LinkEvent"("linkId", "createdAt");

-- CreateIndex
CREATE INDEX "LinkEvent_type_createdAt_idx" ON "LinkEvent"("type", "createdAt");

-- AddForeignKey
ALTER TABLE "LinkEvent" ADD CONSTRAINT "LinkEvent_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "ShortLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;
