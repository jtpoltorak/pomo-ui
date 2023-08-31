import { Injectable } from '@angular/core';

import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly SETTINGS_KEY = 'settings';

  constructor() {}

  // Save the settings object to local storage
  saveSettings(settings: Settings): void {
    sessionStorage.setItem(
      this.SETTINGS_KEY,
      JSON.stringify(settings),
    );
  }

  // Retrieve the settings object from local storage
  getSettings(): Settings | undefined {
    const settings = sessionStorage.getItem(
      this.SETTINGS_KEY,
    );
    return settings ? JSON.parse(settings) : undefined;
  }
}
