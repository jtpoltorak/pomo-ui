import { State, Action, StateContext } from '@ngxs/store';
import { TimerStateModel } from './timer.model';
import {
  ToggleRunning,
  SetPhase,
  SetTimerValue,
  ResetTimer,
} from './timer.actions';

@State<TimerStateModel>({
  name: 'timer',
  defaults: {
    isRunning: false,
    phase: 'work',
    timerValueMS: 25 * 60 * 1000, // Default to 25 minutes in milliseconds for the 'work' phase.
  },
})
export class TimerState {
  @Action(ToggleRunning)
  toggleRunning(ctx: StateContext<TimerStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      isRunning: !state.isRunning,
    });
  }

  @Action(SetPhase)
  setPhase(
    ctx: StateContext<TimerStateModel>,
    action: SetPhase,
  ) {
    let timerValueMS;
    switch (action.phase) {
      case 'work':
        timerValueMS = 25 * 60 * 1000;
        break;
      case 'shortBreak':
        timerValueMS = 5 * 60 * 1000;
        break;
      case 'longBreak':
        timerValueMS = 15 * 60 * 1000;
        break;
    }
    ctx.patchState({
      phase: action.phase,
      timerValueMS: timerValueMS,
    });
  }

  @Action(SetTimerValue)
  setTimerValue(
    ctx: StateContext<TimerStateModel>,
    action: SetTimerValue,
  ) {
    ctx.patchState({
      timerValueMS: action.timerValueMS,
    });
  }

  @Action(ResetTimer)
  resetTimer(ctx: StateContext<TimerStateModel>) {
    const state = ctx.getState();
    let timerValueMS;
    switch (state.phase) {
      case 'work':
        timerValueMS = 25 * 60 * 1000;
        break;
      case 'shortBreak':
        timerValueMS = 5 * 60 * 1000;
        break;
      case 'longBreak':
        timerValueMS = 15 * 60 * 1000;
        break;
    }
    ctx.patchState({
      timerValueMS: timerValueMS,
    });
  }
}
