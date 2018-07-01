import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InstitucionPage } from '../institucion/institucion';
import { NoticiasPage } from '../noticias/noticias';
import { MateriasPage } from '../materias/materias';
import { PerfilPage } from '../perfil/perfil';


@Component({
  templateUrl: 'home.html'
})

export class HomePage {


    tab1Root = InstitucionPage;
    tab2Root = NoticiasPage;
    tab3Root = MateriasPage;
    tab4Root = PerfilPage;

    constructor(public navCtrl: NavController) {
  }

}



