import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Data } from '../../providers/data/data';
import { InstitucionOpcionPage } from './institucion-opcion/institucion-opcion';

import {Opcion, UrlOpcion} from '../../interfaces/institucion.interface'
import { CalendarioAcademicoPage } from './calendario-academico/calendario-academico';

@IonicPage()
@Component({
  selector: 'page-institucion',
  templateUrl: 'institucion.html',
})
export class InstitucionPage {

  comedor: UrlOpcion = {
      url: "https://ticket.frlp.utn.edu.ar/u/#/ticket", 
      mensaje: "Será redirigido a la página oficial del Comedor para la compra de Tickets"
  }
  biblioteca: UrlOpcion =  {
    url: "https://biblioteca.frlp.utn.edu.ar/", 
    mensaje: "Será redirigido a la página oficial de la Biblioteca"
  }

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

  institucion: any; // En institucion[0].opciones se guardan las opciones de la seccion Institucion 
  opciones: Opcion[]; // Arreglo con las opciones

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dataService: Data,
              public theInAppBrowser: InAppBrowser,
              public alertCtrl: AlertController) {
  }
  ngOnInit(){
    var that = this;
    this.dataService.getDocumento("institucion", "institucion").then((result: any) =>{
        that.opciones = result.opciones;
    });
  }

  irAPaginaElegida(opcion: Opcion){
    if(opcion.id_documento === "comedor"){
      this.mostrarAdvertenciaComedor(this.comedor);
    }
    else if (opcion.id_documento === "biblioteca"){
      this.mostrarAdvertenciaComedor(this.biblioteca);
    }
    else if (opcion.id_documento === "calendario-academico"){
      this.navCtrl.push(CalendarioAcademicoPage,  
        {opcion: opcion});
    }
    else {
      this.navCtrl.push(InstitucionOpcionPage,  
        {opcion: opcion});
    }
  }

  mostrarAdvertenciaComedor(opcion: UrlOpcion){
    const confirm = this.alertCtrl.create({
      title: 'Ir a Comedor',
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
            let target = "_system";
            this.theInAppBrowser.create(opcion.url, target, this.options);
          }
        }
      ]
    });
    confirm.present();
  }

}
