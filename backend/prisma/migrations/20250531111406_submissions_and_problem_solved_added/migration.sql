/*
  Warnings:

  - You are about to drop the column `complieout` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `sterror` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `stout` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the `TestCasesResult` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `status` on the `Submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "TestCasesResult" DROP CONSTRAINT "TestCasesResult_submissionId_fkey";

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "complieout",
DROP COLUMN "sterror",
DROP COLUMN "stout",
ADD COLUMN     "compileOutput" TEXT,
ADD COLUMN     "stderr" TEXT,
ADD COLUMN     "stdout" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "TestCasesResult";

-- CreateTable
CREATE TABLE "TestCaseResult" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "testNumber" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "stout" TEXT,
    "expected" TEXT NOT NULL,
    "sterror" TEXT,
    "complieout" TEXT,
    "status" "Status" NOT NULL,
    "memory" TEXT,
    "time" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestCaseResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TestCaseResult_submissionId_idx" ON "TestCaseResult"("submissionId");

-- AddForeignKey
ALTER TABLE "TestCaseResult" ADD CONSTRAINT "TestCaseResult_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
