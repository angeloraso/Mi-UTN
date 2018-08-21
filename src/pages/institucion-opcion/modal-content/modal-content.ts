import { Component } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: 'page-modal-content',
    templateUrl: 'modal-content.html',
  })
  export class ModalContentPage {

    elementoElegido: any;
  
    constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController
    ) {

      this.elementoElegido = this.params;
    }
  
    dismiss() {
      this.viewCtrl.dismiss();
    }
  }