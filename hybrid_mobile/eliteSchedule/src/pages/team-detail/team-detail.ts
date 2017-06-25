import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApiProvider } from './../../providers/providers';

/**
 * Generated class for the TeamDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-team-detail',
    templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

    games: any[];
    team: any[];
    private tourneyData: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public eliteApi: EliteApiProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TeamDetailPage');
        
    }

}
