import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QsoEditModalPage } from './qso-edit-modal.page';

const routes: Routes = [
  {
    path: '',
    component: QsoEditModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QsoEditModalPage]
})
export class QsoEditModalPageModule {}
