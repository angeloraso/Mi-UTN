import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstitucionPage } from './institucion';

@NgModule({
  declarations: [
    InstitucionPage,
  ],
  imports: [
    IonicPageModule.forChild(InstitucionPage),
  ],
})
export class InstitucionPageModule {}
