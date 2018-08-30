import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// Plugins & 3tr Libraries
import { ExpandableListModule } from 'angular2-expandable-list';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { FlashCardComponent } from '../components/flash-card/flash-card';
import { Data } from '../providers/data/data';

import { NoticiasPage } from '../pages/noticias/noticias';
import { MateriasPage } from '../pages/materias/materias';
import { PerfilPage } from '../pages/perfil/perfil';
import { InstitucionPage } from '../pages/institucion/institucion';
import { MateriaPage } from '../pages/materias/materia/materia';
import { NivelPage } from '../pages/materias/nivel/nivel';
import { InstitucionOpcionPage } from '../pages/institucion/institucion-opcion/institucion-opcion';
import { ModalesPage } from '../components/modales/modales';
import { ModalLaboratorioComponent } from '../components/modales/modal-laboratorio/modal-laboratorio';
import { CalendarioAcademicoPage } from '../pages/institucion/calendario-academico/calendario-academico';
import { ModalDeporteComponent } from '../components/modales/modal-deporte/modal-deporte';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FlashCardComponent,
    NoticiasPage,
    MateriasPage,
    PerfilPage,
    InstitucionPage,
    MateriaPage,
    NivelPage,
    InstitucionOpcionPage,
    ModalesPage,
    ModalLaboratorioComponent,
    CalendarioAcademicoPage,
    ModalDeporteComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    BrowserModule,
    ExpandableListModule,
    BrowserAnimationsModule
    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NoticiasPage,
    MateriasPage,
    PerfilPage,
    InstitucionPage,
    MateriaPage,
    NivelPage,
    InstitucionOpcionPage,
    ModalesPage,
    ModalLaboratorioComponent,
    CalendarioAcademicoPage,
    ModalDeporteComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Data,
  ]
})


export class AppModule {}
