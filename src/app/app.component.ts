import { Component, OnInit } from '@angular/core';

import { PWAService } from './services/pwa.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showInfoDialog = false;

  constructor(
    private pwaService: PWAService,
    private confirmationService: ConfirmationService,
  ) {
    this.pwaService.checkForUpdates();
  }

  ngOnInit(): void {}

  cancelPWAUpdate(): void {
    this.confirmationService.close();
  }

  doPWAUpdate(): void {
    this.pwaService.updateApp();
  }
}
