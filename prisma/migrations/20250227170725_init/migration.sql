/*
  Warnings:

  - You are about to drop the column `createAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "createAt",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
