export interface TimerStateModel {
  isRunning: boolean;
  phase: 'work' | 'shortBreak' | 'longBreak';
  timerValueMS: number; // in milliseconds
}
