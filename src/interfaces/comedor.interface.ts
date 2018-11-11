export interface TokenComedor {
  nombre: string; // EJ: "Juan"
  apellido: string; // EJ: "Perez"
  token: string; // EJ: "afa5fs67fsf8f5F8F55f8Fa5f9a6FA8f6f87Fs9fsF69f57Ff57sf57sfSF59"
  especialidad: string; // EJ: "Sistemas"
  documento: string; // EJ: "371234567"
}

export class TokenComedor implements TokenComedor {
  nombre: string; // EJ: "Juan"
  apellido: string; // EJ: "Perez"
  token: string; // EJ: "afa5fs67fsf8f5F8F55f8Fa5f9a6FA8f6f87Fs9fsF69f57Ff57sf57sfSF59"
  especialidad: string; // EJ: "Sistemas"
  documento: string; // EJ: "371234567"

  constructor() {
    this.nombre = '';
    this.apellido = '';
    this.token = '';
    this.especialidad = '';
    this.documento = '';
  }

}

export interface Dia {
  nombre: string; // EJ: "Lunes"
  numero: string; // EJ: "15" - Referido al día 15 del mes
  fecha: string; // EJ: "2018-07-15"
  activo: boolean; // EJ: true - Referido a si el usuario compró o no para etsa fecha
  deshabilitado: boolean; // EJ: false - Referido a si es un día habilitado para comprar
}

export interface RespuestaComedor {
  resultado: string; // EJ: "OK"
}

export interface DiaComprado {
  dia_comprado: string; // EJ: "2018-07-13"
}

export interface Saldo {
  saldo: string; // EJ: "180" - Referido al saldo de la cuenta en pesos $
}

export interface Feriado {
  fecha: string; // EJ: "2018-07-13"
  observacion: string; // EJ: "Feriado" - Referido a la razon del feriado
}

export interface Receso {
  inicio: string; // EJ: "2018-07-13"
  fin: string; // EJ: "2018-07-25"
}

export interface Historial {
  dia_comprado: string; // EJ: "2018-07-13"
  precio: string; // EJ: "20
}
