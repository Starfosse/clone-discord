/*
  Warnings:

  - Added the required column `userId` to the `InputChannel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InputChannel" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "InputChannel_userId_idx" ON "InputChannel"("userId");
