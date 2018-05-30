import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SuperTabsController } from 'ionic2-super-tabs';

import { Observable } from 'rxjs/Rx';  
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html',
})

export class NoticiasPage {  
  public posts: Observable<any[]>;

  constructor(public navCtrl: NavController,
              private superTabsCtrl: SuperTabsController) {   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformacionPage');
  }

  showToolbar() {
    this.superTabsCtrl.showToolbar(true);
  }

  hideToolbar() {
    this.superTabsCtrl.showToolbar(false);
  }

  ionViewWillLeave(){
    this.hideToolbar(); 
  }

  ionViewWillEnter(){
    this.showToolbar(); 
 }

}
