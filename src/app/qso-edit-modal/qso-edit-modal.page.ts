import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular'; 

@Component({
  selector: 'app-qso-edit-modal',
  templateUrl: './qso-edit-modal.page.html',
  styleUrls: ['./qso-edit-modal.page.scss'],
})
export class QsoEditModalPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {  
      this.modalCtrl.dismiss();  
   } 

}
