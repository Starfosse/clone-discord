-- AlterTable
ALTER TABLE "inputChat" ADD COLUMN     "unSeenByUseTwo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "unSeenByUserOne" BOOLEAN NOT NULL DEFAULT true;
