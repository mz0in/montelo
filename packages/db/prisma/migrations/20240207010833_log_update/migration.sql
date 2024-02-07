/*
  Warnings:

  - You are about to drop the column `apiKey` on the `log` table. All the data in the column will be lost.
  - Added the required column `envId` to the `log` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "createdAt";

-- AlterTable
ALTER TABLE "log" DROP COLUMN "apiKey",
ADD COLUMN     "envId" TEXT NOT NULL;
