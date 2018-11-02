import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MateriaPage } from '../materia/materia';
import { Data } from '../../../providers/data/data';

import {Materia} from '../../../interfaces/materias.interface';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

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
              public dataService: Data,
              public loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.titulo = this.navParams.get('titulo');
      this.ruta_database = this.navParams.get('ruta_database');
      const loader = this.loadingCtrl.create({
        content: 'Cargando...',
      });
      loader.present();
      this.dataService.getTodosLosDocumentos(this.ruta_database).then((result) => {
        this.materias = result;
        loader.dismiss();
      });
  }

  irALaMateria(materia: Materia) {
    this.navCtrl.push(MateriaPage,

      {materia: materia});
  }

}
