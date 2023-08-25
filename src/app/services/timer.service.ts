import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  Observable,
  Subscription,
  timer,
} from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

import { TimerState } from './timer.model';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private initialTime: number = 60 * 1000; // Let's assume 60 seconds for this example

  // timer
  private timeLeft = 60 * 1000;
  private timeLeftSubject = new BehaviorSubject<number>(
    this.timeLeft,
  );
  private timeLeftSubscription?: Subscription;
  timeLeft$: Observable<number> =
    this.timeLeftSubject.asObservable();

  // timer state
  private timerState = TimerState.Stopped;
  private timerStateSubject =
    new BehaviorSubject<TimerState>(TimerState.Stopped);
  timerState$: Observable<TimerState> =
    this.timerStateSubject.asObservable();

  setTimer(timeLeft: number): void {
    this.timeLeft = timeLeft;
    this.timeLeftSubject.next(this.timeLeft);
  }

  startTimer(): void {
    console.log('here');
    if (
      !this.timeLeftSubscription ||
      this.timeLeftSubscription.closed
    ) {
      this.timeLeftSubscription = timer(0, 1000)
        .pipe(
          tap(() => (this.timeLeft = this.timeLeft - 1000)),
          takeWhile(() => this.timeLeft >= 0),
        )
        .subscribe({
          next: () => {
            console.log('time left: ', this.timeLeft);
            this.timeLeftSubject.next(this.timeLeft);
          },
          complete: () => this.stopTimer(),
        });
    }
    this.timerStateSubject.next(TimerState.Running);
  }

  pauseTimer(): void {
    if (this.timeLeftSubscription) {
      this.timeLeftSubscription.unsubscribe();
    }
    this.timerStateSubject.next(TimerState.Paused);
  }

  stopTimer(): void {
    this.resetTimer();
    this.pauseTimer();
    this.timerStateSubject.next(TimerState.Stopped);
  }

  resetTimer(): void {
    this.timeLeft = this.initialTime;
    this.timeLeftSubject.next(this.timeLeft);
    this.pauseTimer();
  }
}
