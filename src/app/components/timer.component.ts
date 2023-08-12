import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';

import {
  Observable,
  map,
  timer,
  take,
  merge,
  switchMap,
  mapTo,
  scan,
  startWith,
  takeUntil,
  repeat,
  takeWhile,
  interval,
  fromEvent,
  EMPTY,
  of,
} from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, AfterViewInit {
  @Input() startDurationInMs = 25 * 60;
  @ViewChild('startButton', { static: true }) startButton:
    | ElementRef
    | undefined;
  @ViewChild('pauseButton', { static: true }) pauseButton:
    | ElementRef
    | undefined;
  @ViewChild('resetButton', { static: true }) resetButton:
    | ElementRef
    | undefined;
  startClick$: Observable<any> | undefined;
  pauseClick$: Observable<any> | undefined;
  resetClick$: Observable<any> | undefined;

  // remainingInMs$: Observable<number> | undefined;
  remainingInMs = this.startDurationInMs;

  showCompleteMsg = false;

  constructor(
    timerService: TimerService,
    private cdref: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // this.remainingInMs$ = timer(0, 1000).pipe(
    //   map((n) => (this.durationInMs / 1000 - n) * 1000),
    //   takeWhile((n) => n >= 0),
    // // );
    // merge(
    //   this.startClick$!.pipe(map(() => true)),
    //   this.pauseClick$!.pipe(map(() => false)),
    // )
    //   .pipe(
    //     switchMap((shouldStart: boolean) =>
    //       shouldStart ? interval(1000) : EMPTY,
    //     ),
    //     map(() => -1),
    //     scan(
    //       (acc: number, curr: number) => acc + curr,
    //       this.startDurationInMs,
    //     ),
    //     takeWhile((val: number) => val >= 0),
    //     startWith(this.startDurationInMs),
    //     takeUntil(this.resetClick$),
    //     repeat(),
    //   )
    //   .subscribe((val: number) => {
    //     this.remainingInMs = val;
    //   });
  }

  ngAfterViewInit(): void {
    this.startClick$ = fromEvent(
      this.startButton?.nativeElement,
      'click',
    );
    this.pauseClick$ = fromEvent(
      this.pauseButton?.nativeElement,
      'click',
    );

    this.resetClick$ = fromEvent(
      this.resetButton?.nativeElement,
      'click',
    );
    merge(
      this.startClick$.pipe(map(() => true)),
      this.pauseClick$.pipe(map(() => false)),
    )
      .pipe(
        switchMap((shouldStart: boolean) =>
          shouldStart ? interval(1000) : EMPTY,
        ),
        map(() => -1),
        scan(
          (acc: number, curr: number) => acc + curr,
          this.startDurationInMs,
        ),
        takeWhile((val: number) => val >= 0),
        startWith(this.startDurationInMs),
        takeUntil(this.resetClick$),
        repeat(),
      )
      .subscribe((val: number) => {
        this.remainingInMs = val * 1000;
        if (this.remainingInMs === 0) {
          this.showCompleteMsg = true;
        }
        this.cdref.detectChanges();
        console.log('this.remainingInMs = ', this.remainingInMs);
      });
  }
}
