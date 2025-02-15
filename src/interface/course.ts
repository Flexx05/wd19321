interface ICourse {
  id: string;
  courseName: string;
  views: number;
  thumbnail: string;
  note: string;
  category: string;
}

export default ICourse;
export type CourseInput = Omit<ICourse, "id" | "views" | "note">;
