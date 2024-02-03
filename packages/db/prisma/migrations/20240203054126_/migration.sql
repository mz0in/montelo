/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `api_key` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "api_key_key_key" ON "api_key"("key");
