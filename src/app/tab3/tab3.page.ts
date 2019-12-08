import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  darktoggle: any;
  darkmode: boolean;
  darkModeToggle: boolean;
  settingsStorage: Storage;

  constructor(private storage: Storage) {

    this.settingsStorage = storage;
    this.darkmode = false;
    let that = this;

    this.storage.get('darkmode').then(function (value) {

      if ((value != null) && (value != undefined)) {

        that.darkmode = value;

        if(value == true) {
          document.body.classList.add('dark');
          that.darkModeToggle = true;
        }

        console.log(value);

      } else {

        that.darkmode = false;
      }
      
    }).catch((error) => {
      console.log(error);
      that.darkmode = false;
    });

  }

  ngOnInit() {
  }

  toggleDarkMode() {

    this.darkmode = !this.darkmode;
    if(this.darkmode == true) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    console.log(this.darkmode);
    this.settingsStorage.set('darkmode' , this.darkmode);

  }

}
