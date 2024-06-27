/*
  Warnings:

  - Changed the type of `productCost` on the `products_table` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "products_table" DROP COLUMN "productCost",
ADD COLUMN     "productCost" DOUBLE PRECISION NOT NULL;
