/*
  Warnings:

  - The primary key for the `MemberRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `channelGroupId` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `channelId` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `create_Remove_Channel` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `download_Channel` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `edit_Channel` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `edit_Server` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `expulsate_Member` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `invite_Member` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `orderServ` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `role_Management` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `serverId` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `speak_Channel` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `video_Channel` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `view_Channel` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `view_Logs` on the `MemberRole` table. All the data in the column will be lost.
  - You are about to drop the column `write_Channel` on the `MemberRole` table. All the data in the column will be lost.
  - Added the required column `MemberId` to the `MemberRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RoleId` to the `MemberRole` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MemberRole_channelGroupId_idx";

-- DropIndex
DROP INDEX "MemberRole_channelId_idx";

-- DropIndex
DROP INDEX "MemberRole_memberId_idx";

-- DropIndex
DROP INDEX "MemberRole_serverId_idx";

-- AlterTable
ALTER TABLE "MemberRole" DROP CONSTRAINT "MemberRole_pkey",
DROP COLUMN "channelGroupId",
DROP COLUMN "channelId",
DROP COLUMN "create_Remove_Channel",
DROP COLUMN "download_Channel",
DROP COLUMN "edit_Channel",
DROP COLUMN "edit_Server",
DROP COLUMN "expulsate_Member",
DROP COLUMN "id",
DROP COLUMN "invite_Member",
DROP COLUMN "memberId",
DROP COLUMN "orderServ",
DROP COLUMN "role",
DROP COLUMN "role_Management",
DROP COLUMN "serverId",
DROP COLUMN "speak_Channel",
DROP COLUMN "video_Channel",
DROP COLUMN "view_Channel",
DROP COLUMN "view_Logs",
DROP COLUMN "write_Channel",
ADD COLUMN     "MemberId" TEXT NOT NULL,
ADD COLUMN     "RoleId" TEXT NOT NULL,
ADD CONSTRAINT "MemberRole_pkey" PRIMARY KEY ("MemberId", "RoleId");

-- CreateTable
CREATE TABLE "ChannelRole" (
    "ChannelId" TEXT NOT NULL,
    "RoleId" TEXT NOT NULL,

    CONSTRAINT "ChannelRole_pkey" PRIMARY KEY ("ChannelId","RoleId")
);

-- CreateTable
CREATE TABLE "ChannelGroupRole" (
    "ChannelGroupId" TEXT NOT NULL,
    "RoleId" TEXT NOT NULL,

    CONSTRAINT "ChannelGroupRole_pkey" PRIMARY KEY ("ChannelGroupId","RoleId")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "orderServ" INTEGER,
    "serverId" TEXT,
    "invite_Member" BOOLEAN NOT NULL DEFAULT false,
    "expulsate_Member" BOOLEAN NOT NULL DEFAULT false,
    "edit_Server" BOOLEAN NOT NULL DEFAULT false,
    "role_Management" BOOLEAN NOT NULL DEFAULT false,
    "view_Logs" BOOLEAN NOT NULL DEFAULT false,
    "create_Remove_Channel" BOOLEAN NOT NULL DEFAULT false,
    "edit_Channel" BOOLEAN NOT NULL DEFAULT false,
    "view_Channel" BOOLEAN NOT NULL DEFAULT false,
    "write_Channel" BOOLEAN NOT NULL DEFAULT false,
    "speak_Channel" BOOLEAN NOT NULL DEFAULT false,
    "video_Channel" BOOLEAN NOT NULL DEFAULT false,
    "download_Channel" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChannelRole_ChannelId_idx" ON "ChannelRole"("ChannelId");

-- CreateIndex
CREATE INDEX "ChannelRole_RoleId_idx" ON "ChannelRole"("RoleId");

-- CreateIndex
CREATE INDEX "ChannelGroupRole_ChannelGroupId_idx" ON "ChannelGroupRole"("ChannelGroupId");

-- CreateIndex
CREATE INDEX "ChannelGroupRole_RoleId_idx" ON "ChannelGroupRole"("RoleId");

-- CreateIndex
CREATE INDEX "Role_serverId_idx" ON "Role"("serverId");

-- CreateIndex
CREATE INDEX "MemberRole_MemberId_idx" ON "MemberRole"("MemberId");

-- CreateIndex
CREATE INDEX "MemberRole_RoleId_idx" ON "MemberRole"("RoleId");
