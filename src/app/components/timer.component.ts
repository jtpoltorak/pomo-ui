import { Component, Input, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { TimerService } from '../services/timer.service';
import { TimerState } from '../services/timer.model';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  timeLeft = 0;
  startPauseButtonText = 'Start';
  private timeLeftSubscription: Subscription;
  private timerStateSubscription: Subscription;

  constructor(public timerService: TimerService) {
    this.timerService.setTimer(25 * 60 * 1000);
    this.timeLeftSubscription =
      this.timerService.timeLeft$.subscribe(
        (timeLeft: number) => {
          this.timeLeft = timeLeft;
        },
      );
    this.timerStateSubscription =
      this.timerService.timerState$.subscribe(
        (timerState: TimerState) => {
          if (timerState === TimerState.Running) {
            this.startPauseButtonText = 'Pause';
          } else {
            this.startPauseButtonText = 'Start';
          }
        },
      );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.timeLeftSubscription.unsubscribe();
    this.timerStateSubscription.unsubscribe();
  }

  onWorkButtonClick(): void {
    this.timerService.setTimer(25 * 60 * 1000);
  }

  onShortBreakButtonClick(): void {
    this.timerService.setTimer(5 * 60 * 1000);
  }

  onLongBreakButtonClick(): void {
    this.timerService.setTimer(15 * 60 * 1000);
  }

  onStartPauseButtonClick(): void {
    if (this.startPauseButtonText === 'Start') {
      this.timerService.startTimer();
    } else {
      this.timerService.pauseTimer();
    }
  }

  onResetButtonClick(): void {
    this.timerService.resetTimer();
  }
}
