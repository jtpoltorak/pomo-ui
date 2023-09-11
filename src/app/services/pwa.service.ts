import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class PWAService {
  constructor(
    private swUpdate: SwUpdate,
    private applicationRef: ApplicationRef,
    private confirmationService: ConfirmationService,
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
            this.confirmationService.confirm({
              key: 'pwaUpdateConfirm',
              header: 'heads up!',
              icon: 'pi pi-info-circle',
              message: 'a new update is available.',
            });
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

  updateApp(): void {
    this.confirmationService.close();
    document.location.reload();
  }
}
