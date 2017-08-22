import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';

@Component({
    selector: 'p4w-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    pageTitle = 'Party For Weekend, Enjoy ^__^';
    count = 0;

    constructor(private title: Title) { }

    ngOnInit() {
        this.title.setTitle(this.pageTitle);
    }
}
