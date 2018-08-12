import { Injectable, NgZone } from '@angular/core';
import PouchDB from 'pouchdb';
 

@Injectable()
export class Data {
 
  private username: string =  "8484901b-4df0-4fac-a2ca-d28631a54baf-bluemix"; // User de IBM Cloudant
  private password: string = "0d421587d0341b142725eac446152622d0502f0a8c923eda973c109b14d90dcd";// Pass de IBM Cloudant
  private URL_DATABASE: string =  'https://' + this.username + ':' + this.password + '@8484901b-4df0-4fac-a2ca-d28631a54baf-bluemix.cloudant.com/';

  data: any;

 
  constructor(public zone: NgZone) {
 
  }
 
  // La ruta_de_la_tabla no debe comenzar con /
  putDocumento(ruta_de_la_tabla: string, documento: any){
    let url = this.URL_DATABASE + ruta_de_la_tabla;
    var remoteDB = new PouchDB(url);

    remoteDB.put(documento);
  }

  // La ruta_de_la_tabla no debe comenzar con /
  getTodosLosDocumentos(ruta_de_la_tabla: string, quiero_guardarlos_localmente: boolean){
    var that = this;
    var documentos = [];

    const localDB = new PouchDB(ruta_de_la_tabla); 

    localDB.info().then(function (details) { 
    if (details.doc_count == 0 && details.update_seq == 0) { 
        // La base de datos NO existe en memoria

        let url = that.URL_DATABASE + ruta_de_la_tabla;
        var remoteDB = new PouchDB(url); // Genero un vinculo con la base de datos remota

        if(quiero_guardarlos_localmente){
          localDB.replicate.from(remoteDB, {live: true, retry: true});
        }
        remoteDB.allDocs({include_docs: true, attachments: true}).then((result) => {
          result.rows.map((row) => {
            documentos.push(row.doc); // Guardo todos los documentos en el arreglo que devuelvo
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
          });
        }).catch(function (err) {
          console.log(err);
        });
    } 
    }) 
    .catch(function (err) { 
        console.log('error: ' + err); 
    }); 
    return documentos; // Devuelvo todos los documentos de la base de datos seleccionada
  }

  /* put(tabla: string, documento: any){
    this.remoteDB.put({
      _id: 'mydoc',
      title: 'Heroes'
    }).then(function (response) {
      // handle response
    }).catch(function (err) {
      console.log(err);
    });
  }
 
  getDocuments(){
 
    return new Promise(resolve => {
 
      this.remoteDB.allDocs({
 
        include_docs: true
 
      }).then((result) => {
 
        this.data = [];
 
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
          resolve(this.data);
        });
 
        this.remoteDB.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
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