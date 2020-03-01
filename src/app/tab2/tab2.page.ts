import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { ModalController} from '@ionic/angular';
import { QsoEditModalPage } from './../qso-edit-modal/qso-edit-modal.page';
import { IonRouterOutlet } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ThrowStmt } from '@angular/compiler';




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  qsoStorage: Storage;
  qsoHistory: Array<any>;

  constructor(private storage: Storage, private alertControl: AlertController, public modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet, private clipboard: Clipboard, public toastController: ToastController,
    private socialSharing: SocialSharing) {

    this.qsoStorage = storage;

    this.storage.get('qsoHistory').then((value) => {

      if ((value != null) && (value !== undefined)) {

        this.qsoHistory = value;

      } else {

        this.qsoHistory = [];
      }

    }).catch((error) => {
      console.log(error);
      this.qsoHistory = [];
    });

  }

  template = {
    name:'',
    timeSaved: '',
    qsoList: [],
    operator: '',
  };

  async saveQsoDialog() {
    const alert = await this.alertControl.create({
      header: 'Save QSOs',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'name'
        },],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Save & keep recent QSOs',
            handler: (alertData) => {
              this.saveQsos(false, alertData.name);
            }
          },
          {
            text: 'Save & delete recent QSOs',
            handler: (alertData) => {
              this.saveQsos(true, alertData.name);
            }
          }
        ]});

        await alert.present();
  }

  async saveQsos(deleteRecentQsos: boolean, name: string) {

    try {
      const recentQsos = await this.storage.get('qsos');

      if ((recentQsos == null) || (recentQsos == undefined)) {
        return;
      }

      const newEntry = Object.assign({}, this.template);

      newEntry.qsoList = recentQsos;
      newEntry.name = name;
      const now = new Date();
      newEntry.timeSaved = now.getFullYear().toString() + '-' + (now.getMonth()+1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0');

      this.qsoHistory.unshift(newEntry);
      this.qsoStorage.set('qsoHistory', this.qsoHistory);

    }
    catch (error) { 
      console.log(error);
    }

  }

  async deleteQsos(index: number) {

    const alert = await this.alertControl.create({
      header: 'Delete QSO',
      message: 'Are you sure?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'OK',
            handler: async () => {
              try {
                this.qsoHistory.splice(index, 1);
                await this.storage.set('qsoHistory', this.qsoHistory);
              }
              catch(error) {
                console.log(error);
              }
            }
          }
        ]});

        await alert.present();

  }

  async showQsoEditModal(index: number) {
    
    const modal = await this.modalCtrl.create({  
      component: QsoEditModalPage,
      componentProps: this.qsoHistory[index],
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });  

    let temp = await modal.present(); 
    const { data } = await modal.onWillDismiss();
    this.qsoHistory[index].qsoList = data;
    await this.storage.set('qsoHistory', this.qsoHistory);
    return temp;

  }

  async exportQsos(index: number) {
    const alert = await this.alertControl.create({
      header: 'Export QSOs',
        buttons: [
          {
            text: 'Copy to clipboard',
            handler: (alertData) => {
              this.copyToClipboard();
            }
          },
          {
            text: 'Share',
            handler: (alertData) => {
              this.socialShare();
            }
          },
          {
            text: 'Save file',
            handler: (alertData) => {

            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
          }
        ]});

        await alert.present();
  }

  async copyToClipboard() {
    this.clipboard.copy('Hello world');
    const toast = await this.toastController.create({
      message: 'Your log has been copied!',
      duration: 2000
    });
    toast.present();
  }

  async socialShare() {
    let options = {
      message: 'share this', 
      url: 'https://www.website.com/foo/#bar?a=b',
    };

    this.socialSharing.shareWithOptions(options);
  }

}
