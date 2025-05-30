type CourseType = {
  title: string;
  url: string;
  seats: number;
  userId: number;
};

type UpdateCourseType = {
  title: string | undefined;
  url: string | undefined;
  seats: string | undefined;
  userId: number;
  courseId: number;
};

type PurchaseCourseType = {
  courseId: number;
  userId: number;
};
