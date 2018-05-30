import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SuperTabsController } from 'ionic2-super-tabs';
import { NivelPage } from '../nivel/nivel';


/**
 * Generated class for the InformacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-materias',
  templateUrl: 'materias.html',
})
export class MateriasPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private superTabsCtrl: SuperTabsController) {
  
  
  }


  goToNivel(nivel:string){
    this.navCtrl.push(NivelPage, 
      
      {title: nivel});
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
