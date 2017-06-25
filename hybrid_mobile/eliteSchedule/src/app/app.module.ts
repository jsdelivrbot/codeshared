import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';

import { TournamentsPageModule } from './../pages/tournaments/tournaments.module';
import { TeamsPageModule } from './../pages/teams/teams.module';
import { StandingPageModule } from './../pages/standing/standing.module';
import { TeamDetailPageModule } from './../pages/team-detail/team-detail.module';
import { TeamHomePageModule } from './../pages/team-home/team-home.module';

import { MyApp } from './app.component';
import { MyTeamsPage } from './../pages/my-teams/my-teams';
import { ListPage } from '../pages/list/list';

import { EliteApiProvider } from '../providers/providers';

@NgModule({
    declarations: [
        MyApp,
        MyTeamsPage,
        ListPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        TeamsPageModule, TournamentsPageModule, TeamHomePageModule, TeamDetailPageModule,
        StandingPageModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        MyTeamsPage,
        ListPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        UserSettingsProvider,
        EliteApiProvider
    ]
})
export class AppModule { }
