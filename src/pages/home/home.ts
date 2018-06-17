import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InstitucionPage } from '../institucion/institucion';
import { NoticiasPage } from '../noticias/noticias';
import { MateriasPage } from '../materias/materias';


@Component({
  templateUrl: 'home.html'
})

export class HomePage {


    tab1Root = InstitucionPage;
    tab2Root = NoticiasPage;
    tab3Root = MateriasPage;

    constructor(public navCtrl: NavController) {
  }

}



