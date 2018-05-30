import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SuperTabsController } from 'ionic2-super-tabs';
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

    constructor(public navCtrl: NavController,
                private superTabsCtrl: SuperTabsController) {
  }

  ngAfterViewInit() {
    // must wait for AfterViewInit if you want to modify the tabs instantly
    this.superTabsCtrl.enableTabsSwipe(true);
  
  }
  
  hideToolbar() {
    this.superTabsCtrl.showToolbar(false);
  }
  
  showToolbar() {
    this.superTabsCtrl.showToolbar(true);
  }

}



