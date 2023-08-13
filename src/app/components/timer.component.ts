import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() startingDurationInMs = 25 * 60 * 1000;
  remainingDurationInMs = 0;
  intervalID: any;
  showCompleteMsg = false;

  ngOnInit(): void {
    this.remainingDurationInMs = this.startingDurationInMs;
    console.log(
      'this.startingDurationInMs = ',
      this.startingDurationInMs,
    );
  }

  onStartButtonClick(): void {
    console.log(
      'this.remainingDurationInMs = ',
      this.remainingDurationInMs,
    );
    this._startCountdown();
  }

  onPauseButtonClick(): void {
    this._pauseCountdown();
  }

  onRestartButtonClick(): void {
    this._restartCountdown();
  }

  private _startCountdown(): void {
    clearInterval(this.intervalID);
    this.intervalID = setInterval(() => {
      this.remainingDurationInMs -= 1000;
      if (this.remainingDurationInMs <= 0) {
        // this.remainingDurationInMs = this.startingDurationInMs;
        clearInterval(this.intervalID);
        this.showCompleteMsg = true;
      }
    }, 1000);
    console.log('this.intervalID = ', this.intervalID);
  }

  private _pauseCountdown(): void {
    clearInterval(this.intervalID);
  }

  private _restartCountdown(): void {
    this.remainingDurationInMs = this.startingDurationInMs;
    this._startCountdown();
  }
}
