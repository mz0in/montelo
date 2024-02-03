/*
  Warnings:

  - A unique constraint covering the columns `[name,teamId]` on the table `project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "project_name_teamId_key" ON "project"("name", "teamId");
