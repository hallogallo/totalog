import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  qsos: Array<any>;

  constructor(private storage: Storage, public alertControl: AlertController) {

    //const that = this;

    this.storage.get('qsos').then( (value) => {

      if ((value != null) && (value !== undefined)) {

        //that.qsos = value;
        this.qsos = value;

      } else {

        //that.qsos = [];
        this.qsos = [];
      }

    }).catch((error) => {
      console.log(error);
      this.qsos = [];
    });

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

  updateMyValue() {
    const now = new Date();
    const newQso = Object.assign({} , this.form); // copy content of object, don't link object itself!
    newQso.time = now.getHours().toString().padStart(2 , '0') + ':' + now.getMinutes().toString().padStart(2 , '0') ;
    this.qsos.unshift(newQso);
    this.storage.set('qsos', this.qsos);

  }

  deleteMyValue(index: number) {

    this.qsos.splice(index , 1);
    this.storage.set('qsos', this.qsos);

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
