import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the EliteApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EliteApiProvider {
  private baseUrl = 'https://elite-schedule-app-i2-64179.firebaseio.com';
  currentTourney: any = {};
  private tourneyData = {};

  constructor(public http: Http) {
    console.log('Hello EliteApiProvider Provider');
  }

  getTournaments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tournaments.json`)
    .map(data => data.json());
  }

  getTournamentData(tourneyId, forceRefresh: boolean = false): Observable<any> {
    return;
  }

  getCurrentTourney() {
    return this.currentTourney;
  }

  refreshCurrentTourney() {
    return this.getTournamentData(this.currentTourney.tournament.id, true);
  }

}
