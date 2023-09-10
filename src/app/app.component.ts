import { Component, OnInit } from '@angular/core';

import { PWAService } from './services/pwa.service';
import { ConfirmationService, MessageService } from 'primeng/api';

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

  // onPWAClick(): void {
  //   this.messageService.add({
  //     key: 'pwaToast',
  //     severity: 'info',
  //     sticky: true,
  //   });
  // }

  tempShowConfirm(): void {
    this.confirmationService.confirm({
      key: 'pwaUpdateConfirm',
      header: 'Heads Up!',
      icon: 'pi pi-info-circle',
      message: 'A new update is available.',
      accept: () => {
        console.log('accepted!');
      }
    });
  }

  doPWAUpdate(): void {
    this.pwaService.doUpdate();
  }

  // ngOnInit() {

  //--------------------
  // if (this.swUpdate.isEnabled) {
  //   this.swUpdate.versionUpdates
  //     .pipe(
  //       filter(
  //         (evt): evt is VersionReadyEvent =>
  //           evt.type === 'VERSION_READY',
  //       ),
  //     )
  //     .subscribe((evt) => {
  //       if (promptUser(evt)) {
  //         // Reload the page to update to the latest version.
  //         document.location.reload();
  //       }
  //     });
  //--------------------
  // this.swUpdate.available.subscribe(() => {
  //   if (
  //     confirm(
  //       "You're using an old version of the control panel. Want to update?",
  //     )
  //   ) {
  //     window.location.reload();
  //   }
  // });
  // }
}
