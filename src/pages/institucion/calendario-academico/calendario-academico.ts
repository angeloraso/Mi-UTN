import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Opcion, CalendarioAnual } from '../../../interfaces/institucion.interface';
import { Data } from '../../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-calendario-academico',
  templateUrl: 'calendario-academico.html',
})
export class CalendarioAcademicoPage {

  opcion: Opcion;

  calendariosAnuales: Array<CalendarioAnual>; // El cronograma de cada año

  // Por defecto, el calendario mostrará el segundo año cargado
  anioElegido: CalendarioAnual = {anio: "", cronograma: [] };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dataService: Data) {
  }

  ngOnInit(){
    // Para leer las variables entrantes. En el constructor no se van a poder ver
    var that = this;
    this.opcion = this.navParams.get('opcion'); //Opcion elegida
    
    this.dataService.getDocumento(this.opcion.base_datos, this.opcion.id_documento).then((result: any) =>{
        that.calendariosAnuales = result.calendario;
        that.anioElegido = result.calendario[1]; // Por defecto, el calendario mostrará el segundo año cargado
    });
  }

}
