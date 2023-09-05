import { Injectable, ApplicationRef } from '@angular/core';
import {
  SwUpdate,
  VersionReadyEvent,
} from '@angular/service-worker';

import { concat, interval, filter } from 'rxjs';
import { first } from 'rxjs/operators';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class PWAService {
  constructor(
    private swUpdate: SwUpdate,
    private applicationRef: ApplicationRef,
    private messageService: MessageService,
  ) {}

  checkForUpdates(): void {
    if (this.swUpdate.isEnabled) {
      // Allow the app to stabilize first, before starting
      // polling for updates with `interval()`.
      const appIsStable$ =
        this.applicationRef.isStable.pipe(
          first((isStable) => isStable === true),
        );
      const everySixHours$ = interval(6 * 60 * 60 * 1000);
      const everySixHoursOnceAppIsStable$ = concat(
        appIsStable$,
        everySixHours$,
      );
      everySixHoursOnceAppIsStable$.subscribe(async () => {
        try {
          const updateFound =
            await this.swUpdate.checkForUpdate();
          if (updateFound) {
            this.messageService.add({
              key: 'pwaToast',
              severity: 'info',
              // summary: 'Update Available',
              // detail: 'Message Content',
              sticky: true,
            });
          } else {
            console.log(
              'You are already on the latest version.',
            );
          }
        } catch (err) {
          console.error(
            'Failed to check for updates:',
            err,
          );
        }
      });
    }
  }

  doUpdate(): void {
    //   this.swUpdate.versionUpdates
    //       .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
    //       .subscribe(evt => {
    //         if (promptUser(evt)) {
    //           // Reload the page to update to the latest version.
    this.messageService.clear('pwaToast');
    document.location.reload();
    //   }
    // });
  }
}
