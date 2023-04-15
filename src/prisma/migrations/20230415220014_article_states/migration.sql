/*
  Warnings:

  - You are about to drop the column `finalPhisicalStateId` on the `lend` table. All the data in the column will be lost.
  - You are about to drop the column `initialPhisicalStateId` on the `lend` table. All the data in the column will be lost.
  - Added the required column `initialPhisicalStateId` to the `ArticleLend` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` MODIFY `deletedAt` DATETIME(3) NULL DEFAULT null;

-- AlterTable
ALTER TABLE `articlelend` ADD COLUMN `finalPhisicalStateId` INTEGER NULL DEFAULT null,
    ADD COLUMN `initialPhisicalStateId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `institution` MODIFY `deletedAt` DATETIME(3) NULL DEFAULT null;

-- AlterTable
ALTER TABLE `lend` DROP COLUMN `finalPhisicalStateId`,
    DROP COLUMN `initialPhisicalStateId`,
    MODIFY `realDueDate` DATETIME(3) NULL DEFAULT null,
    MODIFY `deletedAt` DATETIME(3) NULL DEFAULT null;

-- AlterTable
ALTER TABLE `phisicalstate` MODIFY `deletedAt` DATETIME(3) NULL DEFAULT null;

-- AlterTable
ALTER TABLE `professor` MODIFY `deletedAt` DATETIME(3) NULL DEFAULT null;

-- AlterTable
ALTER TABLE `user` MODIFY `deletedAt` DATETIME(3) NULL DEFAULT null;
