import { Injectable, NgZone } from '@angular/core';
import PouchDB from 'pouchdb';
import _ from 'lodash';
 

@Injectable()
export class Data {
 
  private username: string =  "8484901b-4df0-4fac-a2ca-d28631a54baf-bluemix"; // User de IBM Cloudant
  private password: string = "0d421587d0341b142725eac446152622d0502f0a8c923eda973c109b14d90dcd";// Pass de IBM Cloudant
  private URL_DATABASE: string =  'https://' + this.username + ':' + this.password + '@8484901b-4df0-4fac-a2ca-d28631a54baf-bluemix.cloudant.com/';

  data: any;

 
  constructor(public zone: NgZone) {
 
  }

  destroyAll(){
    new PouchDB('primer-nivel').destroy();
    new PouchDB('segundo-nivel').destroy();
    new PouchDB('tercer-nivel').destroy();
    new PouchDB('cuarto-nivel').destroy();
    new PouchDB('quinto-nivel').destroy();
    new PouchDB('electivas').destroy();
  }

  // Devuelve todos los documentos de la tabla "ruta_tabla"
  // ruta_tabla no debe comenzar con /
  getTodosLosDocumentos(ruta_tabla: string, quiero_guardarlos_localmente?: boolean){

    if(_.isEmpty(quiero_guardarlos_localmente)) quiero_guardarlos_localmente = true;

    var that = this;
    return new Promise(resolve => {
        var documentos = [];

        const localDB = new PouchDB(ruta_tabla); 

        localDB.info().then(function (details) { 
        if (details.doc_count == 0 && details.update_seq == 0) { 
            // La base de datos NO existe en memoria

            let url = that.URL_DATABASE + ruta_tabla;
            var remoteDB = new PouchDB(url); // Genero un vinculo con la base de datos remota

            if(quiero_guardarlos_localmente){
              localDB.replicate.from(remoteDB, {live: true, retry: true});
            }
            remoteDB.allDocs({include_docs: true, attachments: true}).then((result) => {
              result.rows.map((row) => {
                documentos.push(row.doc); // Guardo todos los documentos en el arreglo que devuelvo
                console.log("DESDE REMOTO ALL " + documentos[0]);
                resolve(documentos); // Devuelvo todos los documentos de la base de datos remota
              });
            }).catch(function (err) {
              console.log(err);
            });
        } 
        else {
          // La base de datos SI existe en memoria
            localDB.allDocs({include_docs: true, attachments: true}).then((result) => {
              result.rows.map((row) => {
                documentos.push(row.doc);
                console.log("DESDE LOCAL ALL " + documentos[0]);
                resolve(documentos); // Devuelvo todos los documentos de la base de datos local
              });
            }).catch(function (err) {
              console.log(err);
            });
        } 
        }) 
        .catch(function (err) { 
            console.log('error: ' + err); 
        }); 
    });
  }
 
  // Agrega un documento en la tabla "ruta_tabla"
  // ruta_tabla no debe comenzar con /
  putDocumento(ruta_tabla: string, documento: any){
    let url = this.URL_DATABASE + ruta_tabla;
    var remoteDB = new PouchDB(url);

    remoteDB.put(documento);
  }

  /* getDocuments(){
 
    return new Promise(resolve => {
 
      this.db.allDocs({
 
        include_docs: true
 
      }).then((result) => {
 
        this.data = [];
 
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
          resolve(this.data);
        });
 
        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });
 
      }).catch((error) => {
 
        console.log(error);
 
      });
 
    });
 
  }
 
  handleChange(change){
 
    this.zone.run(() => {
 
      let changedDoc = null;
      let changedIndex = null;
 
      this.data.forEach((doc, index) => {
 
        if(doc._id === change.id){
          changedDoc = doc;
          changedIndex = index;
        }
 
      });
 
      //A document was deleted
      if(change.deleted){
        this.data.splice(changedIndex, 1);
      }
      else {
 
        //A document was updated
        if(changedDoc){
          this.data[changedIndex] = change.doc;
        }
        //A document was added
        else {
          this.data.push(change.doc);       
        }
 
      }
 
    });
 
  } */
 
}