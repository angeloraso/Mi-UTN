import { Component, ViewChild, Input } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Slides, Platform, NavParams, ViewController } from 'ionic-angular';
import { Laboratorio } from '../../../interfaces/institucion.interface';
import { Email } from '../../../interfaces/institucion.interface';
import { EmailComposer } from '@ionic-native/email-composer';


@Component({
  selector: 'modal-laboratorio',
  templateUrl: './modal-laboratorio.html'
})
export class ModalLaboratorioComponent {
  @ViewChild('slider') slider: Slides;

  @Input() elemento: Laboratorio;

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

  // VARIABLES DEL ION-SLIDES
  currentIndex = 0;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private theInAppBrowser: InAppBrowser,
    private emailComposer: EmailComposer,
  ) {

  }

  ngOnInit() {
  }

  // METODO PARA ABRIR ENLACE EN PAGINA APARTE
  public openWithSystemBrowser(url: string) {
    const target = '_system';
    this.theInAppBrowser.create(url, target, this.options);
  }

  nextSlide() {
    this.slider.slideNext();
  }

  previousSlide() {
    this.slider.slidePrev();
  }

  onSlideChanged() {
    this.currentIndex = this.slider.getActiveIndex();
    // console.log('Slide changed! Current index is', this.currentIndex);
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
