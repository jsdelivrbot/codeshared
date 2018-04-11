import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Courses, Student } from '../student.model';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() heading: string;
  @Input() email: string;
  @Input() professor: string;
  @Input() classes: Array<Courses>;
  @Input() students: Array<Student>;
  @Output() addToFav = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  public addToFavFnc(): void {
    this.addToFav.emit(this);
  }

}
