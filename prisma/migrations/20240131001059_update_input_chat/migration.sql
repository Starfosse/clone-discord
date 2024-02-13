-- CreateTable
CREATE TABLE "inputChat" (
    "id" TEXT NOT NULL,
    "isEdit" BOOLEAN DEFAULT false,
    "isGif" BOOLEAN DEFAULT false,
    "message" TEXT NOT NULL,
    "sentByUserOne" BOOLEAN NOT NULL DEFAULT false,
    "sentByUserTwo" BOOLEAN NOT NULL DEFAULT false,
    "userFriendId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inputChat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "inputChat_userFriendId_idx" ON "inputChat"("userFriendId");
