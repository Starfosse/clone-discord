-- CreateTable
CREATE TABLE "InputChannel" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InputChannel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InputChannel_channelId_idx" ON "InputChannel"("channelId");
