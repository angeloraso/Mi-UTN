import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

/**
 * Generated class for the MateriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface Materia {
  cursadasParaCursar: Array<string>;
  finalesParaCursar: Array<string>;
  finalesParaRendir: Array<string>;
  diasHorarios: Array<string>;
  profesores: Array<string>;
  clasesConsulta: Array<{diaHorario:string, profesor:string, aula:string}>;
  links: Array<{link:string, titulo:string}>;
}

@IonicPage()
@Component({
  selector: 'page-materia',
  templateUrl: 'materia.html',
})

export class MateriaPage {

  faChevronDown = faChevronDown; // Icono de flecha para abajo

  
  listExpandedCursadas = false;
  listExpandedFinales = false;
  listExpandedProfesores = false;
  listExpandedLinks = false;
  listExpandedDiasHorarios = false;
  listExpandedConsultas = false;

  cursadas: Observable<Materia>;
  finales: Observable<Materia>;
  profesores: Observable<Materia>;
  diasHorarios: Observable<Materia>;
  consultas: Observable<Materia>;
  links: Observable<Materia>;


  title: string;
  materiaTitle: string; // El nombre de la materia como aparece en la BD

  cosas: Array<string>;

  materiasCol: AngularFirestoreCollection<any>
  materiaDoc: AngularFirestoreDocument<Materia>;
  materias: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public db: AngularFirestore,
            ) {

      this.title = navParams.get('title');

      // Todo a minisculas
      this.materiaTitle = this.title.toLowerCase(); 
      // Se eliminan los espacios
      this.materiaTitle = this.materiaTitle.replace(/\s/g, ''); 
      // Se eliminan los acentos
      this.materiaTitle = this.materiaTitle.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

      this.materiasCol = this.db.collection('Materias');
      this.materiaDoc = this.materiasCol.doc(this.materiaTitle);  


      /*
      / Saber si existe un documento
      /
      this.materiasRef.doc(materiaTitle).ref.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            console.log("No such document!");
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      */

    }

    reiniciarObservable(observableNoNull){
      this.cursadas = null;
      this.finales = null;
      this.profesores = null;
      this.diasHorarios = null;
      this.consultas = null;
      this.links = null;

      observableNoNull = this.materiaDoc.valueChanges();

    }

    // Todos estos metodos son para mostrar la info de cada Select y ocultar los otros.
    showInfoCursadas() {
      if(!this.listExpandedCursadas){
      
        this.cursadas = this.materiaDoc.valueChanges();
        this.finales = null;
        this.profesores = null;
        this.diasHorarios = null;
        this.consultas = null;
        this.links = null;

        this.listExpandedCursadas = true;


      }
      else{
        this.cursadas = null;
        this.listExpandedCursadas = false;


      } 

    }

    showInfoFinales() {
      if(!this.listExpandedFinales){

        this.cursadas = null;
        this.finales = this.materiaDoc.valueChanges();
        this.profesores = null;
        this.diasHorarios = null;
        this.consultas = null;
        this.links = null;
      
        this.listExpandedFinales = true;

      }
      else{
        this.finales = null;
        this.listExpandedFinales = false;


      } 

    }

    showInfoDiasHorarios() {
      if(!this.listExpandedDiasHorarios){

        this.cursadas = null;
        this.finales = null;
        this.profesores = null;
        this.diasHorarios = this.materiaDoc.valueChanges();
        this.consultas = null;
        this.links = null;
      
        this.listExpandedDiasHorarios = true;


      }
      else{
        this.diasHorarios = null;
        this.listExpandedDiasHorarios = false;


      } 

    }

    showInfoProfesores() {
      if(!this.listExpandedProfesores){

        this.cursadas = null;
        this.finales = null;
        this.profesores = this.materiaDoc.valueChanges();
        this.diasHorarios = null;
        this.consultas = null;
        this.links = null;
      
        this.listExpandedProfesores = true;


      }
      else{
        this.profesores = null;
        this.listExpandedProfesores = false;


      } 

    }

    showInfoConsultas() {
      if(!this.listExpandedConsultas){

        this.cursadas = null;
        this.finales = null;
        this.profesores = null;
        this.diasHorarios = null;
        this.consultas = this.materiaDoc.valueChanges();
        this.links = null;
      
        this.listExpandedConsultas = true;

      }
      else{
        this.consultas = null;
        this.listExpandedConsultas = false;


      } 

    }

    showInfoLinks() {
      if(!this.listExpandedLinks){

        this.cursadas = null;
        this.finales = null;
        this.profesores = null;
        this.diasHorarios = null;
        this.consultas = null;
        this.links = this.materiaDoc.valueChanges();
      
        this.listExpandedLinks = true;


      }
      else{
        this.links = null;
        this.listExpandedLinks = false;


      } 

    }
}
