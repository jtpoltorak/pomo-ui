import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { TimerService } from '../services/timer.service';
import { TimerState } from '../models/timer.model';
import { SettingsService } from '../services/settings.service';
import { Settings } from '../models/settings.model';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  providers: [DatePipe],
})
export class TimerComponent implements OnInit {
  settings: Settings | undefined = undefined;
  readonly defaultSettings: Settings = {
    timeFormat: 'chars',
    showProgressBar: true,
    workDurationMS: 25 * 60 * 1000,
    shortBreakDurationMS: 5 * 60 * 1000,
    longBreakDurationMS: 15 * 60 * 1000,
  };
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
  fullScreen = false;
  docElement: any;
  showProgressBar = true;

  isSidebarVisible = false;
  currentSidebarComponent:
    | 'settings'
    | 'help'
    | 'about'
    | undefined = undefined;

  constructor(
    private settingsService: SettingsService,
    private timerService: TimerService,
    private titleService: Title,
    private datePipe: DatePipe,
    @Inject(DOCUMENT) private document: any,
  ) {
    this.settings = this.settingsService.getSettings();
    console.log(
      'in timer.component, just read settings = ',
      this.settings,
    );
    if (!this.settings) {
      this.settings = this.defaultSettings;
      this.settingsService.saveSettings(this.settings);
    }
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

  ngOnInit(): void {
    this.docElement = this.document.documentElement;
  }

  ngOnDestroy() {
    this.timeLeftSubscription.unsubscribe();
    this.timerStateSubscription.unsubscribe();
  }

  onWorkButtonClick(): void {
    this.selectedPhase = 'work';
    this.timeStart = this.settings?.workDurationMS
      ? this.settings.workDurationMS
      : 25 * 60 * 1000;
    this.timerService.setTimer(this.timeStart);
  }

  onShortBreakButtonClick(): void {
    this.selectedPhase = 'short break';
    this.timeStart = this.settings?.shortBreakDurationMS
      ? this.settings.shortBreakDurationMS
      : 5 * 60 * 1000;
    this.timerService.setTimer(this.timeStart);
  }

  onLongBreakButtonClick(): void {
    this.selectedPhase = 'long break';
    this.timeStart = this.settings?.longBreakDurationMS
      ? this.settings.longBreakDurationMS
      : 15 * 60 * 1000;
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

  onFullScreenToggleButtonClick(): void {
    this.fullScreen = !this.fullScreen;
    if (this.fullScreen) {
      if (this.docElement.requestFullscreen) {
        this.docElement.requestFullscreen();
      } else if (this.docElement.mozRequestFullScreen) {
        /* Firefox */
        this.docElement.mozRequestFullScreen();
      } else if (this.docElement.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.docElement.webkitRequestFullscreen();
      } else if (this.docElement.msRequestFullscreen) {
        /* IE/Edge */
        this.docElement.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  onSettingsButtonClick(): void {
    this.timerService.pauseTimer();
    this.isSidebarVisible = true;
    this.currentSidebarComponent = 'settings';
  }

  onHelpButtonClick(): void {
    this.timerService.pauseTimer();
    this.isSidebarVisible = true;
    this.currentSidebarComponent = 'help';
  }

  onAboutButtonClick(): void {
    this.timerService.pauseTimer();
    this.isSidebarVisible = true;
    this.currentSidebarComponent = 'about';
  }

  onSettingsRestore(): void {
    this.onSettingsSave(this.defaultSettings);
  }

  onSettingsCancel(): void {
    this.isSidebarVisible = false;
    this.timerService.startTimer();
  }

  onSettingsSave(newSettings: Settings): void {
    this.isSidebarVisible = false;
    this.settings = newSettings;
    this.timerFormat = this.settings.timeFormat;
    this.showProgressBar = this.settings.showProgressBar;
    switch (this.selectedPhase) {
      case 'work': {
        this.onWorkButtonClick();
        break;
      }
      case 'short break': {
        this.onShortBreakButtonClick();
        break;
      }
      case 'long break': {
        this.onLongBreakButtonClick();
        break;
      }
      default: {
        this.onWorkButtonClick();
      }
    }
    this.timerService.resetTimer();
    this.settingsService.saveSettings(newSettings);
  }
}
