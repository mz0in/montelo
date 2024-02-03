/*
  Warnings:

  - You are about to drop the column `session_id` on the `log` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "log" DROP COLUMN "session_id",
DROP COLUMN "userId";
