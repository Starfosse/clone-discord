-- CreateTable
CREATE TABLE "UserFriend" (
    "id" TEXT NOT NULL,
    "userOneId" TEXT NOT NULL,
    "userTwoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFriend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserFriend_userOneId_idx" ON "UserFriend"("userOneId");

-- CreateIndex
CREATE INDEX "UserFriend_userTwoId_idx" ON "UserFriend"("userTwoId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFriend_userOneId_userTwoId_key" ON "UserFriend"("userOneId", "userTwoId");
