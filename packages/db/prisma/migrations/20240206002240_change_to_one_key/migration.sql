/*
  Warnings:

  - A unique constraint covering the columns `[envId]` on the table `api_key` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "api_key_envId_key" ON "api_key"("envId");
