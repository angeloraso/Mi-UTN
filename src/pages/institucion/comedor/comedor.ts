import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Opcion } from '../../../interfaces/institucion.interface';

@Component({
  selector: 'page-comedor',
  templateUrl: 'comedor.html'
})
export class ComedorPage {

  public opcion: Opcion;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {}


  ngOnInit( ) {
    // this.cargar();
    this.opcion = this.navParams.get('opcion'); // Opcion elegida
  }

  cargar( ) {
    const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = './logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

const request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

  // Begin accessing JSON data here
  const data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300);
      p.textContent = `${movie.description}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
};
request.send();
  }
}
