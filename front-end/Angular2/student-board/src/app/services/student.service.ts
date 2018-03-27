import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class StudentService {

  constructor(private http: HttpClient) { }

  public getStudents(): Observable<any> {
    return this.http.get('./../../assets/students.json').pipe(
      map((res: Response) => res)
    );
  }

  public getCourses(): Observable<any> {
    return this.http.get('./../../assets/courses.json').pipe(
      map((res: Response) => res)
    );
  }

}
