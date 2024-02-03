/*
  Warnings:

  - You are about to drop the column `details` on the `log` table. All the data in the column will be lost.
  - Added the required column `rawInput` to the `log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rawOutput` to the `log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "log" DROP COLUMN "details",
ADD COLUMN     "rawInput" JSONB NOT NULL,
ADD COLUMN     "rawOutput" JSONB NOT NULL;
