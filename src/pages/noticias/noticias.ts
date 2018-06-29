import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html',
})

export class NoticiasPage {  
  constructor(public navCtrl: NavController) {   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformacionPage');
  }

}
