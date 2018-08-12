import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InstitucionPage } from '../pages/institucion/institucion';
import { MateriasPage } from '../pages/materias/materias';
import { NoticiasPage } from '../pages/noticias/noticias';
import { PerfilPage } from '../pages/perfil/perfil';

import { NivelPage } from '../pages/nivel/nivel';
import { MateriaPage } from '../pages/materia/materia';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { ExpandableListModule } from 'angular2-expandable-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlashCardComponent } from '../components/flash-card/flash-card';
import { Data } from '../providers/data/data';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



export const firebaseConfig = {
  apiKey: "AIzaSyCVSKHVTedumeqbPbp32jaSefk0SDQQ5nk",
  authDomain: "miutn-bbb58.firebaseapp.com",
  databaseURL: "https://miutn-bbb58.firebaseio.com",
  projectId: "miutn-bbb58",
  storageBucket: "",
  messagingSenderId: '372411765036'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NoticiasPage,
    MateriasPage,
    InstitucionPage,
    NivelPage,
    MateriaPage,
    LoginPage,
    PerfilPage,
    FlashCardComponent,
  ],
  imports: [
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    BrowserModule,
    ExpandableListModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FontAwesomeModule,
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
    InstitucionPage,
    NivelPage,
    LoginPage,
    MateriaPage,
    PerfilPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Data,
  ]
})
export class AppModule {}
