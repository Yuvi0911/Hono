/*
  Warnings:

  - Added the required column `name` to the `video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "video" ADD COLUMN     "name" TEXT NOT NULL;
