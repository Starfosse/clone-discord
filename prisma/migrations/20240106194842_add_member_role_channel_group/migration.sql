/*
  Warnings:

  - You are about to drop the column `role` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "channelGroupId" TEXT;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "role";

-- DropEnum
DROP TYPE "MemberRole";

-- CreateTable
CREATE TABLE "ChannelGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberRole" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "channelGroupId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "MemberRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChannelGroup_serverId_idx" ON "ChannelGroup"("serverId");

-- CreateIndex
CREATE INDEX "MemberRole_channelGroupId_idx" ON "MemberRole"("channelGroupId");

-- CreateIndex
CREATE INDEX "MemberRole_serverId_idx" ON "MemberRole"("serverId");

-- CreateIndex
CREATE INDEX "MemberRole_memberId_idx" ON "MemberRole"("memberId");

-- CreateIndex
CREATE INDEX "Channel_channelGroupId_idx" ON "Channel"("channelGroupId");
