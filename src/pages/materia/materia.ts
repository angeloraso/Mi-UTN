import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

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

@Component({
  selector: 'page-materia',
  templateUrl: 'materia.html',
})

export class MateriaPage {

  
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

      console.log(this.materiaTitle);
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
      console.log("DENTRO DEL SHOW (Cursadas): " + this.listExpandedCursadas);
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
        console.log("DENTRO DEL ELSE (Cursadas): " + this.listExpandedCursadas);
        this.cursadas = null;
        this.listExpandedCursadas = false;


      } 

    }

    showInfoFinales() {
      console.log("DENTRO DEL SHOW (Finales): " + this.listExpandedFinales);
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
        console.log("DENTRO DEL ELSE (Finales): " + this.listExpandedFinales);
        this.finales = null;
        this.listExpandedFinales = false;


      } 

    }

    showInfoDiasHorarios() {
      console.log("DENTRO DEL SHOW (DiasHorarios): " + this.listExpandedDiasHorarios);
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
        console.log("DENTRO DEL ELSE (DiasHorarios): " + this.listExpandedDiasHorarios);
        this.diasHorarios = null;
        this.listExpandedDiasHorarios = false;


      } 

    }

    showInfoProfesores() {
      console.log("DENTRO DEL SHOW (Profesores): " + this.listExpandedProfesores);
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
        console.log("DENTRO DEL ELSE (Profesores): " + this.listExpandedProfesores);
        this.profesores = null;
        this.listExpandedProfesores = false;


      } 

    }

    showInfoConsultas() {
      console.log("DENTRO DEL SHOW (Consultas): " + this.listExpandedConsultas);
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
        console.log("DENTRO DEL ELSE (Consultas): " + this.listExpandedConsultas);
        this.consultas = null;
        this.listExpandedConsultas = false;


      } 

    }

    showInfoLinks() {
      console.log("DENTRO DEL SHOW (links): " + this.listExpandedLinks);
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
        console.log("DENTRO DEL ELSE (links): " + this.listExpandedLinks);
        this.links = null;
        this.listExpandedLinks = false;


      } 

    }


    mostrarConsole(){
      console.log("Prueba 3");
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MateriaPage');
  }

}
