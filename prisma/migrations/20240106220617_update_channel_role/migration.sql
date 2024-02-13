-- AlterTable
ALTER TABLE "MemberRole" ADD COLUMN     "channelId" TEXT;

-- CreateIndex
CREATE INDEX "MemberRole_channelId_idx" ON "MemberRole"("channelId");
