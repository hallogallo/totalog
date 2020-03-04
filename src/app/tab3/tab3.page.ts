import { GlobalSettings } from './../globalsettings';
import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PickerController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {

  darktoggle: any;
  darkModeToggle: boolean;
  settingsStorage: Storage;
  settings: GlobalSettings;

  constructor(private globalSettings: GlobalSettings, private statusBar: StatusBar, private pickerControl: PickerController) {

    this.settings = globalSettings;

    if (this.settings.darkmode === true) {
      document.body.classList.add('dark');
      this.darkModeToggle = true;
    }


  }

  toggleDarkMode() {

    this.settings.darkmode = !this.settings.darkmode;
    if (this.settings.darkmode === true) {
      document.body.classList.add('dark');
      this.statusBar.backgroundColorByName("black");
      this.statusBar.styleBlackOpaque();

    } else {
      document.body.classList.remove('dark');
      this.statusBar.backgroundColorByName("white");
      this.statusBar.styleDefault();
    }

    this.settings.saveToStorage('darkmode' , this.settings.darkmode);

  }

  async showTimeOffsetPicker() {

    let columns = [
      {
        name: "time offset",
        options: [
          { text: 'UTC', value: 'UTC' },
          { text: 'UTC+1', value: 'UTC+1' }
        ]
      }
    ];

    let buttons = [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Confirm',
        handler: (value) => {
          console.log(`Got Value ${value}`);
        }
      }
    ];

    const timeOffsetPicker = await this.pickerControl.create({
      columns: [
        {
          name: "time offset",
          options: this.generateTimeOffsetValues()
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log(value);
          }
        }
      ]

    });

    await timeOffsetPicker.present();

    this.generateTimeOffsetValues();

  }

  generateTimeOffsetValues() {
    let options = [];
    for(let i=-12; i<13; i++) {

      if(i<0) {
        options.push({text: `UTC${i}`, value:`${i}`});
      }

      if(i==0) {
        options.push({text: 'UTC', value:`${i}`});
      }

      if(i>0) {
        options.push({text: `UTC+${i}`, value:`${i}`});
      }

    }

    return options;

  }

}
