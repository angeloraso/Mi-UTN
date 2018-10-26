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

@Component({
  selector: 'page-comedor',
  templateUrl: 'comedor.html'
})
export class ComedorPage {
  public token: TokenComedor;
  public tabs: string;
  public saldo: string;

  public isActive = false;

  public ios: boolean;

  public dias: any;

  public vendedores: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public comedorProvider: ComedorProvider,
              private storage: Storage,
              public modalCtrl: ModalController) {
    }

  ngOnInit() {
    this.presentModal();
    this.ios = this.platform.is('ios');
    this.tabs = 'ticket';
    this.token = new TokenComedor;

    this.dias = [
      {nombre: 'Lunes', numero: '', fecha: '', activo: false},
      {nombre: 'Martes', numero: '', fecha: '', activo: false},
      {nombre: 'Miercoles', numero: '', fecha: '', activo: false},
      {nombre: 'Jueves', numero: '', fecha: '', activo: false},
      {nombre: 'Viernes', numero: '', fecha: '', activo: false},
    ];

    for (let i = 0; i < 5; i ++) {
      this.dias[i].numero = moment().day(i + 1 + 7).format('DD');
      this.dias[i].fecha = moment().day(i + 1 + 7).format('YYYY-MM-DD');
    }
  }

  presentModal() {
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
          }
        });
      });
    });
    modal.present();
  }
  comprar() {}

}
