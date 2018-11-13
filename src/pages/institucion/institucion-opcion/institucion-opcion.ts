import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Opcion} from '../../../interfaces/institucion.interface';
import { Data } from '../../../providers/data/data';
import { ModalesPage } from '../../../components/modales/modales';
import * as _ from 'lodash';

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
  }
  ngOnInit() {
    // Para leer las variables entrantes. En el constructor no se van a poder ver
    const that = this;
    this.opcion = this.navParams.get('opcion'); // Opcion elegida

    this.dataService.getTodosLosDocumentos(this.opcion.base_datos).then((result: any) => {
        that.elementos = _.find(result, function(res) { return res._id === that.opcion.id_documento; }).elementos;
    });
  }

  abrirModalElegido(elemento) {
    const modal = this.modalCtrl.create(ModalesPage, elemento);
    modal.present();
  }



}
