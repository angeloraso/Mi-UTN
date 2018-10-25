import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Opcion, TokenComedor } from '../../../interfaces/institucion.interface';
import { Platform } from 'ionic-angular';
import { ComedorProvider } from '../../../providers/comedor/comedor';

@Component({
  selector: 'page-comedor',
  templateUrl: 'comedor.html'
})
export class ComedorPage {
  public token: TokenComedor;
  public tabs: string;

  public isActive = false;

  public ios: boolean;

  public dias = [
    {nombre: 'Lunes', numero: '15'},
    {nombre: 'Martes', numero: '16'},
    {nombre: 'Miercoles', numero: '17'},
    {nombre: 'Jueves', numero: '18'},
    {nombre: 'Viernes', numero: '19'},
  ];

  public vendedores: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public comedorProvider: ComedorProvider) {
    }

  ngOnInit() {
    this.ios = this.platform.is('ios');
    this.tabs = 'ticket';
    this.token = this.navParams.get('token');

    this.comedorProvider.getVendedores().subscribe(vendedores => {
      this.vendedores = vendedores;
    });
  }

}
