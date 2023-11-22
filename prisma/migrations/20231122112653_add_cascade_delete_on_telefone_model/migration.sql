-- DropForeignKey
ALTER TABLE "Telefone" DROP CONSTRAINT "Telefone_userId_fkey";

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
