-- AlterTable
ALTER TABLE `lend` MODIFY `realDueDate` DATETIME(3) NULL DEFAULT null,
    MODIFY `finalPhisicalStateId` INTEGER NULL DEFAULT null;
