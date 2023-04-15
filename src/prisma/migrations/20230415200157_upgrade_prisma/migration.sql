-- AlterTable
ALTER TABLE `article` MODIFY `deletedAt` DATETIME(3) NULL DEFAULT null;

-- AlterTable
ALTER TABLE `institution` MODIFY `deletedAt` DATETIME(3) NULL DEFAULT null;

-- AlterTable
ALTER TABLE `lend` MODIFY `realDueDate` DATETIME(3) NULL DEFAULT null,
    MODIFY `finalPhisicalStateId` INTEGER NULL DEFAULT null,
    MODIFY `deletedAt` DATETIME(3) NULL DEFAULT null;

-- AlterTable
ALTER TABLE `phisicalstate` MODIFY `deletedAt` DATETIME(3) NULL DEFAULT null;

-- AlterTable
ALTER TABLE `professor` MODIFY `deletedAt` DATETIME(3) NULL DEFAULT null;

-- AlterTable
ALTER TABLE `user` MODIFY `deletedAt` DATETIME(3) NULL DEFAULT null;
