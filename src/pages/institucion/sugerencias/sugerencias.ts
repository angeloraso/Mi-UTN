import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Opcion } from '../../../interfaces/institucion.interface';
import { Data } from '../../../providers/data/data';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';
import * as _ from 'lodash';

@Component({
  selector: 'page-sugerencias',
  templateUrl: 'sugerencias.html',
})
export class SugerenciasPage {

  options: InAppBrowserOptions = {
    location : 'yes', // Or 'no'
    hidden : 'no', // Or 'yes'
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

  opcion: Opcion;

  canales: any;
  features: any;
  mensaje_contacto: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private theInAppBrowser: InAppBrowser,
              private emailComposer: EmailComposer,
              private dataService: Data) {
  }

  ngOnInit( ) {
    // Para leer las variables entrantes. En el constructor no se van a poder ver
    this.mensaje_contacto = '¿Se te ocurre algún cambio a la aplicación o tenes alguna idea copada para agregarle?';

    const that = this;
    this.opcion = this.navParams.get('opcion'); // Opcion elegida

    this.dataService.getTodosLosDocumentos(this.opcion.base_datos).then((result: any) => {
      that.canales = _.find(result, function(res) { return res._id === that.opcion.id_documento; }).canales;
      that.features = _.find(result, function(res) { return res._id === that.opcion.id_documento; }).features;
    });
  }

  enviarMail(canal: any) {
    const email = {
      to: canal.link,
      cc: '',
      attachments: [
      ],
      subject: canal.subject,
      body: '',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  // METODO PARA ABRIR ENLACE EN PAGINA APARTE
  public openWithSystemBrowser( link: string ) {
    const target = '_system';
    this.theInAppBrowser.create(link, target, this.options);
  }

}
