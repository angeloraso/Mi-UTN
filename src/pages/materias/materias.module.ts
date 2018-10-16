import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MateriasPage } from './materias';
import { MateriaPage } from './materia/materia';
import { NivelPage } from './nivel/nivel';
import { ExpandableListModule } from 'angular2-expandable-list';

@NgModule({
  declarations: [
    MateriasPage,
    MateriaPage,
    NivelPage
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    ExpandableListModule,
    IonicPageModule.forChild(MateriasPage),
    IonicPageModule.forChild(MateriaPage),
    IonicPageModule.forChild(NivelPage),
  ],
})
export class MateriasPageModule {}
