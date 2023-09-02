import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly SETTINGS_KEY = 'settings';
  private readonly CRYPTO_KEY = '12345';

  constructor() {}

  // Save the settings object to local storage
  saveSettings(settings: Settings): void {
    localStorage.setItem(
      this.SETTINGS_KEY,
      this._encrypt(JSON.stringify(settings)),
    );
  }

  // Retrieve the settings object from local storage
  getSettings(): Settings | undefined {
    const settings = localStorage.getItem(
      this.SETTINGS_KEY,
    );
    return settings
      ? JSON.parse(this._decrypt(settings))
      : undefined;
  }

  // Private helper function for encrypting a string
  private _encrypt(stringToEncrypt: string): string {
    return CryptoJS.AES.encrypt(
      stringToEncrypt,
      this.CRYPTO_KEY,
    ).toString();
  }

  // Private helper function for dencrypting a string
  private _decrypt(stringToDecrypt: string) {
    return CryptoJS.AES.decrypt(
      stringToDecrypt,
      this.CRYPTO_KEY,
    ).toString(CryptoJS.enc.Utf8);
  }
}
