import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Data } from '../../providers/data/data';
import { InstitucionOpcionPage } from './institucion-opcion/institucion-opcion';

import {Opcion, UrlOpcion} from '../../interfaces/institucion.interface';
import { CalendarioAcademicoPage } from './calendario-academico/calendario-academico';
import { LoginComedorPage } from './comedor/login-comedor/login-comedor';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { SugerenciasPage } from './sugerencias/sugerencias';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-institucion',
  templateUrl: 'institucion.html',
})
export class InstitucionPage {

  biblioteca: UrlOpcion =  {
    titulo: 'Ir a Biblioteca',
    url: 'https://biblioteca.frlp.utn.edu.ar/',
    mensaje: 'Será redirigido a la página oficial de la Biblioteca'
  };

  options: InAppBrowserOptions = {
    location : 'yes', // Or 'no'
    hidden : 'no', // Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes', // Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', // Android only
    closebuttoncaption : 'Close', // iOS only
    disallowoverscroll : 'no', // iOS only
    toolbar : 'yes', // iOS only
    enableViewportScale : 'no', // iOS only
    allowInlineMediaPlayback : 'no', // iOS only
    presentationstyle : 'pagesheet', // iOS only
    fullscreen : 'yes', // Windows only
};

  institucion: any; //  En institucion[0].opciones se guardan las opciones de la seccion Institucion
  opciones: Opcion[]; //  Arreglo con las opciones

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: Data,
              public theInAppBrowser: InAppBrowser,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController
              ) {
  }
  ngOnInit() {
    const that = this;
    const loader = this.loadingCtrl.create({
      content: 'Cargando...',
    });
    loader.present();
    this.dataService.getTodosLosDocumentos('institucion').then((result: any) => {
        that.opciones = _.find(result, function(res) { return res._id === 'institucion'; }).opciones;
        loader.dismiss();
    });
  }

  irAPaginaElegida(opcion: Opcion) {
    if (opcion.id_documento === 'biblioteca') {
      this.mostrarAdvertencia(this.biblioteca);
    } else if (opcion.id_documento === 'becas' ||
             opcion.id_documento === 'colaboradores' ||
             opcion.id_documento === 'secretarias' ||
             opcion.id_documento === 'entidades-academicas' ||
             opcion.id_documento === 'utn-frlp') {
      this.mostrarProximamente();
    } else if (opcion.id_documento === 'calendario-academico') {
      this.navCtrl.push(CalendarioAcademicoPage,
        {opcion: opcion});
    } else if (opcion.id_documento === 'comedor') {
      this.navCtrl.push(LoginComedorPage,
        {opcion: opcion});
    } else if (opcion.id_documento === 'sugerencias') {
      this.navCtrl.push(SugerenciasPage,
        {opcion: opcion});
    } else {
      this.navCtrl.push(InstitucionOpcionPage,
        {opcion: opcion});
    }
  }

  mostrarAdvertencia(opcion: UrlOpcion) {
    const confirm = this.alertCtrl.create({
      title: opcion.titulo,
      message: opcion.mensaje,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            const target = '_system';
            this.theInAppBrowser.create(opcion.url, target, this.options);
          }
        }
      ]
    });
    confirm.present();
  }

  mostrarProximamente() {
    const confirm = this.alertCtrl.create({
      title: 'Próximamente',
      message: 'Disculpe las molestias. Esta función aún no esta disponible.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {

          }
        }
      ]
    });
    confirm.present();
  }

}
