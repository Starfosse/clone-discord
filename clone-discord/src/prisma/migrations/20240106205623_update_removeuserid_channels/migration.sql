/*
  Warnings:

  - You are about to drop the column `userId` on the `Channel` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Channel_userId_idx";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "userId";
