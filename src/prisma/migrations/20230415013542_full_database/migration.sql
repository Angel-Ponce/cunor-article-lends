/*
  Warnings:

  - Added the required column `institutionId` to the `PhisicalState` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PhisicalState" ADD COLUMN     "institutionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Institution" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT,
    "description" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "institutionId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "phisicalStateId" INTEGER NOT NULL,
    "serial" TEXT,
    "institutionId" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT,
    "personalRegister" TEXT NOT NULL,
    "institutionId" INTEGER NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lend" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "realDueDate" TIMESTAMP(3) NOT NULL,
    "initialPhisicalStateId" INTEGER NOT NULL,
    "finalPhisicalStateId" INTEGER NOT NULL,
    "institutionId" INTEGER NOT NULL,

    CONSTRAINT "Lend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleLend" (
    "lendId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "ArticleLend_pkey" PRIMARY KEY ("lendId","articleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Institution_name_key" ON "Institution"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_personalRegister_key" ON "Professor"("personalRegister");

-- AddForeignKey
ALTER TABLE "PhisicalState" ADD CONSTRAINT "PhisicalState_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_phisicalStateId_fkey" FOREIGN KEY ("phisicalStateId") REFERENCES "PhisicalState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lend" ADD CONSTRAINT "Lend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lend" ADD CONSTRAINT "Lend_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lend" ADD CONSTRAINT "Lend_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleLend" ADD CONSTRAINT "ArticleLend_lendId_fkey" FOREIGN KEY ("lendId") REFERENCES "Lend"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleLend" ADD CONSTRAINT "ArticleLend_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
