import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Opcion } from '../../../interfaces/institucion.interface';
import { Platform } from 'ionic-angular';
import { ComedorProvider } from '../../../providers/comedor/comedor';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { LoginComedorPage } from './login-comedor/login-comedor';
import { TokenComedor } from '../../../models/TokenComedor';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

interface Dia {
  nombre: string;
  numero: string;
  fecha: string;
  activo: boolean;
  deshabilitado: boolean;
}

@Component({
  selector: 'page-comedor',
  templateUrl: 'comedor.html'
})
export class ComedorPage {
  public token: TokenComedor;
  public tabs: string;
  public saldo: string;

  public dias_ya_comprados: string[];
  public dias_comprar: string[];
  public dias_deshacer_compra: string[];

  public isActive = false;

  public ios: boolean;

  public dias: Array<Dia>;

  public vendedores: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public comedorProvider: ComedorProvider,
              private storage: Storage,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController) {
    }

  ngOnInit() {
    this.presentModal();
    this.ios = this.platform.is('ios');
    this.tabs = 'ticket';
    this.dias_ya_comprados = [];
    this.dias_comprar = [];
    this.dias_deshacer_compra = [];
    this.token = new TokenComedor;

    this.dias = [
      {nombre: 'Lunes', numero: '', fecha: '', activo: false, deshabilitado: false},
      {nombre: 'Martes', numero: '', fecha: '', activo: false, deshabilitado: false},
      {nombre: 'Miercoles', numero: '', fecha: '', activo: false, deshabilitado: false},
      {nombre: 'Jueves', numero: '', fecha: '', activo: false, deshabilitado: false},
      {nombre: 'Viernes', numero: '', fecha: '', activo: false, deshabilitado: false}
    ];

    for (let i = 0; i < this.dias.length; i ++) {
      this.dias[i].numero = moment().day(i + 1 + 7).format('DD');
      this.dias[i].fecha = moment().day(i + 1 + 7).format('YYYY-MM-DD');
    }
  }

  presentModal() {
    const that = this;
    const modal = this.modalCtrl.create(LoginComedorPage);
    modal.onDidDismiss(data => {
      this.token = data;

      this.comedorProvider.getSaldo(this.token.token).subscribe( (res: any) => {
        this.saldo = res.saldo;
      });

      this.comedorProvider.getDiasComprados(this.token.token).subscribe( (dias_comprados: [{dia_comprado: string}]) => {
        _.forEach(this.dias, function(dia) {
          const match = _.find(dias_comprados, { 'dia_comprado': dia.fecha});
          if (typeof match !== 'undefined') {
            dia.activo = true;
            that.dias_ya_comprados.push(dia.fecha);
          }
        });
      });
    });
    modal.present();
  }

  guardarSeleccionCheck(dia: Dia) {
    if (dia.activo) {
      if (_.find(this.dias_ya_comprados, dia.fecha)) {
        this.dias_deshacer_compra.push(dia.fecha);
      }
        this.saldo = (+this.saldo + 20).toString();
    } else {
      if (!_.find(this.dias_ya_comprados, dia.fecha)) {
        this.dias_comprar.push(dia.fecha);
        _.pull(this.dias_deshacer_compra, dia.fecha);
      }
      this.saldo = (+this.saldo - 20).toString();
    }
  }

  async confirmar() {
    if ( ! _.isEmpty(this.dias_comprar) && !_.isEmpty(this.dias_deshacer_compra) ) {
      await this.comprar();
      await this.deshacer();
      const alert = this.alertCtrl.create({
          title: 'Genial!',
          subTitle: 'Se han guardado los cambios',
          buttons: ['OK']
        });
        alert.present();
    } else {
      const alert = this.alertCtrl.create({
        subTitle: 'Parece que no se han registrado cambios!',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  comprar() {
    if (this.dias_comprar !== []) {
      this.comedorProvider.comprar(this.dias_comprar, this.token.token);
    }
  }

  deshacer() {
    if (this.dias_deshacer_compra !== []) {
      this.comedorProvider.deshacerDiasComprados(this.dias_deshacer_compra, this.token.token);
    }
  }

}
