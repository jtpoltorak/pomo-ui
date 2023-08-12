import { Injectable } from '@angular/core';

import {
  Observable,
  timer,
  NEVER,
  BehaviorSubject,
  fromEvent,
  of,
} from 'rxjs';
import {
  map,
  tap,
  takeWhile,
  share,
  startWith,
  switchMap,
  filter,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor() {}
}
