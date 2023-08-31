import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { TimerService } from '../services/timer.service';
import { TimerState } from '../models/timer.model';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  providers: [DatePipe],
})
export class TimerComponent implements OnInit {
  timeStart = 25 * 60 * 1000;
  timeLeft = this.timeStart;
  timerState = TimerState.Stopped;
  selectedPhase: 'work' | 'short break' | 'long break' =
    'work';
  startPauseButtonText: 'start' | 'pause' = 'start';
  timerStates = TimerState;

  private timeLeftSubscription: Subscription;
  private timerStateSubscription: Subscription;

  timerFormat: 'colon' | 'chars' = 'chars';

  showSidebarHelp = false;
  showSidebarAbout = false;

  constructor(
    private timerService: TimerService,
    private titleService: Title,
    private datePipe: DatePipe,
  ) {
    this.timerService.setTimer(this.timeLeft);
    this.timeLeftSubscription =
      this.timerService.timeLeft$.subscribe(
        (timeLeft: number) => {
          this.timeLeft = timeLeft;
          this.titleService.setTitle(
            this.datePipe.transform(timeLeft, 'mm:ss') +
              ' / ' +
              this.selectedPhase +
              ' / pomo',
          );
        },
      );
    this.timerStateSubscription =
      this.timerService.timerState$.subscribe(
        (timerState: TimerState) => {
          this.timerState = timerState;
          if (timerState === TimerState.Running) {
            this.startPauseButtonText = 'pause';
          } else {
            this.startPauseButtonText = 'start';
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
    this.selectedPhase = 'work';
    this.timeStart = 25 * 60 * 1000;
    this.timerService.setTimer(this.timeStart);
  }

  onShortBreakButtonClick(): void {
    this.selectedPhase = 'short break';
    this.timeStart = 5 * 60 * 1000;
    this.timerService.setTimer(this.timeStart);
  }

  onLongBreakButtonClick(): void {
    this.selectedPhase = 'long break';
    this.timeStart = 15 * 60 * 1000;
    this.timerService.setTimer(this.timeStart);
  }

  onStartPauseButtonClick(): void {
    if (this.startPauseButtonText === 'start') {
      this.timerService.startTimer();
    } else {
      this.timerService.pauseTimer();
    }
  }

  onResetButtonClick(): void {
    this.timerService.resetTimer();
  }

  onMuteButtonClick(): void {}

  onAutoplayButtonClick(): void {}

  onSettingsButtonClick(): void {}

  onHelpButtonClick(): void {
    this.showSidebarHelp = true;
  }

  onAboutButtonClick(): void {
    this.showSidebarAbout = true;
  }
}
