import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Opcion, TokenComedor } from '../../../interfaces/institucion.interface';
import { Platform } from 'ionic-angular';
import { ComedorProvider } from '../../../providers/comedor/comedor';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-comedor',
  templateUrl: 'comedor.html'
})
export class ComedorPage {
  public token: TokenComedor;
  public tabs: string;
  public saldo: string;

  public isActive = false;

  public ios: boolean;

  public dias = [
    {nombre: 'Lunes', numero: '', activo: false},
    {nombre: 'Martes', numero: '', activo: false},
    {nombre: 'Miercoles', numero: '', activo: false},
    {nombre: 'Jueves', numero: '', activo: false},
    {nombre: 'Viernes', numero: '', activo: false},
  ];

  public vendedores: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public comedorProvider: ComedorProvider,
              private storage: Storage) {
    }

  ngOnInit() {
    this.ios = this.platform.is('ios');
    this.tabs = 'ticket';
    this.token = this.navParams.get('token');

    this.comedorProvider.getSaldo(this.token.token).subscribe( (res: any) => {
      this.saldo = res.saldo;
    });

    this.comedorProvider.getVendedores().subscribe(vendedores => {
      this.vendedores = vendedores;
    });
  }

  comprar() {}

}
