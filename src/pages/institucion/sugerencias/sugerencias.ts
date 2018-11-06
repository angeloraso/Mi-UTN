import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Opcion } from '../../../interfaces/institucion.interface';
import { Data } from '../../../providers/data/data';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';

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

email = {
  to: '',
  cc: '',
  bcc: [''],
  attachments: [
  ],
  subject: 'Sugerencia, Opinión o Idea',
  body: '',
  isHtml: true
};

  opcion: Opcion;

  canales: any;
  features: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private theInAppBrowser: InAppBrowser,
              private emailComposer: EmailComposer,
              public dataService: Data) {
  }

  ngOnInit( ) {
    // Para leer las variables entrantes. En el constructor no se van a poder ver
    const that = this;
    this.opcion = this.navParams.get('opcion'); // Opcion elegida

    this.dataService.getDocumento(this.opcion.base_datos, this.opcion.id_documento).then((result: any) => {
      this.canales = result.canales;
      this.features = result.features;
    });
  }

  enviarMail(correo: string) {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if ( available ) {
        this.email.to = correo;
        this.emailComposer.open(this.email);
      }
    });
  }

  // METODO PARA ABRIR ENLACE EN PAGINA APARTE
  public openWithSystemBrowser( link: string ) {
    const target = '_system';
    this.theInAppBrowser.create(link, target, this.options);
  }

}
