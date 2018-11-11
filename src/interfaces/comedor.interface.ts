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

export interface Compra {
  dia_comprado: string; // EJ: "2018-07-13"
  precio: string; // EJ: "20"
}

export interface CompraRecargada {
  dia_comprado: string; // EJ: "2018-07-13"
  precio: string; // EJ: "20"
  nombre: string; // EJ: "Lunes"
  numero: string; // EJ: "13"
  mes: string; // EJ: "Julio"
}

export interface Turno {
  id: string; // EJ: "10" - Los ids de turnos y menues deben estar distantes entre si para no solaparse
  nombre: string; // EJ: "Temprano"
  horario: string; // EJ: 12:00:00
  activo: boolean; // EJ: true
  value: string; // EJ: "1"
}
export interface Menu {
  id: string; // EJ: "30" - Los ids de turnos y menues deben estar distantes entre si para no solaparse
  nombre: string; // EJ: "Temprano"
  activo: boolean; // EJ: true
  value: string; // EJ: "1"
}

export interface Config {
    menu: {
        disponible: [ // Arreglo de objetos con los menues disponibles
                      {
                        id_tipo_menu: string; // EJ: "1"
                        nombre: string; // EJ: "1"
                        seleccionado: boolean; // EJ: true
                      },
                      {
                        id_tipo_menu: string; // EJ: "2"
                        nombre: string; // EJ: "2"
                        seleccionado: boolean; // EJ: true
                      }
                    ],
        selected: string; // EJ: "1"
    };
    turno: {
      disponible: [ // Arreglo de objetos con los turnos disponibles
                    {
                      horario: string; // EJ: "12:00:00"
                      id_comida: string; // EJ: "1"
                      id_turno: string; // EJ: "1"
                      seleccionado: boolean; // EJ: true
                    },
                    {
                      horario: string; // EJ: "13:00:00"
                      id_comida: string; // EJ: "1"
                      id_turno: string; // EJ: "2"
                      seleccionado: boolean; // EJ: false
                    }
                  ],
      selected: string; // EJ: "1"
    };
}
