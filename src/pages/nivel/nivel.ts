import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MateriaPage } from '../materia/materia';
import { Data } from '../../providers/data/data';

import {Materia} from '../../interfaces/materias.interface'


@IonicPage()
@Component({
  selector: 'page-nivel',
  templateUrl: 'nivel.html',
})

export class NivelPage {

  titulo: string;
  ruta_database: string;

  materias: any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dataService: Data) {

      this.titulo = navParams.get('titulo');
      this.ruta_database = navParams.get('ruta_database');

      dataService.getTodosLosDocumentos(this.ruta_database).then((result) => {
        this.materias = result;
      });
  }

  irALaMateria(materia: Materia){
    this.navCtrl.push(MateriaPage, 
      
      {materia: materia});
  }

}
