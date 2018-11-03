import { Injectable, NgZone } from '@angular/core';
import PouchDB from 'pouchdb';
import _ from 'lodash';


@Injectable()
export class Data {

  private username =  '8484901b-4df0-4fac-a2ca-d28631a54baf-bluemix'; // User de IBM Cloudant
  private password = '0d421587d0341b142725eac446152622d0502f0a8c923eda973c109b14d90dcd'; // Pass de IBM Cloudant
  private URL_DATABASE =  'https://' + this.username + ':' + this.password + '@8484901b-4df0-4fac-a2ca-d28631a54baf-bluemix.cloudant.com/';

  private data: any;


  constructor(public zone: NgZone) {

  }


  // Devuelve el documento con el id_documento de la tabla 'ruta_tabla'
  // ruta_tabla no debe comenzar con /
  getDocumento(ruta_tabla: string, id_documento: string, quiero_guardarlos_localmente?: boolean) {
    if (_.isEmpty(quiero_guardarlos_localmente)) {
      quiero_guardarlos_localmente = true;
    }

    const that = this;
    return new Promise(resolve => {
        let documento = {};

        const localDB = new PouchDB(ruta_tabla);

        localDB.info().then(function (details) {
        if (details.doc_count === 0 && details.update_seq === 0) {
            // La base de datos NO existe en memoria

            const url = that.URL_DATABASE + ruta_tabla;
            const remoteDB = new PouchDB(url); // Genero un vinculo con la base de datos remota

            if (quiero_guardarlos_localmente) {
              localDB.replicate.from(remoteDB, {live: true, retry: true});
            }
            remoteDB.get(id_documento).then((result) => {
                documento = result;
                resolve(documento); // Devuelvo el documento buscado de la base de datos remota
            }).catch(function (err) {});
        } else {
          // La base de datos SI existe en memoria
            localDB.get(id_documento).then((result) => {
                documento = result;
                resolve(documento); // Devuelvo el documento buscado de la base de datos local
            }).catch(function (err) {});
            localDB.changes({live: true, since: 'now', include_docs: true, attachments: true}).on('change', (change) => {
              that.handleChange(change, documento);
            });
        }
        })
        .catch(function (err) {});
    });

  }

  // Devuelve todos los documentos de la tabla 'ruta_tabla'
  // ruta_tabla no debe comenzar con /
  getTodosLosDocumentos(ruta_tabla: string, quiero_guardarlos_localmente?: boolean) {

    if (_.isEmpty(quiero_guardarlos_localmente)) {
      quiero_guardarlos_localmente = true;
    }

    const that = this;
    return new Promise(resolve => {
        const documentos = [];

        const localDB = new PouchDB(ruta_tabla);

        localDB.info().then(function (details) {
        if (details.doc_count === 0 && details.update_seq === 0) {
            // La base de datos NO existe en memoria

            const url = that.URL_DATABASE + ruta_tabla;
            const remoteDB = new PouchDB(url); // Genero un vinculo con la base de datos remota

            if (quiero_guardarlos_localmente) {
              localDB.replicate.from(remoteDB, {live: true, retry: true});
            }
            remoteDB.allDocs({include_docs: true, attachments: true}).then((result) => {
              result.rows.map((row) => {
                documentos.push(row.doc); // Guardo todos los documentos en el arreglo que devuelvo
                resolve(documentos); // Devuelvo todos los documentos de la base de datos remota
              });

            }).catch(function (err) {});
        } else {
          // La base de datos SI existe en memoria
            localDB.allDocs({include_docs: true, attachments: true}).then((result) => {
              result.rows.map((row) => {
                documentos.push(row.doc);
                resolve(documentos); // Devuelvo todos los documentos de la base de datos local
              });
              localDB.changes({live: true, since: 'now', include_docs: true, attachments: true}).on('change', (change) => {
                that.handleChange(change, documentos);
              });
            }).catch(function (err) {});
        }
        })
        .catch(function (err) {});
    });
  }

  handleChange(change, data) {
    this.data = data;

    this.zone.run(() => {

      let changedDoc = null;
      let changedIndex = null;

      this.data.forEach((doc, index) => {

        if (doc._id === change.id) {
          changedDoc = doc;
          changedIndex = index;
        }

      });
      // A document was deleted
      if (change.deleted) {
        this.data.splice(changedIndex, 1);
      } else {
        // A document was updated
        if (changedDoc) {
          this.data[changedIndex] = change.doc;
        } else {
           // A document was added
          this.data.push(change.doc);
        }

      }

    });

  }

  // Agrega un documento en la tabla 'ruta_tabla'
  // ruta_tabla no debe comenzar con /
  putDocumento(ruta_tabla: string, documento: any) {
    const url = this.URL_DATABASE + ruta_tabla;
    const remoteDB = new PouchDB(url);

    remoteDB.put(documento);
  }

}
