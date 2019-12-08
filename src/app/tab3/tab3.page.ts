import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  darktoggle: any;
  darkmode: boolean;

  constructor() {

    //this.darktoggle = document.querySelector('#themeToggle');
    //document.body.classList.add('dark');
    this.darkmode = false;

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

  }

}
