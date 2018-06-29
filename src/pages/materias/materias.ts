import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NivelPage } from '../nivel/nivel';

@Component({
  selector: 'page-materias',
  templateUrl: 'materias.html',
})
export class MateriasPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  
  }
  goToNivel(nivel){
    this.navCtrl.push(NivelPage, 
      
      {title: nivel});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformacionPage');
  }

}
