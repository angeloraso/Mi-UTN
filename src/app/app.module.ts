import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

// Plugins & 3tr Libraries
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { Data } from '../providers/data/data';

import { HomePageModule } from '../pages/home/home.module';
import { InstitucionPageModule } from '../pages/institucion/institucion.module';
import { MateriasPageModule } from '../pages/materias/materias.module';
import { NoticiasPageModule } from '../pages/noticias/noticias.module';
import { PerfilPageModule } from '../pages/perfil/perfil.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    IonicStorageModule.forRoot(),
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Data,
  ]
})


export class AppModule {}
