import { Component, ViewChild, Input } from "@angular/core";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Slides, Platform, NavParams, ViewController } from "ionic-angular";


@Component({
  selector: 'modal-uno',
  templateUrl: './modal-uno.html'
})
export class ModalUnoComponent {
  @ViewChild('slider') slider: Slides;

  @Input() fotos: Array<string>;
  @Input() links: Array<{titulo:string, link:string}>;
  @Input() horario: string;
  @Input() descripcion: string;
  @Input() emails: string;


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
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private theInAppBrowser: InAppBrowser
  ) {

  }

  ngOnInit(){
    // Para leer las variables entrantes. En el constructor no se van a poder ver
  }

  // METODO PARA ABRIR ENLACE EN PAGINA APARTE
  public openWithSystemBrowser(url : string){
    let target = "_system";
    this.theInAppBrowser.create(url, target, this.options);
  }
  
  // VARIABLES DEL ION-SLIDES
  currentIndex = 0;

  nextSlide() {
    this.slider.slideNext();
  }

  previousSlide() {
    this.slider.slidePrev();
  }

  onSlideChanged() {
    this.currentIndex = this.slider.getActiveIndex();
    //console.log('Slide changed! Current index is', this.currentIndex);
  }
}