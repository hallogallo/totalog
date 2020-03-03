import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { EditPopoverComponent } from '../edit-popover/edit-popover.component';

@Component({
  selector: 'app-qso-edit-modal',
  templateUrl: './qso-edit-modal.page.html',
  styleUrls: ['./qso-edit-modal.page.scss'],
})

export class QsoEditModalPage {

  qsoEditList: any;
  data: any;

  constructor(public modalCtrl: ModalController, navParams: NavParams, public popoverController: PopoverController,
    private platform: Platform) {
    this.qsoEditList = navParams.data.qsoList;
    this.data = navParams.data;
    this.platform.backButton.subscribeWithPriority(100000000,
      () => {
        this.dismiss();
      });

  }

  dismiss() {
    this.modalCtrl.dismiss(this.qsoEditList);
  }

  deleteQso(index: number) {
    this.qsoEditList.splice(index, 1);
  }

  async showEditDialog(qsoNumber: number) {

    let editedQso = Object.assign({}, this.qsoEditList[qsoNumber]);

    const popover = await this.popoverController.create({
      component: EditPopoverComponent,
      componentProps: { editedQso },
      translucent: true
    });


    popover.onDidDismiss().then(data => {
      if (data.data) { // flag is set by save button on popover
        Object.assign(this.qsoEditList[qsoNumber], editedQso);
      }
    });

    return await popover.present();

  }

}