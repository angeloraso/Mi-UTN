import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ComedorProvider } from '../../../../providers/comedor/comedor';
import * as _ from 'lodash';
import { ComedorPage } from '../comedor';
import { Storage } from '@ionic/storage';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { TokenComedor } from '../../../../interfaces/comedor.interface';

@Component({
  selector: 'page-comedor-login',
  templateUrl: 'login-comedor.html',
})
export class LoginComedorPage {

  public logo = 'assets/icon/UTN-logo.png';

  public usuario = '';
  public pass = '';

  public salir: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public comedorProvider: ComedorProvider,
    private storage: Storage,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
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
      this.usuario = _.replace(this.usuario, '.', '');
      this.comedorProvider.getToken(this.usuario, this.pass).subscribe((res: TokenComedor) => {
        this.storage.set('usuario', this.usuario);
        this.storage.set('pass', this.pass);
        loader.dismiss();
        this.ingresarComedor(res);
      },
      err => {
        loader.dismiss();
        this.error();
      });
    }
  }

  volver() {
    this.navCtrl.pop();
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

  public ingresarComedor(token) {
    this.navCtrl.push(ComedorPage,
      {token: token});
  }
}
