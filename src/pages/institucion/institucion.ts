import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-institucion',
  templateUrl: 'institucion.html',
})
export class InstitucionPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private afAuth :  AngularFireAuth,) {
  }

  salir(){
    let confirm = this.alertCtrl.create({
      title: 'Desea cerrar su sesión?',
      buttons: [
      {
          text: 'Cancelar',
          handler: () => {
              console.log('Cancelar clicked');
          }
      },
      {
          text: 'Aceptar',
          handler: () => {
            this.afAuth.auth.signOut().then(()=>{

            }
            )}
      }
      ]
  });
  confirm.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformacionPage');
  }

}
