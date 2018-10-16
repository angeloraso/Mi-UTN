import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyApp } from './app.component';

// Plugins & 3tr Libraries
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { FlashCardComponent } from '../components/flash-card/flash-card';
import { Data } from '../providers/data/data';

import { ModalesPage } from '../components/modales/modales';
import { ModalLaboratorioComponent } from '../components/modales/modal-laboratorio/modal-laboratorio';
import { ModalDeporteComponent } from '../components/modales/modal-deporte/modal-deporte';
import { ModalBolsaComponent } from '../components/modales/modal-bolsa/modal-bolsa';
import { HomePageModule } from '../pages/home/home.module';
import { InstitucionPageModule } from '../pages/institucion/institucion.module';
import { MateriasPageModule } from '../pages/materias/materias.module';
import { NoticiasPageModule } from '../pages/noticias/noticias.module';
import { PerfilPageModule } from '../pages/perfil/perfil.module';


@NgModule({
  declarations: [
    MyApp,
    FlashCardComponent,
    ModalesPage,
    ModalLaboratorioComponent,
    ModalDeporteComponent,
    ModalBolsaComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    BrowserModule,
    BrowserAnimationsModule,
    HomePageModule,
    InstitucionPageModule,
    MateriasPageModule,
    NoticiasPageModule,
    PerfilPageModule
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ModalesPage,
    ModalLaboratorioComponent,
    ModalDeporteComponent,
    ModalBolsaComponent
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
