export class SetPhase {
  static readonly type = '[Timer] Set Phase';
  constructor(
    public phase: 'work' | 'shortBreak' | 'longBreak',
  ) {}
}
export class ToggleRunning {
  static readonly type = '[Timer] Toggle Running';
}

export class SetTimerValue {
  static readonly type = '[Timer] Set Timer Value';
  constructor(public timerValueMS: number) {}
}

export class ResetTimer {
  static readonly type = '[Timer] Reset Timer';
}
