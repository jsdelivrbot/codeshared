import { Component, OnInit, Input } from '@angular/core';
import { Courses } from '../student.model';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() heading: string;
  @Input() email: string;
  @Input() classes: Array<Courses>;
  constructor() { }

  ngOnInit() {
  }

}
