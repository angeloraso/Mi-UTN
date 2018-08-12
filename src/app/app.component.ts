import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { AuthProvider } from '../providers/auth/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(private platform: Platform, 
              private statusBar: StatusBar, 
              private splashScreen: SplashScreen,
              private auth: AuthProvider,) {

      this.initializeApp();

  }
  
  initializeApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.auth.Session.subscribe(session=>{
        if(session){
            this.rootPage = HomePage;
        }
          else{
            //this.rootPage = LoginPage;
            this.rootPage = HomePage;
          }
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  cerrarSesion(){
    this.auth.logout();
}
}

