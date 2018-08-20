import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MateriaPage } from '../materia/materia';
import { Data } from '../../providers/data/data';

interface Materia {
  nombre: string; // Nombre de la Materia
  periodo: string; // Anual, 1er Cuatrimestre, 2do Cuatrimestre
  modalidad?: string; // Presencial o Remota
  horas?: string; // Cantidad de horas de la electiva
  id_materia: string; // ID de la materia en la base de datos "materias"
  cursadas_para_cursar: Array<string>;
  finales_para_cursar: Array<string>;
  finales_para_rendir: Array<string>;
  dias_horarios: Array<string>;
  profesores: Array<string>;
  clases_consulta: Array<{dia_horario:string, profesor:string, aula:string}>;
  links: Array<{link:string, titulo:string}>;
}

@IonicPage()
@Component({
  selector: 'page-nivel',
  templateUrl: 'nivel.html',
})

export class NivelPage {

  titulo: string;
  ruta_database: string;

  materias = [];


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dataService: Data) {

      this.titulo = navParams.get('titulo');
      this.ruta_database = navParams.get('ruta_database');

      this.materias = dataService.getTodosLosDocumentos(this.ruta_database);
  }

  irALaMateria(materia: Materia){
    this.navCtrl.push(MateriaPage, 
      
      {materia: materia});
  }

}
