import { async } from '@angular/core/testing';
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';


@Injectable()
export class GlobalSettings {

  darkmode: boolean;
  settingsStorage: Storage;
  ready: any

  constructor(private storage: Storage) {

    this.settingsStorage = storage;
    this.ready = this.initialize();

  }

  async initialize() {

    try {
      const result = await this.storage.get('darkmode');
      if ((result != null) && (result !== undefined)) {

        this.darkmode = result;

      } else {

        this.darkmode = false;
      }

    }
    catch (error) { 
      console.log(error);
    }

  }

  saveToStorage(key: string, value: any) {

    this.settingsStorage.set(key, value);

  }

}