import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Rx';  
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html',
})

export class NoticiasPage {  
  public posts: Observable<any[]>;

  constructor(public navCtrl: NavController) {   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformacionPage');
  }

}
