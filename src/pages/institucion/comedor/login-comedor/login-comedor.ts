import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { TokenComedor } from '../../../../interfaces/institucion.interface';
import { ComedorProvider } from '../../../../providers/comedor/comedor';
import * as _ from 'lodash';
import { ComedorPage } from '../comedor';
import { Storage } from '@ionic/storage';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
  selector: 'page-comedor-login',
  templateUrl: 'login-comedor.html',
})
export class LoginComedorPage {

  public logo = 'assets/icon/UTN-logo.png';

  public usuario: '';
  public pass: '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public comedorProvider: ComedorProvider,
    private storage: Storage,
    public viewCtrl: ViewController
  ) {

  }

  ngOnInit() {
    this.inicioSesion();
  }

  async inicioSesion() {
    await this.storage.get('usuario').then((usuario) => {
      this.usuario = usuario;
    });
    await this.storage.get('pass').then((pass) => {
      this.pass = pass;
    });
    this.ingresar();
  }

  ingresar() {
    if (!_.isEmpty(this.usuario) || !_.isEmpty(this.pass)) {
      this.comedorProvider.getToken(this.usuario, this.pass).subscribe((res: TokenComedor) => {
        this.storage.set('token', res.token);
        this.storage.set('usuario', this.usuario);
        this.storage.set('pass', this.pass);
        this.closeModal(res);
      },
      err => {
        this.error();
      });
    }
  }

  volver() {
    this.closeModal();
  }

  error() {
    const alert = this.alertCtrl.create({
      title: 'Usuario no encontrado!',
      subTitle: 'Asegúrese de que los datos ingresados son correctos e intente nuevamente!',
      buttons: ['OK']
    });
    alert.present();
  }

  public closeModal(data?) {
    this.viewCtrl.dismiss(data);
  }
}
