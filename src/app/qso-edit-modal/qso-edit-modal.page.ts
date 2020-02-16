import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular'; 

@Component({
  selector: 'app-qso-edit-modal',
  templateUrl: './qso-edit-modal.page.html',
  styleUrls: ['./qso-edit-modal.page.scss'],
})
export class QsoEditModalPage implements OnInit {

  qsoEditList: any;
  data: any;

  constructor(public modalCtrl: ModalController, navParams: NavParams) { 
    this.qsoEditList = navParams.data.qsoList;
    this.data = navParams.data;
    console.log(navParams);
  }

  ngOnInit() {
  }

  dismiss() {  
      this.modalCtrl.dismiss(this.qsoEditList);  
   } 

  deleteQso(index: number) {
    this.qsoEditList.splice(index, 1);
  }

}
