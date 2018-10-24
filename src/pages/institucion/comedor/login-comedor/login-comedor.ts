import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { Opcion } from '../../../../interfaces/institucion.interface';

@Component({
  selector: 'page-comedor-login',
  templateUrl: 'login-comedor.html',
})
export class LoginComedorPage {

  public opcion: Opcion;

  user = { email : '', password : ''};

  profilePicture = 'assets/icon/logo_utn.png';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
  ) {

  }

  ngOnInit() {
    this.opcion = this.navParams.get('opcion'); // Opcion elegida
  }

  login() {
    alert('Hola');
  }

  materialClick() {}

}
