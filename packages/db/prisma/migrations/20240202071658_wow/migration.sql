-- DropForeignKey
ALTER TABLE "membership" DROP CONSTRAINT "membership_teamId_fkey";

-- AddForeignKey
ALTER TABLE "membership" ADD CONSTRAINT "membership_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
