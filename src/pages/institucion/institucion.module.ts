import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { IonicPageModule } from 'ionic-angular';
import { InstitucionPage } from './institucion';
import { InstitucionOpcionPage } from './institucion-opcion/institucion-opcion';
import { CalendarioAcademicoPage } from './calendario-academico/calendario-academico';
import { ModalesModule } from '../../components/modales/modales.module';
import { ComedorPageModule } from './comedor/comedor.module';


@NgModule({
  declarations: [
    InstitucionPage,
    InstitucionOpcionPage,
    CalendarioAcademicoPage,
  ],
  imports: [
    ModalesModule,
    ComedorPageModule,
    IonicPageModule.forChild(InstitucionPage),
    IonicPageModule.forChild(InstitucionOpcionPage),
    IonicPageModule.forChild(CalendarioAcademicoPage),
    HttpClientModule
  ],
  providers: []
})
export class InstitucionPageModule {}
