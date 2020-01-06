import { GlobalSettings } from './../globalsettings';
import { Component } from '@angular/core';

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

  constructor(private globalSettings: GlobalSettings) {

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
    } else {
      document.body.classList.remove('dark');
    }

    console.log(this.settings.darkmode);
    this.settings.saveToStorage('darkmode' , this.settings.darkmode);

  }

}
