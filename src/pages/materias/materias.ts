import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NivelPage } from '../nivel/nivel';

@Component({
  selector: 'page-materias',
  templateUrl: 'materias.html',
})
export class MateriasPage {

  niveles = [
    {titulo: "1er Nivel", ruta_database: "primer-nivel", imagen: "assets/imgs/1er_nivel.jpg" },
    {titulo: "2do Nivel", ruta_database: "segundo-nivel", imagen: "assets/imgs/2do_nivel.jpg" },
    {titulo: "3er Nivel", ruta_database: "tercer-nivel", imagen: "assets/imgs/3er_nivel.jpg" },
    {titulo: "4to Nivel", ruta_database: "cuarto-nivel", imagen: "assets/imgs/4to_nivel.jpg" },
    {titulo: "5to Nivel", ruta_database: "quinto-nivel", imagen: "assets/imgs/5to_nivel.jpg" },
    {titulo: "Electivas", ruta_database: "electivas", imagen: "assets/imgs/electivas.jpg" },
  ]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  
  }
  irAlNivel(nivel: any){
    this.navCtrl.push(NivelPage, 
      
      {titulo: nivel.titulo, ruta_database: nivel.ruta_database});
  }

}
