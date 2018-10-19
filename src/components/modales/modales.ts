import { Component } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-modales',
  templateUrl: 'modales.html'
})
export class ModalesPage {
  imagen_perfil = 'assets/icon/user_icon.png';

  elementoElegido: any;

  tipo_modal: string; // String que define el modal a mostrar

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {}
  ngOnInit() {
    // Para leer las variables entrantes. En el constructor no se van a poder ver
    this.elementoElegido = this.params;
    this.tipo_modal = this.elementoElegido.data.tipo_modal;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
