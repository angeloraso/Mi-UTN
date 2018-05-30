import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { MateriaPage } from '../materia/materia';

/**
 * Generated class for the NivelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nivel',
  templateUrl: 'nivel.html',
})

export class NivelPage {

  title: string;

  materiasNivelRef: AngularFirestoreCollection<any>;
  materiasNivel: Observable<any[]>;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public db: AngularFirestore,) {

      this.title = navParams.get('title');

      this.materiasNivelRef = this.db.collection('/' + this.title + '/');
      this.materiasNivel = this.materiasNivelRef.valueChanges()
  }

  goToMateria(materia){
    this.navCtrl.push(MateriaPage, 
      
      {title: materia.nombre});
  }

  ionViewWillEnter() {
    
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NivelPage');
  }

}
