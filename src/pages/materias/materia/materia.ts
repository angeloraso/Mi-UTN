import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Data } from '../../../providers/data/data';

import {Materia} from '../../../interfaces/materias.interface'

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
  }
  ngOnInit(){
    this.materia = this.navParams.get('materia');
    this.titulo = this.materia.nombre;
  }
}
