/* import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user= { email : '', password : ''};

  profilePicture: any = 'assets/icon/user_icon.png';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl : AlertController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
  ) {

  }

  emailChanged(){
    this.profilePicture = "https://pikmail.herokuapp.com/" + this.user.email + "?size=150";
  }

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


}
*/
