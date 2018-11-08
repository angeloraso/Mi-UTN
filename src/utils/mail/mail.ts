import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { EmailComposer } from '@ionic-native/email-composer';

@Component({
  selector: 'page-mail',
  templateUrl: 'mail.html'
})
export class MailPage {
  public usuario_cuenta_correo: string;
  public usuario_cuerpo_correo: HTMLTextAreaElement;
  public miutn_cuenta_correo: string;

  public subject = 'Sugerencias, Ideas u Opiniones';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              private storage: Storage,
              public loadingCtrl: LoadingController,
              public emailComposer: EmailComposer) {
    }

  ngOnInit() {
    this.miutn_cuenta_correo = this.navParams.get('canal').link; // Opcion elegida
  }

  protected adjustTextarea(event: any): void {
    this.usuario_cuerpo_correo = event.target;
    this.usuario_cuerpo_correo.rows = this.usuario_cuerpo_correo.value.split('\n').length;
    return;
  }

  enviarMail() {
    const email = {
      to: this.miutn_cuenta_correo,
      cc: '',
      attachments: [
      ],
      subject: this.subject,
      body: this.usuario_cuerpo_correo.value,
      isHtml: true
    };

    this.emailComposer.open(email);
  }
}
