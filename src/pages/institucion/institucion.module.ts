import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstitucionPage } from './institucion';
import { InstitucionOpcionPage } from './institucion-opcion/institucion-opcion';
import { CalendarioAcademicoPage } from './calendario-academico/calendario-academico';
import { ComedorPage } from './comedor/comedor';

@NgModule({
  declarations: [
    InstitucionPage,
    InstitucionOpcionPage,
    CalendarioAcademicoPage,
    ComedorPage,
  ],
  imports: [
    IonicPageModule.forChild(InstitucionPage),
    IonicPageModule.forChild(InstitucionOpcionPage),
    IonicPageModule.forChild(CalendarioAcademicoPage),
    IonicPageModule.forChild(ComedorPage),
  ],
})
export class InstitucionPageModule {}
