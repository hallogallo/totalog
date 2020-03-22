import { GlobalSettings } from './../globalsettings';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PopoverController } from '@ionic/angular';
import { EditPopoverComponent } from '../edit-popover/edit-popover.component';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  darkmode: boolean;
  settings: GlobalSettings;

  constructor(private storage: Storage, private globalSettings: GlobalSettings,
              private statusBar: StatusBar, public popoverController: PopoverController, public toastController: ToastController) {

    this.storage.get('qsos').then((value) => {

      if ((value != null) && (value !== undefined)) {

        this.settings.recentQsos = value;

      } else {

        this.settings.recentQsos = [];
      }

    }).catch((error) => {
      console.log(error);
      this.settings.recentQsos = [];
    });


    this.settings = globalSettings;
    this.settings.ready.then(() => {

      if (this.settings.darkmode === true) {
        document.body.classList.add('dark');
        this.statusBar.backgroundColorByHexString('#212121');
        this.statusBar.styleBlackOpaque();

      } else {
        this.statusBar.backgroundColorByName('white');
        this.statusBar.styleDefault();
      }

    });

  }


  form = {
    band: '',
    time: '',
    date: '',
    call: '',
    rstGiven: '59',
    rstReceived: '59',
    exchangeGiven: '',
    exchangeReceived: ''
  };

  logQso() {
    const now = new Date();
    const newQso = Object.assign({}, this.form); // copy content of object, don't link object itself!
    newQso.time = (now.getHours() - this.settings.opData.timeOffset.value).toString().padStart(2, '0')
    + ':' + now.getMinutes().toString().padStart(2, '0');
    newQso.date = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    this.settings.recentQsos.unshift(newQso);
    this.storage.set('qsos', this.settings.recentQsos);

    // clear inputs
    this.form.call = '';
    this.form.exchangeGiven = '';
    this.form.exchangeReceived = '';
    this.form.rstGiven = '59';
    this.form.rstReceived = '59';

  }

  async deleteQso(index: number) {

    const deletedQso = this.settings.recentQsos.splice(index, 1);
    this.storage.set('qsos', this.settings.recentQsos);

    const toast = await this.toastController.create({
      message: 'QSO deleted',
      buttons: [
        {
          side: 'end',
          icon: 'arrow-undo',
          text: 'Undo',
          handler: () => {
            this.settings.recentQsos.splice(index, 0, deletedQso[0]);
            this.storage.set('qsos', this.settings.recentQsos);
          }
        }
      ],
      duration: 2000
    });

    toast.present();


  }

  async showEditDialog(qsoNumber: number) {

    const editedQso = Object.assign({}, this.settings.recentQsos[qsoNumber]) ;

    const popover = await this.popoverController.create({
      component: EditPopoverComponent,
      componentProps: {editedQso},
      translucent: true
    });


    popover.onDidDismiss().then(data => {
      if (data.data) { // flag is set by save button on popover
        Object.assign(this.settings.recentQsos[qsoNumber], editedQso);
        this.storage.set('qsos', this.settings.recentQsos);
      }
    });

    return await popover.present();

  }

}
