import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamsPage } from './../pages';
import { EliteApiProvider } from './../../providers/providers';

/**
 * Generated class for the TournamentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-tournaments',
    templateUrl: 'tournaments.html',
})
export class TournamentsPage {
    tournaments: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loadingController: LoadingController,
                public eliteApi: EliteApiProvider) {
            console.log("loading Tournaments Controller");
    }

    itemTapped($event, tourney) {
        this.navCtrl.push(TeamsPage, tourney);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TournamentsPage');

        let loader = this.loadingController.create({
            content: "Getting tournament"
        });

        loader.present().then(() => {
            this.eliteApi.getTournaments()
                .subscribe(
                (data) => {
                    this.tournaments = data;
                },
                (error) => {
                    console.log("Error get tournaments");
                },
                () => {
                    loader.dismiss();
                }
                );
        });
    }

}
