import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})

export class PerfilPage {

  usuario = {
    nombre: "Angelo",
    apellido: "Raso",
    legajo: "05-5124-4",
    anio: "5to",
    promedio: 8.30,
  }

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
    console.log('ionViewDidLoad PerfilPage');
  }

}
