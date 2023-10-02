import { Injectable } from '@angular/core';

import { Howl } from 'howler';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  completeSound = new Howl({
    src: ['../../assets/sounds/beep-3s-countdown.mp3'],
    loop: false,
    volume: 1,
  });

  playCompleteSound(): void {
    this.completeSound.play();
  }
}
