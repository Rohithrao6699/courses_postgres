-- CreateTable
CREATE TABLE "Users_Purchasedcourses" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Users_Purchasedcourses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Users_Purchasedcourses" ADD CONSTRAINT "Users_Purchasedcourses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Purchasedcourses" ADD CONSTRAINT "Users_Purchasedcourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
