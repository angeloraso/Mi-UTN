import { Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';

import { InstitucionPage } from '../institucion/institucion';
import { NoticiasPage } from '../noticias/noticias';
import { MateriasPage } from '../materias/materias';
import { PerfilPage } from '../perfil/perfil';
import { Tabs } from 'ionic-angular/components/tabs/tabs';
import { NavParams } from 'ionic-angular/navigation/nav-params';

import * as _ from 'lodash';


@Component({
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = InstitucionPage;
  tab2Root = NoticiasPage;
  tab3Root = MateriasPage;
  tab4Root = PerfilPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
      const tab = this.navParams.get('tab');
      if ( _.isEmpty(tab) ) {
        this.tabRef.select(1);
      } else if (tab === 'institucion') {
        this.tabRef.select(0);
      }
  }

}



