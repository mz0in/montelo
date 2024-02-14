/*
  Warnings:

  - Added the required column `viewed` to the `api_key` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "api_key" ADD COLUMN     "viewed" BOOLEAN NOT NULL;
