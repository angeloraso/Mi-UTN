import { Component, ViewChild } from '@angular/core';

import { Platform, NavParams, ViewController, Slides } from 'ionic-angular';
import _ from 'lodash';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@Component({
    selector: 'page-modal-content',
    templateUrl: 'modal-content.html',
  })
  export class ModalContentPage {
    @ViewChild('slider') slider: Slides;

    options : InAppBrowserOptions = {
      location : 'yes',//Or 'no' 
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls 
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only 
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only 
      toolbar : 'yes', //iOS only 
      enableViewportScale : 'no', //iOS only 
      allowInlineMediaPlayback : 'no',//iOS only 
      presentationstyle : 'pagesheet',//iOS only 
      fullscreen : 'yes',//Windows only    
  };

    CATEGORIAS = [
                    'laboratorios', 
                    'becas', 
                    'bolsa-de-proyectos', 
                    'deportes', 
                    'entidades-academicas', 
                    'secretarias'
                  ];

    elementoElegido: any;

    tipo_modal: string; // String que define el modal a mostrar
  
    constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController,
      private theInAppBrowser: InAppBrowser
    ) {

      this.elementoElegido = this.params;

      if(_.includes(this.CATEGORIAS, this.elementoElegido.data.categoria)) {
        this.tipo_modal = this.elementoElegido.categoria;
      }

    }

    public openWithSystemBrowser(url : string){
      let target = "_system";
      this.theInAppBrowser.create(url,target,this.options);
    }
    
    currentIndex = 0;

    nextSlide() {
      this.slider.slideNext();
    }
  
    previousSlide() {
      this.slider.slidePrev();
    }
  
    onSlideChanged() {
      this.currentIndex = this.slider.getActiveIndex();
      console.log('Slide changed! Current index is', this.currentIndex);
    }
  
    dismiss() {
      this.viewCtrl.dismiss();
    }
  }