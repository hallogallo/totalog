import { GlobalSettings } from './../globalsettings';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  qsos: Array<any>;
  darkmode: boolean;
  settings: GlobalSettings;

  constructor(private storage: Storage, private alertControl: AlertController, private globalSettings: GlobalSettings, private statusBar: StatusBar) {

    this.storage.get('qsos').then((value) => {

      if ((value != null) && (value !== undefined)) {

        this.qsos = value;

      } else {

        this.qsos = [];
      }

    }).catch((error) => {
      console.log(error);
      this.qsos = [];
    });


    this.settings = globalSettings;
    this.settings.ready.then(() => {

      if (this.settings.darkmode === true) {
        document.body.classList.add('dark');
        this.statusBar.backgroundColorByName("black");
        this.statusBar.styleBlackOpaque();
        
      } else {
        this.statusBar.backgroundColorByName("white");
        this.statusBar.styleDefault();
      }

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

  logQso() {
    const now = new Date();
    const newQso = Object.assign({}, this.form); // copy content of object, don't link object itself!
    newQso.time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    this.qsos.unshift(newQso);
    this.storage.set('qsos', this.qsos);

    // clear inputs
    this.form.call = '';
    this.form.exchangeGiven = '';
    this.form.exchangeReceived = '';
    this.form.rstGiven = '59';
    this.form.rstReceived = '59';

  }

  deleteQso(index: number) {

    this.qsos.splice(index, 1);
    this.storage.set('qsos', this.qsos);

  }

  async showEditDialog(qsoNumber: number) {
    const alert = await this.alertControl.create({
      header: 'Edit QSO',
      inputs: [
        {
          name: 'call',
          type: 'text',
          value: this.qsos[qsoNumber].call,
          placeholder: 'Call'
        },
        {
          name: 'band',
          type: 'text',
          id: 'name2-id',
          value: this.qsos[qsoNumber].band,
          placeholder: 'Band'
        },
        {
          name: 'rstGiven',
          type: 'text',
          value: this.qsos[qsoNumber].rstGiven,
          placeholder: 'RST TX'
        },
        {
          name: 'rstReceived',
          type: 'text',
          value: this.qsos[qsoNumber].rstReceived,
          placeholder: 'RST RX'
        },
        {
          name: 'exchangeGiven',
          type: 'text',
          value: this.qsos[qsoNumber].exchangeGiven,
          placeholder: 'Ex TX'
        },
        {
          name: 'exchangeReceived',
          type: 'text',
          value: this.qsos[qsoNumber].exchangeReceived,
          placeholder: 'Ex RX'
        }],

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'OK',
          handler: (alertData) => {
            this.qsos[qsoNumber].call = alertData.call;
            this.qsos[qsoNumber].band = alertData.band;
            this.qsos[qsoNumber].rstGiven = alertData.rstGiven;
            this.qsos[qsoNumber].rstReceived = alertData.rstReceived;
            this.qsos[qsoNumber].exchangeGiven = alertData.exchangeGiven;
            this.qsos[qsoNumber].exchangeReceived = alertData.exchangeReceived;
            this.storage.set('qsos', this.qsos);
        }
        }
      ]
    });
    await alert.present();
  }

}
