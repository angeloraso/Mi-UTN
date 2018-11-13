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
import * as Comedor from '../../../interfaces/comedor.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { Menu, Turno } from '../../../interfaces/comedor.interface';
import { finalize } from 'rxjs/operators';
import { Navbar } from 'ionic-angular/navigation/nav-interfaces';
import { ViewChild } from '@angular/core';
import { HomePage } from '../../home/home';
import { App } from 'ionic-angular/components/app/app';
// TODO Fijarse despues que datos conviene tener en la nube de IBM.
//      Un ejemplo claro es el valor de las viandas o los valores de los turnos y menues.
@Component({
  selector: 'page-comedor',
  templateUrl: 'comedor.html'
})
export class ComedorPage {
  public token: Comedor.TokenComedor;
  public tabs: string;
  public saldo: string;
  public confirmado: boolean;
  public icono_compra_historial: string;

  public valor_vianda: number;

  public dias_ya_comprados: string[];
  public dias_comprar: string[];
  public dias_deshacer_compra: string[];

  public isActive = false;

  public ios: boolean;

  public dias: Array<Comedor.Dia>;
  public historial_compras: Array<Comedor.CompraRecargada>;
  public historial_compras_subdividido: Array<Array<Comedor.CompraRecargada>>;
  public historial_compras_reducido: Array<Comedor.CompraRecargada>;
  public maxima_cantidad_compras_historial: number;
  public config: Comedor.Config;
  public menues: Array<Comedor.Menu>;
  public turnos: Array<Comedor.Turno>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public comedorProvider: ComedorProvider,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              private storage: Storage,
              public loadingCtrl: LoadingController) {
  }

  volverInstitucion() {
    this.maxima_cantidad_compras_historial = 15;
    this.navCtrl.popToRoot();
  }

  ngOnInit() {
    this.maxima_cantidad_compras_historial = 15;
    this.icono_compra_historial = '../../../assets/icon/compra.svg';
    this.ios = this.platform.is('ios');
    this.tabs = 'ticket';
    this.dias_ya_comprados = [];
    this.dias_comprar = [];
    this.dias_deshacer_compra = [];
    this.token = new Comedor.TokenComedor;
    this.valor_vianda = 20;
    this.confirmado = false;
    this.historial_compras = new Array();
    this.turnos = [
        {id: '10', nombre: 'Temprano', horario: '12:00 hs', value: '0', activo: false},
        {id: '11', nombre: 'Tarde', horario: '13:00 hs', value: '1', activo: false}
    ];
    this.menues = [
      {id: '40', nombre: 'Normal', value: '0', activo: false},
      {id: '41', nombre: 'Saludable', value: '1', activo: false}
    ];

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

    const that = this;
    this.token = this.navParams.get('token');
    if (!_.isEmpty(this.token)) {

      this.comedorProvider.getSaldo(this.token.token)
      .subscribe( (saldo: Comedor.Saldo) => {
          this.saldo = saldo.saldo;
      });

      this.comedorProvider.getDiasComprados(this.token.token)
      .subscribe( (dias_comprados: Array<Comedor.DiaComprado>) => {
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
          .subscribe( (feriados: any) => {
            _.forEach(this.dias, function(dia) {
              const match = _.find(feriados.feriados, { 'fecha': dia.fecha});
              if (typeof match !== 'undefined') {
                dia.deshabilitado = true;
              }
            });
      });

      this.comedorProvider.getReceso(this.token.token)
        .subscribe( (receso: Comedor.Receso) => {
          for (let i = 8; i < 13; i++) {
            if ( moment(moment().day(i).format('YYYY-MM-DD')).isBetween(receso.inicio, receso.fin) ) {
              this.dias[i - 8].deshabilitado = true;
            }
          }
      });

      this.comedorProvider.getHistorial(this.token.token)
        .pipe(finalize(() => {
            that.historial_compras = _.reverse(that.historial_compras);
            that.historial_compras_reducido = _.slice(that.historial_compras, 0, that.maxima_cantidad_compras_historial);
          }))
        .subscribe( (historial: Array<Comedor.Compra>) => {
          _.forEach(historial, function(compra) {
            const compra_recargada = { precio: '', dia_comprado: '', nombre: '', numero: '', mes: '' };
            compra_recargada.precio = compra.precio;
            compra_recargada.dia_comprado = compra.dia_comprado;
            compra_recargada.nombre = _.startCase(moment(compra.dia_comprado).locale('es').format('dddd'));
            compra_recargada.numero = moment(compra.dia_comprado).locale('es').format('D');
            compra_recargada.mes = _.startCase(moment(compra.dia_comprado).locale('es').format('MMMM'));
            that.historial_compras.push(compra_recargada);
          });
        });

      this.comedorProvider.getConfig(this.token.token)
        .subscribe( (config: Comedor.Config) => {
          const menu_posicion = +config.menu.selected - 1;
          this.menues[menu_posicion].activo = true;

          const turno_posicion = +config.turno.selected - 1;
          this.turnos[turno_posicion].activo = true;
      });
    }

  }

  guardarSeleccionCheck(dia: Comedor.Dia) {
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
      this.volver();
  }

  comprar() {
    if (!_.isEmpty(this.dias_comprar)) {
      this.comedorProvider.comprar(this.dias_comprar, this.token.token)
      .subscribe( (res: Comedor.RespuestaComedor) => {
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
      this.comedorProvider.deshacerDiasComprados(this.dias_deshacer_compra, this.token.token)
      .subscribe( (res: Comedor.RespuestaComedor) => {
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
                this.volver();
              } else {
                se_borraron_los_datos = true;
              }
            });
            this.storage.remove('pass').then((res) => {
              if (se_borraron_los_datos) {
                loader.dismiss();
                this.volver();
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

  guardarMenu(menu: Menu) {
      _.forEach(this.menues, function(m) {
          m.activo = false;
      });
      this.menues[+menu.value].activo = true;
      this.comedorProvider.elegirMenu(this.token.token, (+menu.value + 1).toString())
        .subscribe( (res: any) => { });
  }

  guardarTurno(turno: Turno) {
    _.forEach(this.turnos, function(t) {
        t.activo = false;
    });
    this.turnos[+turno.value].activo = true;
    this.comedorProvider.elegirTurno(this.token.token, (+turno.value + 1).toString())
        .subscribe( (res: any) => { });
  }

  mostrarMas() {
    this.maxima_cantidad_compras_historial += 15;
    this.historial_compras_reducido = _.slice(this.historial_compras, 0, this.maxima_cantidad_compras_historial);
  }

  volver() {
    this.navCtrl.pop();
  }

}
