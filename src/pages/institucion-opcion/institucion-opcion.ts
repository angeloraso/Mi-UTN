import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import _ from 'lodash';

import {Opcion} from '../../interfaces/institucion.interface'
import { Data } from '../../providers/data/data';
import { ModalContentPage } from './modal-content/modal-content';

@IonicPage()
@Component({
  selector: 'page-institucion-opcion',
  templateUrl: 'institucion-opcion.html',
})
export class InstitucionOpcionPage {

  opcion: Opcion;

  elementos: any[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public dataService: Data) {

      this.opcion = navParams.get('opcion');

      var that = this;

      dataService.getDocumento(this.opcion.base_datos, this.opcion.id_documento).then((result: any) =>{
          that.elementos = result.elementos;
      });
  }

  abrirModalElegido(elemento){
    /* let modal = this.modalCtrl.create(ModalContentPage, elemento);
    modal.present(); */
  }



}
