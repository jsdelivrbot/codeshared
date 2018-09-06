import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { interval } from 'rxjs/observable/interval';
import { merge } from 'rxjs/observable/merge';
import { mapTo } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  click$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  clock;

  constructor(store: Store<any>) {
    this.clock = store.select('clock');
    merge(
      this.click$.pipe(mapTo('hour')),
      interval(5000).pipe(mapTo('seconds'))
    ).subscribe(type => store.dispatch({ type }));
  }
}
