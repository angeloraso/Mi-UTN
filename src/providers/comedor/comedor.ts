import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ComedorProvider {

  private url_base = 'https://ticket.frlp.utn.edu.ar/api/index.php';

  private device = 2;

  private fcmToken = 1;

  private token: string;

  private usuario: string;

  constructor(public http: HttpClient) {}


  getToken(usuario: string, pass: string) {
    this.usuario = usuario;
    this.http.get(this.url_base + '/getToken/' + usuario + '/' + pass + '/' + this.device + '/' + this.fcmToken)
        .subscribe((token: string) => {
            this.token = token;
    });
  }

  checkToken() {
    return this.http.get(this.url_base + '/checkToken/' + this.token + '/' + this.device + '/' + this.usuario);
  }

  refreshToken() {
    this.http.get(this.url_base + '/refreshToken/' + this.token + '/' + this.device + '/' + this.usuario)
    .subscribe( (token: string) => {
      this.token = token;
    });
  }

  getSaldo() {
    return this.http.get(this.url_base + '/saldo/' + this.token);
  }

  getVendedores() {
    return this.http.get(this.url_base + '/vendedor');
  }

  comprar(arreglo_dias: string[]) {
    let dias = '';
    if (typeof arreglo_dias !== 'undefined' && arreglo_dias !== []) {
      dias = arreglo_dias[0];
    }
    for (let i = 1; arreglo_dias.length < i; i ++) {
      dias += ',' + arreglo_dias[i];
    }
    this.http.get(this.url_base + '/comprar/' + dias + '/' + this.token);
  }

  getDiasComprados() {
    return this.http.get(this.url_base + '/diasComprados/' + this.token);
  }

  deshacerDiasComprados(arreglo_dias: string[]) {
    let dias = '';
    if (typeof arreglo_dias !== 'undefined' && arreglo_dias !== []) {
      dias = arreglo_dias[0];
    }
    for (let i = 1; arreglo_dias.length < i; i ++) {
      dias += ',' + arreglo_dias[i];
    }
    return this.http.get(this.url_base + '/deshacer/' + dias);
  }

  getEsPeriodoCompra() {
    return this.http.get(this.url_base + '/periodoCompra/' + this.token);
  }

  getFeriadosPeriodo(fecha_inicio, fecha_fin) {
    return this.http.get(this.url_base + '/feriadosSemana/' + fecha_inicio + '/' + fecha_fin + '/' + this.token);
  }

  getReceso() {
    return this.http.get(this.url_base + '/getReceso/' + this.token);
  }

}
