import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Data } from '../../providers/data/data';


interface Opcion{
    nombre: string, // Nombre de la opcion
    icono: string // Icono que acompaña a la opcion
}

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

              dataService.getTodosLosDocumentos("institucion").then((result) => {
                  this.institucion = result;
                  this.opciones = result[0].opciones;    
              });
  }

  irAPaginaElegida(opcion: Opcion){

  }

}
