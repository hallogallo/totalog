import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  qsos: Array<any>;

  constructor(private storage: Storage) {

    let that = this;
    
    this.storage.get('qsos').then(function (value) {
      that.qsos = value;
    });

  }


  form = {
    band: '',
    time: '',
    call: '',
    rstGiven: '',
    rstReceived: '',
    exchangeGiven: '',
    exchangeReceived: ''
  }

  updateMyValue() {
    let now = new Date();
    let newQso = Object.assign({}, this.form); // copy content of object, don't link object itself!
    newQso.time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    this.qsos.unshift(newQso);
    this.storage.set('qsos', this.qsos)

  }

}