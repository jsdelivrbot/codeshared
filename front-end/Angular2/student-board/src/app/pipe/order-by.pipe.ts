import { Pipe, PipeTransform } from '@angular/core';
import { Student, Courses } from '../student.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: { students: Array<Student>, courses: Array<Courses> }, orderCriteria: string = 'student'): any {
    switch (orderCriteria) {
      case 'student':
        return this.orderByStudent(value);
      case 'course':
        return this.orderByCourse(value);
    }
  }

  private orderByStudent(value: { students: Array<Student>, courses: Array<Courses> }): any {
    const transformStudent: Array<Student> = JSON.parse(JSON.stringify(value.students));
    value.students.forEach((student: Student, index: number) => {
      transformStudent[index].classes = [];
      student.classes.forEach(id => {
        transformStudent[index].classes.push(... value.courses.filter(course => course.id === id));
      });
    });
    console.log('transformStudent = ', transformStudent);
    return transformStudent;
  }

  private orderByCourse(value: { students: Array<Student>, courses: Array<Courses> }): any {
    const transformCourses: Array<Courses> = JSON.parse(JSON.stringify(value.courses));
    value.students.forEach((student: Student, index: number) => {
      student.classes.forEach(id => {
        transformCourses.filter(course => course.id === id)[0].student.push(student);
      });
    });
    return transformCourses;
  }

}
