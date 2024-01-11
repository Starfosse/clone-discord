-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ChannelGroup" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "MemberRole" ADD COLUMN     "create_Remove_Channel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "download_Channel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "edit_Channel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "edit_Server" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "expulsate_Member" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "invite_Member" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role_Management" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "speak_Channel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "video_Channel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "view_Channel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "view_Logs" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "write_Channel" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "LogServer" (
    "id" TEXT NOT NULL,
    "log" TEXT[],
    "logDate" TIMESTAMP(3)[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogServer_pkey" PRIMARY KEY ("id")
);
