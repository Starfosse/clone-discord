/*
  Warnings:

  - You are about to drop the column `ImageUrl` on the `Server` table. All the data in the column will be lost.
  - You are about to drop the column `ImageUrl` on the `User` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "stateList" AS ENUM ('ONLINE', 'ABSENT', 'BUSY', 'OFFLINE');

-- AlterTable
ALTER TABLE "Server" DROP COLUMN "ImageUrl",
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ImageUrl",
ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "state" "stateList" NOT NULL DEFAULT 'OFFLINE';
