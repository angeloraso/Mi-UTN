import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstitucionOpcionPage } from './institucion-opcion';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    InstitucionOpcionPage,
  ],
  imports: [
    IonicPageModule.forChild(InstitucionOpcionPage),
    IonicImageLoader,
  ],
})
export class InstitucionOpcionPageModule {}
