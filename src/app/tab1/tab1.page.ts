import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public alertControl: AlertController) {

  }

  form = {
    band: '',
    time: '',
    call: '',
    rstGiven: '59',
    rstReceived: '59',
    exchangeGiven: '',
    exchangeReceived: ''
  };

  qsos = [];

  updateMyValue() {
    const now = new Date();
    const newQso = Object.assign({} , this.form); // copy content of object, don't link object itself!
    newQso.time = now.getHours().toString().padStart(2 , '0') + ':' + now.getMinutes().toString().padStart(2 , '0') ;
    this.qsos.unshift(newQso);
  }

  async showEditDialog() {
    const alert = await this.alertControl.create({
      header: 'Edit QSO',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
    await alert.present();
  }

}
