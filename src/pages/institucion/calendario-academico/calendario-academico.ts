import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Opcion, CalendarioAnual } from '../../../interfaces/institucion.interface';
import { Data } from '../../../providers/data/data';
import * as _ from 'lodash';

@Component({
  selector: 'page-calendario-academico',
  templateUrl: 'calendario-academico.html',
})
export class CalendarioAcademicoPage {

  opcion: Opcion;

  calendariosAnuales: Array<CalendarioAnual>; // El cronograma de cada año

  // Por defecto, el calendario mostrará el primer año cargado
  anioElegido: CalendarioAnual = {anio: '', cronograma: [] };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataService: Data) {
  }

  ngOnInit( ) {
    // Para leer las variables entrantes. En el constructor no se van a poder ver
    const that = this;
    this.opcion = this.navParams.get('opcion'); // Opcion elegida

    this.dataService.getTodosLosDocumentos(this.opcion.base_datos).then((result: any) => {
        that.calendariosAnuales = _.find(result, function(res) { return res._id === that.opcion.id_documento; }).calendario;
        that.anioElegido = that.calendariosAnuales[0]; // Por defecto, el calendario mostrará el primer año cargado
    });
  }

}
