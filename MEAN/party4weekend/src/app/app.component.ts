import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'p4w-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'p4w';
    navOpen: boolean;
    minHeight: string;
    private _initWinHeight = 0;

    constructor(private auth: AuthService) {
        console.log('APP COMPONENT CONSTRUCTOR');
        // Check for authentication and handle if hash present
        auth.handleAuth();
    }

    ngOnInit(): void {
        Observable.fromEvent(window, 'resize')
            .debounceTime(200)
            .subscribe((event) => {
                this._resizeFnc(event);
            });
        this._initWinHeight = window.innerHeight;
        this._resizeFnc(null);
    }

    navToggledHandler(e: boolean) {
        this.navOpen = e;
    }

    private _resizeFnc(e) {
        const winHeight: number = e ? e.target.innerHeight : this._initWinHeight;
        this.minHeight = `${winHeight}px`;
    }
}
