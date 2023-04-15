-- AlterTable
ALTER TABLE `article` ADD COLUMN `deletedAt` DATETIME(3) NULL DEFAULT null;

-- AlterTable
ALTER TABLE `institution` ADD COLUMN `deletedAt` DATETIME(3) NULL DEFAULT null;

-- AlterTable
ALTER TABLE `lend` ADD COLUMN `deletedAt` DATETIME(3) NULL DEFAULT null,
    MODIFY `realDueDate` DATETIME(3) NULL DEFAULT null,
    MODIFY `finalPhisicalStateId` INTEGER NULL DEFAULT null;

-- AlterTable
ALTER TABLE `phisicalstate` ADD COLUMN `deletedAt` DATETIME(3) NULL DEFAULT null;

-- AlterTable
ALTER TABLE `professor` ADD COLUMN `deletedAt` DATETIME(3) NULL DEFAULT null;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `deletedAt` DATETIME(3) NULL DEFAULT null;
