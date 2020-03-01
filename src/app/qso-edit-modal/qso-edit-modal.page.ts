import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular'; 
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { EditPopoverComponent } from '../edit-popover/edit-popover.component';

@Component({
  selector: 'app-qso-edit-modal',
  templateUrl: './qso-edit-modal.page.html',
  styleUrls: ['./qso-edit-modal.page.scss'],
})
export class QsoEditModalPage implements OnInit {

  qsoEditList: any;
  data: any;

  constructor(public modalCtrl: ModalController, navParams: NavParams, private alertControl: AlertController, public popoverController: PopoverController) { 
    this.qsoEditList = navParams.data.qsoList;
    this.data = navParams.data;
  }

  ngOnInit() {
  }

  dismiss() {  
      this.modalCtrl.dismiss(this.qsoEditList);  
   } 

  deleteQso(index: number) {
    this.qsoEditList.splice(index, 1);
  }

  async showEditDialog(qsoNumber: number) {
/*     const alert = await this.alertControl.create({
      header: 'Edit QSO',
      inputs: [
        {
          name: 'call',
          type: 'text',
          value: this.qsoEditList[qsoNumber].call,
          placeholder: 'Call'
        },
        {
          name: 'band',
          type: 'text',
          id: 'name2-id',
          value: this.qsoEditList[qsoNumber].band,
          placeholder: 'Band'
        },
        {
          name: 'rstGiven',
          type: 'text',
          value: this.qsoEditList[qsoNumber].rstGiven,
          placeholder: 'RST TX'
        },
        {
          name: 'rstReceived',
          type: 'text',
          value: this.qsoEditList[qsoNumber].rstReceived,
          placeholder: 'RST RX'
        },
        {
          name: 'exchangeGiven',
          type: 'text',
          value: this.qsoEditList[qsoNumber].exchangeGiven,
          placeholder: 'Ex TX'
        },
        {
          name: 'exchangeReceived',
          type: 'text',
          value: this.qsoEditList[qsoNumber].exchangeReceived,
          placeholder: 'Ex RX'
        }],

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'OK',
          handler: (alertData) => {
            this.qsoEditList[qsoNumber].call = alertData.call;
            this.qsoEditList[qsoNumber].band = alertData.band;
            this.qsoEditList[qsoNumber].rstGiven = alertData.rstGiven;
            this.qsoEditList[qsoNumber].rstReceived = alertData.rstReceived;
            this.qsoEditList[qsoNumber].exchangeGiven = alertData.exchangeGiven;
            this.qsoEditList[qsoNumber].exchangeReceived = alertData.exchangeReceived;
        }
        }
      ]
    });
    await alert.present(); */

    let editedQso = Object.assign({}, this.qsoEditList[qsoNumber]) ;

    const popover = await this.popoverController.create({
      component: EditPopoverComponent,
      componentProps: {editedQso},
      translucent: true
    });


    popover.onDidDismiss().then(data => {
      if(data.data) { // flag is set by save button on popover
        Object.assign(this.qsoEditList[qsoNumber], editedQso);
      }
    });
    
    return await popover.present();

  }

}
