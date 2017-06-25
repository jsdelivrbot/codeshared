import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage } from './../pages';
import { EliteApiProvider } from './../../providers/providers';
import * as R from 'ramda';


/**
 * Generated class for the TeamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-teams',
    templateUrl: 'teams.html',
})
export class TeamsPage {
    public allTeams: any;
    public allTeamDivisions: any;
    public teams: Array<any> = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public loadingController: LoadingController,
        public eliteApi: EliteApiProvider) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TeamsPage');

        let selectedTourney = this.navParams.data;
        let loader = this.loadingController.create({
            content: 'Getting data...'
        });

        loader.present().then(() => {
            this.eliteApi.getTournamentData(selectedTourney.id).subscribe(
                (data) => {
                    this.allTeams = data.teams;
                    let transform = R.compose(
                        R.map(R.zipObj(['divisionName', 'divisionTeams'])), 
                        R.toPairs, 
                        R.groupBy(R.prop('division')) 
                    );
                    this.allTeamDivisions = transform(data.teams);
                    this.teams = this.allTeamDivisions;
                    loader.dismiss();
                },
                (error) => {
                    console.log("Error get getTournamentData");
                },
                () => {

                }
            );
        });
    }

    itemTapped($event, team) {
        this.navCtrl.push(TeamHomePage);
    }

}
