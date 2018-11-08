import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  public titulo: string;
  public usuario_cuenta_correo: string;
  public mensaje_html_element: HTMLTextAreaElement;
  public mensaje: string;
  public miutn_cuenta_correo: string;

  public subject = 'Sugerencias, Ideas u Opiniones';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public emailComposer: EmailComposer) {
    }

  ngOnInit() {
    this.titulo = 'Enviar Correo';
    this.miutn_cuenta_correo = this.navParams.get('canal').link; // Opcion elegida
  }

  protected adjustTextarea(event: any): void {
    this.mensaje_html_element = event.target;
    this.mensaje_html_element.rows = this.mensaje_html_element.value.split('\n').length;
    return;
  }

  enviarMail() {
    if (_.isEmpty(this.mensaje_html_element.value) ) {
      this.faltaMensaje();
    } else {
      const email = {
        to: this.miutn_cuenta_correo,
        cc: '',
        attachments: [
        ],
        subject: this.subject,
        body: this.mensaje_html_element.value,
        isHtml: true
      };
      this.emailComposer.open(email);
    }
  }

  faltaMensaje() {
    const alert = this.alertCtrl.create({
      title: 'Faltan datos!',
      subTitle: 'Asegúrese de completar el mensaje antes de enviar el correo',
      buttons: ['OK']
    });
    alert.present();
  }


}
