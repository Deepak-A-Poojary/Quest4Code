/*
  Warnings:

  - You are about to drop the column `complieout` on the `TestCaseResult` table. All the data in the column will be lost.
  - You are about to drop the column `sterror` on the `TestCaseResult` table. All the data in the column will be lost.
  - You are about to drop the column `stout` on the `TestCaseResult` table. All the data in the column will be lost.
  - You are about to drop the column `testNumber` on the `TestCaseResult` table. All the data in the column will be lost.
  - Changed the type of `status` on the `Submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `testCaseNumber` to the `TestCaseResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL;

-- AlterTable
ALTER TABLE "TestCaseResult" DROP COLUMN "complieout",
DROP COLUMN "sterror",
DROP COLUMN "stout",
DROP COLUMN "testNumber",
ADD COLUMN     "compileOutput" TEXT,
ADD COLUMN     "stderr" TEXT,
ADD COLUMN     "stdout" TEXT,
ADD COLUMN     "testCaseNumber" INTEGER NOT NULL;
