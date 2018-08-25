import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarioAcademicoPage } from './calendario-academico';

@NgModule({
  declarations: [
    CalendarioAcademicoPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarioAcademicoPage),
  ],
})
export class CalendarioAcademicoPageModule {}
