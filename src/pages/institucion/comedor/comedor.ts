import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ComedorProvider } from '../../../providers/comedor/comedor';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { LoginComedorPage } from './login-comedor/login-comedor';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Dia, TokenComedor, Feriado, RespuestaComedor, Receso, Saldo, DiaComprado } from '../../../interfaces/comedor.interface';


@Component({
  selector: 'page-comedor',
  templateUrl: 'comedor.html'
})
export class ComedorPage {
  public token: TokenComedor;
  public tabs: string;
  public saldo: string;
  public confirmado: boolean;

  public valor_vianda: number;

  public dias_ya_comprados: string[];
  public dias_comprar: string[];
  public dias_deshacer_compra: string[];

  public isActive = false;

  public ios: boolean;

  public dias: Array<Dia>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public comedorProvider: ComedorProvider,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              private storage: Storage,
              public loadingCtrl: LoadingController) {
    }

  ngOnInit() {
    this.presentModalLogin();
    this.ios = this.platform.is('ios');
    this.tabs = 'ticket';
    this.dias_ya_comprados = [];
    this.dias_comprar = [];
    this.dias_deshacer_compra = [];
    this.token = new TokenComedor;
    this.valor_vianda = 20;
    this.confirmado = false;

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

  presentModalLogin() {
    const that = this;
    const modal = this.modalCtrl.create(LoginComedorPage);
    modal.present();
    modal.onDidDismiss((data: TokenComedor) => {
      if (!_.isEmpty(data)) {
        this.token = data;

        this.comedorProvider.getSaldo(this.token.token).subscribe( (saldo: Saldo) => {
          this.saldo = saldo.saldo;
        });

        this.comedorProvider.getDiasComprados(this.token.token).subscribe( (dias_comprados: Array<DiaComprado>) => {
          _.forEach(this.dias, function(dia) {
            const match = _.find(dias_comprados, { 'dia_comprado': dia.fecha});
            if (typeof match !== 'undefined') {
              dia.activo = true;
              that.dias_ya_comprados.push(dia.fecha);
            }
          });
        });

        this.comedorProvider.getEsPeriodoCompra(this.token.token)
            .subscribe( (es_periodo_de_compra: boolean) => {
                if (!es_periodo_de_compra) {
                  _.forEach(this.dias, function(dia) {
                    dia.deshabilitado = true;
                  });
                }
        });

        this.comedorProvider.getFeriadosPeriodo(
            moment().day(8).format('YYYY-MM-DD'),
            moment().day(12).format('YYYY-MM-DD'),
            this.token.token)
            .subscribe( (feriados: Array<Feriado>) => {
              _.forEach(this.dias, function(dia) {
                const match = _.find(feriados, { 'fecha': dia.fecha});
                if (typeof match !== 'undefined') {
                  dia.deshabilitado = true;
                }
              });
        });

        this.comedorProvider.getReceso(this.token.token)
          .subscribe( (receso: Receso) => {
            for (let i = 8; i < 13; i++) {
              if ( moment(moment().day(i).format('YYYY-MM-DD')).isBetween(receso.inicio, receso.fin) ) {
                this.dias[i - 8].deshabilitado = true;
              }
            }
        });

      }
    });
  }

  guardarSeleccionCheck(dia: Dia) {
    const dia_elegido_ya_fue_comprado = _.includes(this.dias_ya_comprados, dia.fecha);
    if (dia.activo) {

      if (dia_elegido_ya_fue_comprado) {
        this.dias_deshacer_compra.push(dia.fecha);
      } else {
        _.pull(this.dias_comprar, dia.fecha);
      }
        this.saldo = (+this.saldo + this.valor_vianda).toString();
    } else {
      if ( +this.saldo < this.valor_vianda) { // Destildo el check ya que no hay saldo
        const dia_posicion = _.findIndex(this.dias, function(d) { return d.nombre === dia.nombre; });
        this.dias[dia_posicion].activo = false;
        const dia_html = document.getElementById(dia.nombre) as HTMLInputElement;
        dia_html.checked = false;
        this.saldoInsuficiente();
      } else {
        if (!dia_elegido_ya_fue_comprado) {
          this.dias_comprar.push(dia.fecha);
        } else {
          _.pull(this.dias_deshacer_compra, dia.fecha);
        }
        this.saldo = (+this.saldo - this.valor_vianda).toString();
      }
    }
  }

  async confirmar() {
      await this.comprar();
      await this.deshacer();
      this.navCtrl.pop();
  }

  comprar() {
    if (!_.isEmpty(this.dias_comprar)) {
      this.comedorProvider.comprar(this.dias_comprar, this.token.token).subscribe( (res: RespuestaComedor) => {
        if (this.confirmado && res.resultado === 'OK') {
          this.exito();
        } else {
          this.confirmado = true;
        }
      });
    } else {
      this.confirmado = true;
    }
  }

  deshacer() {
    if (!_.isEmpty(this.dias_deshacer_compra)) {
      this.comedorProvider.deshacerDiasComprados(this.dias_deshacer_compra, this.token.token).subscribe( (res: RespuestaComedor) => {
        if (this.confirmado && res.resultado === 'OK') {
          this.exito();
        } else {
          this.confirmado = true;
        }
      });
    } else {
      this.confirmado = true;
    }
  }

  exito() {
    const alert = this.alertCtrl.create({
      title: 'Genial!',
      subTitle: 'Se han guardado los cambios',
      buttons: ['OK']
    });
    alert.present();
  }

  saldoInsuficiente() {
    const alert = this.alertCtrl.create({
      title: 'Saldo insuficiente!',
      subTitle: 'Lo sentimos pero no dispone de saldo suficiente para realizar esta compra!',
      buttons: ['OK']
    });
    alert.present();
  }

  salir() {
    const prompt = this.alertCtrl.create({
      title: 'Login',
      message: 'Desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {}},
        {
          text: 'Salir',
          handler: data => {
            let se_borraron_los_datos = false;
            const loader = this.loadingCtrl.create({
              content: 'Cargando...',
            });
            loader.present();
            this.storage.remove('usuario').then((res) => {
              if (se_borraron_los_datos) {
                loader.dismiss();
                this.presentModalLogin();
              } else {
                se_borraron_los_datos = true;
              }
            });
            this.storage.remove('pass').then((res) => {
              if (se_borraron_los_datos) {
                loader.dismiss();
                this.presentModalLogin();
              } else {
                se_borraron_los_datos = true;
              }
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
