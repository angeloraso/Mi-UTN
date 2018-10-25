import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { TokenComedor } from '../../../../interfaces/institucion.interface';
import { ComedorProvider } from '../../../../providers/comedor/comedor';
import * as _ from 'lodash';
import { ComedorPage } from '../comedor';

@Component({
  selector: 'page-comedor-login',
  templateUrl: 'login-comedor.html',
})
export class LoginComedorPage {

  public background_image = 'assets/icon/UTN-logo.png';

  public usuario: string;
  public pass: string;

  profilePicture = 'assets/icon/logo_utn.png';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public comedorProvider: ComedorProvider
  ) {

  }

  ngOnInit() {}

  ingresar() {
    if (!_.isEmpty(this.usuario) || !_.isEmpty(this.pass)) {
      this.comedorProvider.getToken(this.usuario, this.pass).subscribe((res: TokenComedor) => {
        this.navCtrl.push(ComedorPage,
          {token: res}
        );
      });
    } else {
      this.showAlert();
    }
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Faltan datos!',
      subTitle: 'Asegúrese de completar todos los campos!',
      buttons: ['OK']
    });
    alert.present();
  }
}
