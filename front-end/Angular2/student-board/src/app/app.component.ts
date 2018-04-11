import { Component, OnInit } from '@angular/core';
import { StudentService } from './services/student.service';
import {ItemComponent} from './item/item.component';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public student$: Observable<Object>;
  public criteria = 'student';
  public selectedItem: ItemComponent;

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


  public sortByCriteria(criteria: string) {
    switch (criteria) {
      case 'student':
        this.criteria = 'student';
        break;
      case 'course':
        this.criteria = 'course';
        break;
    }
  }

  public addToFavorite() {

  }
}
