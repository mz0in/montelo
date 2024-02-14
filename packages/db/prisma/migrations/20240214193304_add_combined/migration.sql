/*
  Warnings:

  - A unique constraint covering the columns `[combined]` on the table `api_key` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `combined` to the `api_key` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "api_key" ADD COLUMN     "combined" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "api_key_combined_key" ON "api_key"("combined");
