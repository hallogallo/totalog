import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  form = {
    band: '',
    time: '',
    call: '',
    rstGiven: '59',
    rstReceived: '59',
    exchangeGiven: '',
    exchangeReceived: ''
  }

  qsos = [];

  updateMyValue() {
    var now = new Date();
    var newQso = Object.assign({} , this.form); // copy content of object, don't link object itself!
    newQso.time = now.getHours().toString().padStart(2 , '0') + ':' + now.getMinutes().toString().padStart(2 , '0') ;
    this.qsos.unshift(newQso);
  }

}
