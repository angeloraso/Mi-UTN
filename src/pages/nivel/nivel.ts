import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { MateriaPage } from '../materia/materia';
import { Data } from '../../providers/data/data';

interface Materia {
  nombre: string; // Nombre de la Materia
  periodo: string; // Anual, 1er Cuatrimestre, 2do Cuatrimestre
  modalidad?: string; // Presencial o Remota
  horas?: string; // Cantidad de horas de la electiva
}

@IonicPage()
@Component({
  selector: 'page-nivel',
  templateUrl: 'nivel.html',
})

export class NivelPage {

  titulo: string;
  ruta_database: string;

/*   materiasNivelRef: AngularFirestoreCollection<any>;
  materiasNivel: Observable<any>; */

  materias = [];


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public db: AngularFirestore,
              public dataService: Data) {

      this.titulo = navParams.get('titulo');
      this.ruta_database = navParams.get('ruta_database');

      this.materias = dataService.getTodosLosDocumentos(this.ruta_database, true);

/*       this.materiasNivelRef = this.db.collection('/' + this.titulo + '/');
      this.materiasNivelRef.ref.orderBy("nombre");
      this.materiasNivel = this.materiasNivelRef.valueChanges(); */
  }

  irALaMateria(materia){
    this.navCtrl.push(MateriaPage, 
      
      {title: materia.nombre});
  }

}
