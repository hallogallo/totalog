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
    rstGiven: '',
    rstReceived: '',
    exchangeGiven: '',
    exchangeReceived: ''
  }

  listItems = [
    "1. Aylin Roberts",
    "2. Autumn Kuhic",
    "3. Tiffany Windler",
    "4. Sheila Bauch",
    "5. Diana Gerhold",
    "6. Arielle Kuhn"
  ];

/*   qsos = [
    {
      time: "12:23",
      call: "DM7MD",
      rstGiven: "59",
      rstReceived: "59",
      band: "2m"
    },
    {
      time: "12:28",
      call: "DF4NEN",
      rstGiven: "59",
      rstReceived: "59",
      band: "2m"
    },
  ]; */

  qsos = [];


  

  updateMyValue() {
    var now = new Date();
    var newQso = Object.assign({} , this.form); // copy content of object, don't link object itself!
    newQso.time = now.getHours() + ':' + now.getMinutes();
    console.log(this.form.call);
    this.qsos.unshift(newQso);
    //console.log(this.qsos);
  }

}
