import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Data } from '../../providers/data/data';
import { InstitucionOpcionPage } from '../institucion-opcion/institucion-opcion';

import {Opcion} from '../../interfaces/institucion.interface'

@IonicPage()
@Component({
  selector: 'page-institucion',
  templateUrl: 'institucion.html',
})
export class InstitucionPage {

  institucion: any; // En institucion[0].opciones se guardan las opciones de la seccion Institucion 
  opciones: Opcion[]; // Arreglo con las opciones

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dataService: Data) {

              var that = this;
              dataService.getDocumento("institucion", "institucion").then((result: any) =>{
                  that.opciones = result.opciones;
              });
  }

  irAPaginaElegida(opcion: Opcion){
    this.navCtrl.push(InstitucionOpcionPage,  
        {opcion: opcion});
  }

}
