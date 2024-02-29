/*
  Warnings:

  - You are about to drop the column `categoryId` on the `ExpenseItem` table. All the data in the column will be lost.
  - Added the required column `expenseCategoryId` to the `ExpenseItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExpenseItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" REAL DEFAULT 0.00,
    "expenseCategoryId" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    CONSTRAINT "ExpenseItem_expenseCategoryId_fkey" FOREIGN KEY ("expenseCategoryId") REFERENCES "ExpenseCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExpenseItem_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExpenseItem" ("budgetId", "id", "name", "value") SELECT "budgetId", "id", "name", "value" FROM "ExpenseItem";
DROP TABLE "ExpenseItem";
ALTER TABLE "new_ExpenseItem" RENAME TO "ExpenseItem";
CREATE UNIQUE INDEX "ExpenseItem_name_key" ON "ExpenseItem"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
