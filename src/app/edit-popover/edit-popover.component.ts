import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular'; 
import { NgFormSelectorWarning } from '@angular/forms';

@Component({
  selector: 'app-edit-popover',
  templateUrl: './edit-popover.component.html',
  styleUrls: ['./edit-popover.component.scss'],
})
export class EditPopoverComponent implements OnInit {

  qsoParams: any;

  constructor( navParams: NavParams, private popoverController: PopoverController) { 
    this.qsoParams = navParams.data.editedQso;
  }

  ngOnInit() {}

  async dismissAndSave() {
    await this.popoverController.dismiss(true);
  }

}
