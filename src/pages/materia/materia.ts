import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Data } from '../../providers/data/data';

export interface Materia {
  nombre: string; // Nombre de la Materia
  periodo: string; // Anual, 1er Cuatrimestre, 2do Cuatrimestre
  modalidad?: string; // Presencial o Remota
  horas?: string; // Cantidad de horas de la electiva
  id_materia: string; // ID de la materia en la base de datos "materias"
  cursadas_para_cursar: Array<string>;
  finales_para_cursar: Array<string>;
  finales_para_rendir: Array<string>;
  cronogramas: Array<{comision:string, dias_horarios:Array<string>}>;
  profesores: Array<string>;
  clases_consulta: Array<{aula:string, dia_horario:string, profesor:string}>;
  links: Array<{link:string, titulo:string}>;
}

@IonicPage()
@Component({
  selector: 'page-materia',
  templateUrl: 'materia.html',
})

export class MateriaPage {

  titulo: string;
  materia: Materia;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dataService: Data,
            ) {

      this.materia = navParams.get('materia');
      this.titulo = this.materia.nombre;
  }
}
