import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Opcion} from '../../interfaces/institucion.interface'
import { Data } from '../../providers/data/data';
import { ModalesPage } from '../../components/modales/modales';

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

      this.opcion = navParams.get('opcion'); //Opcion elegida

      var that = this;

      dataService.getDocumento(this.opcion.base_datos, this.opcion.id_documento).then((result: any) =>{
          that.elementos = result.elementos;
      });
  }

  abrirModalElegido(elemento){
    let modal = this.modalCtrl.create(ModalesPage, elemento);
    modal.present();
  }



}
