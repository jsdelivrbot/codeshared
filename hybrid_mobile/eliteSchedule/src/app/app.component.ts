import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyTeamsPage, ListPage } from './../pages/pages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;
  favoriteTeams: any = [
    {
      team: "Bayer Munich",
      tournamentId: 1,
      tournamentName: "Bundesliga"
    },
    {
      team: "Real Madrid",
      tournamentId: 2,
      tournamentName: "La Liga"
    },
    {
      team: "Arsenal",
      tournamentId: 3,
      tournamentName: "Premier League"
    },
    {
      team: "Borussia Dortmund",
      tournamentId: 1,
      tournamentName: "Bundesliga"
    }
  ]

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar,
    public loadingController: LoadingController, 
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: MyTeamsPage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTeam(favorite) {
    let loader = this.loadingController.create({
      content: "Getting data ...",
      dismissOnPageChange: true
    });
    loader.present();
    
  }
}
