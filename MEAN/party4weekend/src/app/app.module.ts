import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
// import { NgSemanticModule } from 'ng-semantic';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AuthService } from './auth/auth.service';
import { AuthHttpFactory } from './auth/auth-http.factory';
import { CallbackComponent } from './pages/callback/callback.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        CallbackComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [
        Title, AuthService,
        {
            provide: AuthHttp,
            useFactory: AuthHttpFactory,
            deps: [Http, RequestOptions]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
