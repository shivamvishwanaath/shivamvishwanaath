'use client';

class DetectiveAudioEngine {
  public isMuted: boolean = true;

  public toggleMute(): boolean {
    return true;
  }

  public getMuted(): boolean {
    return true;
  }

  public playPinThud() {}
  public playStringPluck() {}
  public playPaperRustle() {}
  public playTapeSnap() {}
  public playTypewriter() {}
  public playCaseSolved() {}
}

export const soundEffects = new DetectiveAudioEngine();

