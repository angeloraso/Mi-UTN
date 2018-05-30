import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { SuperTabsController } from 'ionic2-super-tabs';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the InformacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-institucion',
  templateUrl: 'institucion.html',
})
export class InstitucionPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private superTabsCtrl: SuperTabsController,
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
