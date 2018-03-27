import { Component, OnInit } from '@angular/core';
import { StudentService } from './services/student.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public student$: Observable<Object>;

  constructor(private students: StudentService) { }

  public ngOnInit(): void {
    this.student$ = forkJoin(
      this.students.getStudents(),
      this.students.getCourses()
    ).pipe(
      map(([students, courses]) => ({
        students: students,
        courses: courses
      }))
    );
  }

  public objectKeys(object: Object): Array<any> {
    return object ? Object.keys(object) : [];
  }
}

