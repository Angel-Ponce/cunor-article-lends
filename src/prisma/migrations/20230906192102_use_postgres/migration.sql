-- CreateTable
CREATE TABLE "Institution" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3) DEFAULT null,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhisicalState" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "institutionId" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3) DEFAULT null,

    CONSTRAINT "PhisicalState_pkey" PRIMARY KEY ("id")
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
    "deletedAt" TIMESTAMP(3) DEFAULT null,

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
    "deletedAt" TIMESTAMP(3) DEFAULT null,

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
    "deletedAt" TIMESTAMP(3) DEFAULT null,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lend" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "realDueDate" TIMESTAMP(3) DEFAULT null,
    "institutionId" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3) DEFAULT null,

    CONSTRAINT "Lend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleLend" (
    "lendId" INTEGER NOT NULL,
    "initialPhisicalStateId" INTEGER NOT NULL,
    "finalPhisicalStateId" INTEGER DEFAULT null,
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
