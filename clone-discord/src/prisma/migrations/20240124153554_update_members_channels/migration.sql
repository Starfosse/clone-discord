/*
  Warnings:

  - Added the required column `channelId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "channelId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Member_channelId_idx" ON "Member"("channelId");
