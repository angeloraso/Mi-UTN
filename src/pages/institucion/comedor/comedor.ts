import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Opcion } from '../../../interfaces/institucion.interface';
import { Platform } from 'ionic-angular';
import { ComedorProvider } from '../../../providers/comedor/comedor';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-comedor',
  templateUrl: 'comedor.html'
})
export class ComedorPage {
  public opcion: Opcion;
  public tabs: string;

  public isActive = false;

  public ios: boolean;

  public dias = [
    {nombre: 'Lunes', numero: '15'},
    {nombre: 'Martes', numero: '16'},
    {nombre: 'Miercoles', numero: '17'},
    {nombre: 'Jueves', numero: '18'},
    {nombre: 'Viernes', numero: '19'},
  ];

  public vendedores: any;

  public hex_chr = '0123456789abcdef'.split('');

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public comedorProvider: ComedorProvider) {
    }

  ngOnInit() {
    this.ios = this.platform.is('ios');
    this.tabs = 'historial';
    this.cargar();
    this.opcion = this.navParams.get('opcion'); // Opcion elegida

    this.comedorProvider.getVendedores().subscribe(vendedores => {
      this.vendedores = vendedores;
    });
  }

  comprar() {
    this.isActive = !this.isActive;
    setTimeout(() => {
      this.isActive = !this.isActive;
    }, 250);
  }

  cargar() {
    const request = new XMLHttpRequest();
    const pass = this.md5('crisputo');
    request.open(
      'GET',
      'https://ticket.frlp.utn.edu.ar/api/index.php/getToken/37710379/' +
        pass +
        '/2/1',
      true
    );
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(this.response);
        console.log(data);

        /*   data.forEach(movie => {
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
    }); */
      } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        console.log(errorMessage);
      }
    };
    request.send();
  }

  md5cycle(x, k) {
    let a = x[0],
      b = x[1],
      c = x[2],
      d = x[3];

    a = this.ff(a, b, c, d, k[0], 7, -680876936);
    d = this.ff(d, a, b, c, k[1], 12, -389564586);
    c = this.ff(c, d, a, b, k[2], 17, 606105819);
    b = this.ff(b, c, d, a, k[3], 22, -1044525330);
    a = this.ff(a, b, c, d, k[4], 7, -176418897);
    d = this.ff(d, a, b, c, k[5], 12, 1200080426);
    c = this.ff(c, d, a, b, k[6], 17, -1473231341);
    b = this.ff(b, c, d, a, k[7], 22, -45705983);
    a = this.ff(a, b, c, d, k[8], 7, 1770035416);
    d = this.ff(d, a, b, c, k[9], 12, -1958414417);
    c = this.ff(c, d, a, b, k[10], 17, -42063);
    b = this.ff(b, c, d, a, k[11], 22, -1990404162);
    a = this.ff(a, b, c, d, k[12], 7, 1804603682);
    d = this.ff(d, a, b, c, k[13], 12, -40341101);
    c = this.ff(c, d, a, b, k[14], 17, -1502002290);
    b = this.ff(b, c, d, a, k[15], 22, 1236535329);

    a = this.gg(a, b, c, d, k[1], 5, -165796510);
    d = this.gg(d, a, b, c, k[6], 9, -1069501632);
    c = this.gg(c, d, a, b, k[11], 14, 643717713);
    b = this.gg(b, c, d, a, k[0], 20, -373897302);
    a = this.gg(a, b, c, d, k[5], 5, -701558691);
    d = this.gg(d, a, b, c, k[10], 9, 38016083);
    c = this.gg(c, d, a, b, k[15], 14, -660478335);
    b = this.gg(b, c, d, a, k[4], 20, -405537848);
    a = this.gg(a, b, c, d, k[9], 5, 568446438);
    d = this.gg(d, a, b, c, k[14], 9, -1019803690);
    c = this.gg(c, d, a, b, k[3], 14, -187363961);
    b = this.gg(b, c, d, a, k[8], 20, 1163531501);
    a = this.gg(a, b, c, d, k[13], 5, -1444681467);
    d = this.gg(d, a, b, c, k[2], 9, -51403784);
    c = this.gg(c, d, a, b, k[7], 14, 1735328473);
    b = this.gg(b, c, d, a, k[12], 20, -1926607734);

    a = this.hh(a, b, c, d, k[5], 4, -378558);
    d = this.hh(d, a, b, c, k[8], 11, -2022574463);
    c = this.hh(c, d, a, b, k[11], 16, 1839030562);
    b = this.hh(b, c, d, a, k[14], 23, -35309556);
    a = this.hh(a, b, c, d, k[1], 4, -1530992060);
    d = this.hh(d, a, b, c, k[4], 11, 1272893353);
    c = this.hh(c, d, a, b, k[7], 16, -155497632);
    b = this.hh(b, c, d, a, k[10], 23, -1094730640);
    a = this.hh(a, b, c, d, k[13], 4, 681279174);
    d = this.hh(d, a, b, c, k[0], 11, -358537222);
    c = this.hh(c, d, a, b, k[3], 16, -722521979);
    b = this.hh(b, c, d, a, k[6], 23, 76029189);
    a = this.hh(a, b, c, d, k[9], 4, -640364487);
    d = this.hh(d, a, b, c, k[12], 11, -421815835);
    c = this.hh(c, d, a, b, k[15], 16, 530742520);
    b = this.hh(b, c, d, a, k[2], 23, -995338651);

    a = this.li(a, b, c, d, k[0], 6, -198630844);
    d = this.li(d, a, b, c, k[7], 10, 1126891415);
    c = this.li(c, d, a, b, k[14], 15, -1416354905);
    b = this.li(b, c, d, a, k[5], 21, -57434055);
    a = this.li(a, b, c, d, k[12], 6, 1700485571);
    d = this.li(d, a, b, c, k[3], 10, -1894986606);
    c = this.li(c, d, a, b, k[10], 15, -1051523);
    b = this.li(b, c, d, a, k[1], 21, -2054922799);
    a = this.li(a, b, c, d, k[8], 6, 1873313359);
    d = this.li(d, a, b, c, k[15], 10, -30611744);
    c = this.li(c, d, a, b, k[6], 15, -1560198380);
    b = this.li(b, c, d, a, k[13], 21, 1309151649);
    a = this.li(a, b, c, d, k[4], 6, -145523070);
    d = this.li(d, a, b, c, k[11], 10, -1120210379);
    c = this.li(c, d, a, b, k[2], 15, 718787259);
    b = this.li(b, c, d, a, k[9], 21, -343485551);

    x[0] = this.add32(a, x[0]);
    x[1] = this.add32(b, x[1]);
    x[2] = this.add32(c, x[2]);
    x[3] = this.add32(d, x[3]);
  }

  cmn(q, a, b, x, s, t) {
    a = this.add32(this.add32(a, q), this.add32(x, t));
    return this.add32((a << s) | (a >>> (32 - s)), b);
  }

  ff(a, b, c, d, x, s, t) {
    return this.cmn((b & c) | (~b & d), a, b, x, s, t);
  }

  gg(a, b, c, d, x, s, t) {
    return this.cmn((b & d) | (c & ~d), a, b, x, s, t);
  }

  hh(a, b, c, d, x, s, t) {
    return this.cmn(b ^ c ^ d, a, b, x, s, t);
  }

  li(a, b, c, d, x, s, t) {
    return this.cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  md51(s) {
    const txt = '';
    const n = s.length,
      state = [1732584193, -271733879, -1732584194, 271733878];
    let i;
    for (i = 64; i <= s.length; i += 64) {
      this.md5cycle(state, this.md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    const tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < s.length; i++) {
      tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
    }
    tail[i >> 2] |= 0x80 << (i % 4 << 3);
    if (i > 55) {
      this.md5cycle(state, tail);
      for (i = 0; i < 16; i++) {
        tail[i] = 0;
      }
    }
    tail[14] = n * 8;
    this.md5cycle(state, tail);
    return state;
  }

  md5blk(s) {
    const md5blks = [];
    let i;
    for (i = 0; i < 64; i += 4) {
      md5blks[i >> 2] =
        s.charCodeAt(i) +
        (s.charCodeAt(i + 1) << 8) +
        (s.charCodeAt(i + 2) << 16) +
        (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }

  rhex(n) {
    let s = '',
      j = 0;
    for (; j < 4; j++) {
      s +=
        this.hex_chr[(n >> (j * 8 + 4)) & 0x0f] +
        this.hex_chr[(n >> (j * 8)) & 0x0f];
    }
    return s;
  }

  hex(x) {
    for (let i = 0; i < x.length; i++) {
      x[i] = this.rhex(x[i]);
    }
    return x.join('');
  }

  md5(s) {
    return this.hex(this.md51(s));
  }

  add32(a, b) {
    return (a + b) & 0xffffffff;
  }
}
