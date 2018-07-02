import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-institucion',
  templateUrl: 'institucion.html',
})
export class InstitucionPage {

  opcionesInstitucionRef: AngularFirestoreCollection<any>;
  opcionesInstitucion: Observable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public db: AngularFirestore) {

      this.opcionesInstitucionRef = this.db.collection('/Opciones Institucion/');
      this.opcionesInstitucion = this.opcionesInstitucionRef.valueChanges()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformacionPage');
  }

}
