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

  // En los posteos en realidad irian los mensajes para el alumno, como puede ser que su beca fue 
  // aprobada/rechazada, que su analitico ya esta listo para retirar, etc
  posts = [
    {
      emisor: 'Nombre Entidad Facultad',
      postImageUrl: 'assets/icon/logo_utn.png',
      text: `Mensaje para el alumno, como puede ser que su beca fue aprobada/rechazada, que su analitico ya esta listo para retirar, su certificado de examen ya fue creado, etc`,
      date: 'Fecha del mensaje',
      borrar: 'Borrar',
      responder: 'Responder',
      timestamp: '11hs ago'
    },
  ]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController) {
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
        }
      }
      ]
  });
  confirm.present();
  }

}
