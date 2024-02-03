/*
  Warnings:

  - The values [USER] on the enum `UserPermissionRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserPermissionRole_new" AS ENUM ('MEMBER', 'ADMIN');
ALTER TABLE "membership" ALTER COLUMN "role" TYPE "UserPermissionRole_new" USING ("role"::text::"UserPermissionRole_new");
ALTER TYPE "UserPermissionRole" RENAME TO "UserPermissionRole_old";
ALTER TYPE "UserPermissionRole_new" RENAME TO "UserPermissionRole";
DROP TYPE "UserPermissionRole_old";
COMMIT;
