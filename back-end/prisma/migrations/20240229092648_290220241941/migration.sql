/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `type` on the `ExpenseCategory` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Income` table. All the data in the column will be lost.
  - Added the required column `budgetId` to the `IncomeItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Item_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Item";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ExpenseItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" REAL DEFAULT 0.00,
    "categoryId" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    CONSTRAINT "ExpenseItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ExpenseCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExpenseItem_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_IncomeItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" REAL DEFAULT 0.00,
    "incomeId" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    CONSTRAINT "IncomeItem_incomeId_fkey" FOREIGN KEY ("incomeId") REFERENCES "Income" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IncomeItem_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_IncomeItem" ("id", "incomeId", "name", "value") SELECT "id", "incomeId", "name", "value" FROM "IncomeItem";
DROP TABLE "IncomeItem";
ALTER TABLE "new_IncomeItem" RENAME TO "IncomeItem";
CREATE TABLE "new_ExpenseCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    CONSTRAINT "ExpenseCategory_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExpenseCategory" ("budgetId", "id", "name") SELECT "budgetId", "id", "name" FROM "ExpenseCategory";
DROP TABLE "ExpenseCategory";
ALTER TABLE "new_ExpenseCategory" RENAME TO "ExpenseCategory";
CREATE UNIQUE INDEX "ExpenseCategory_name_key" ON "ExpenseCategory"("name");
CREATE TABLE "new_Income" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    CONSTRAINT "Income_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Income" ("budgetId", "id", "name") SELECT "budgetId", "id", "name" FROM "Income";
DROP TABLE "Income";
ALTER TABLE "new_Income" RENAME TO "Income";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseItem_name_key" ON "ExpenseItem"("name");
