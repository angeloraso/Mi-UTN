import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user= { email : '', password : ''};

  profilePicture: any = 'assets/icon/logo_utn.png';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth : AuthProvider,
    public alertCtrl : AlertController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
  ) {

  }

  login(){
      let loading = this.loadingCtrl.create({
      content: 'Iniciando Sesión...'
      });

      loading.present();

      setTimeout(() => {
          loading.dismiss();
          this.auth.loginUser(this.user.email,this.user.password ).then((user) => {
          })
          .catch(err=>{
              let alert = this.alertCtrl.create({
              title: 'Usuario o Contraseña incorrecta',
              subTitle: err.message,
              buttons: ['Aceptar']
              });
              alert.present();
          });
      }, 1000);
  }

  emailChanged(){
    this.profilePicture = "https://pikmail.herokuapp.com/" + this.user.email + "?size=150";
  }

  /*
  // Registro de un Usuario
  signin(){
    this.auth.registerUser(this.user.email,this.user.password)
    .then((user) => {
      // El usuario se ha creado correctamente
    })
    .catch(err=>{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })

  }
  */


}
