export interface Student {
  name: string;
  email: string;
  classes: Array<number | Courses>;
}

export interface Courses {
  id: number;
  name: string;
  professor: string;
  students?: Array<Student>;
}
