import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})

export class PerfilPage {

  following = false;
  user = {
    name: 'Alumno FRLP',
    profileImage: 'assets/icon/user_icon.png',
    coverImage: 'assets/imgs/1er_nivel.jpg',
    occupation: 'Estudiante',
    location: 'Localidad',
    description: 'Alguna descripción opcional',
    materias: 33,
    horas_electivas: 18,
    promedio: 8.30
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.proximamente();
  }

  proximamente() {
    const alert = this.alertCtrl.create({
      title: 'Próximamente!',
      subTitle: 'En este momento el perfil solo es un ejemplo. Próximamente se podrá disfrutar de esta funcionalidad!',
      message: 'Si tenés ganas de participar en su desarrollo o se te ocurren ideas que podría ' +
      'tener el perfil de un alumno, no olvides sugerirlas en la seccion Sugerencias dentro de ' +
      'la opción Institucion',
      buttons: ['OK']
    });
    alert.present();
  }

  salir() {
    const confirm = this.alertCtrl.create({
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
        }
      }
      ]
  });
  confirm.present();
  }

}
