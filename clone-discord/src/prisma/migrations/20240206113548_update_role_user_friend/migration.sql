/*
  Warnings:

  - You are about to drop the column `create_Remove_Channel` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `edit_Channel` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `expulsate_Member` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "create_Remove_Channel",
DROP COLUMN "edit_Channel",
DROP COLUMN "expulsate_Member",
ADD COLUMN     "category_Management" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "channel_Management" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "delete_Input_Channel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "delete_Server" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "expel_Member" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reaction_Channel" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserFriend" ADD COLUMN     "isCalling" BOOLEAN DEFAULT false,
ADD COLUMN     "isRecording" BOOLEAN DEFAULT false;

-- CreateIndex
CREATE INDEX "User_userId_idx" ON "User"("userId");
