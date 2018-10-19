import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalesPage } from './modales';
import { ModalBolsaComponent } from './modal-bolsa/modal-bolsa';
import { ModalDeporteComponent } from './modal-deporte/modal-deporte';
import { ModalLaboratorioComponent } from './modal-laboratorio/modal-laboratorio';

@NgModule({
  declarations: [
    ModalesPage,
    ModalBolsaComponent,
    ModalDeporteComponent,
    ModalLaboratorioComponent
  ],
  imports: [
    IonicPageModule.forChild(ModalesPage),
    IonicPageModule.forChild(ModalBolsaComponent),
    IonicPageModule.forChild(ModalDeporteComponent),
    IonicPageModule.forChild(ModalLaboratorioComponent),
  ],
})
export class ModalesModule {}
