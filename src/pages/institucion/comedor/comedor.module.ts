import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { IonicPageModule } from 'ionic-angular';
import { ComedorPage } from './comedor';
import { LoginComedorPage } from './login-comedor/login-comedor';
import { ComedorProvider } from '../../../providers/comedor/comedor';

@NgModule({
  declarations: [
    ComedorPage,
    LoginComedorPage
  ],
  imports: [
    IonicPageModule.forChild(ComedorPage),
    IonicPageModule.forChild(LoginComedorPage),
    HttpClientModule
  ],
  providers: [
    ComedorProvider
  ]
})
export class ComedorPageModule {}
