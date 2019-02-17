import { Component, ViewChild, Input } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Slides, Platform, NavParams, ViewController } from 'ionic-angular';
import { Proyecto, Email } from '../../../interfaces/institucion.interface';
import { EmailComposer } from '@ionic-native/email-composer/ngx';


@Component({
  selector: 'modal-bolsa',
  templateUrl: './modal-bolsa.html'
})
export class ModalBolsaComponent {
  @ViewChild( 'slider' ) slider: Slides;

  @Input( ) elemento: Proyecto;

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

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private theInAppBrowser: InAppBrowser,
    private emailComposer: EmailComposer,
  ) {

  }

  ngOnInit( ) {
    //  Para leer las variables entrantes. En el constructor no se van a poder ver
  }

  //  METODO PARA ABRIR ENLACE EN PAGINA APARTE
  public openWithSystemBrowser( url: string ) {
    const target = '_system';
    this.theInAppBrowser.create(url, target, this.options);
  }

  enviarMail(correo: Email) {
    const email = {
      to: correo.email,
      cc: '',
      attachments: [
      ],
      subject: correo.asunto,
      body: '',
      isHtml: true
    };
    this.emailComposer.open(email);
  }
}
