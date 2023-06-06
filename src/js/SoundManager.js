import * as ex from 'excalibur';
import { Resources } from './resources';

export class SoundManager {
  shootSound;
  backgroundMusic;

  onInitialize(engine) {
    this.shootSound = new ex.Sound(Resources.shootsound);
    this.backgroundMusic = new ex.Sound(Resources.backgroundM);
  }

  playBGM() {
    this.backgroundMusic.play();
    this.backgroundMusic.loop = true;
  }

  playShootSound() {
    this.shootSound.play();
  }
}
