import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { TokenComedor } from '../../../../interfaces/institucion.interface';
import { ComedorProvider } from '../../../../providers/comedor/comedor';
import * as _ from 'lodash';
import { ComedorPage } from '../comedor';
import { Storage } from '@ionic/storage';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { InstitucionPage } from '../../institucion';

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
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController
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
      const loader = this.loadingCtrl.create({
        content: 'Cargando...',
      });
      loader.present();
      this.comedorProvider.getToken(this.usuario, this.pass).subscribe((res: TokenComedor) => {
        this.storage.set('token', res.token);
        this.storage.set('usuario', this.usuario);
        this.storage.set('pass', this.pass);
        loader.dismiss();
        this.closeModal(res);
      },
      err => {
        loader.dismiss();
        this.error();
      });
    }
    /* this.closeModal({nombre: 'JUAN',
      apellido: 'SANCHEZ',
      token: 'dfjaife8uf8df8ad6s6sg9s7f9sF78SF979F7f',
      especialidad: 'Sistemas',
      documento: '35351973'}); */
  }

  volver() {
    this.closeModal();
  }

  error() {
    const alert = this.alertCtrl.create({
      title: 'Usuario no encontrado!',
      subTitle: 'Asegúrese de que los datos ingresados son correctos e intente nuevamente!',
      message: 'Si el problema persiste puede que existan inconvenientes con el servidor',
      buttons: ['OK']
    });
    alert.present();
  }

  public closeModal(data?) {
    this.viewCtrl.dismiss(data);
  }
}
