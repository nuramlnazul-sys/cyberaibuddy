/**
 * Web Audio API synthesizer for smooth, relaxing Cyber Ambient Lo-Fi background music.
 * Completely client-side, 100% reliable, zero external MP3 dependencies.
 */

class CyberSynthEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private currentTrack: 'chill' | 'focus' | 'upbeat' = 'chill';
  private volume: number = 0.25;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getTrack(): 'chill' | 'focus' | 'upbeat' {
    return this.currentTrack;
  }

  public setTrack(track: 'chill' | 'focus' | 'upbeat') {
    this.currentTrack = track;
  }

  // Play a soft synth chord or note with envelope
  private playNote(freq: number, duration: number, type: OscillatorType = 'sine', decay: number = 1.2) {
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Low pass filter for soft warm cyber lofi tone
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      noteGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration * decay);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration * decay + 0.1);
    } catch (e) {
      console.error(e);
    }
  }

  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Chord progressions in Pentatonic Major & Lydian (Cyber Hopeful)
    // C Major 7th, A Minor 7th, F Major 7th, G Major
    const progressions = {
      chill: [
        [261.63, 329.63, 392.0, 493.88], // Cmaj7
        [220.0, 261.63, 329.63, 392.0],  // Am7
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [196.0, 246.94, 293.66, 392.0],  // G7
      ],
      focus: [
        [220.0, 329.63, 440.0],          // Deep A
        [174.61, 261.63, 349.23],        // Deep F
        [196.0, 293.66, 392.0],          // Deep G
        [164.81, 246.94, 329.63],        // Deep E
      ],
      upbeat: [
        [329.63, 392.0, 523.25],         // E-G-C
        [349.23, 440.0, 587.33],         // F-A-D
        [392.0, 493.88, 659.25],         // G-B-E
        [261.63, 329.63, 392.0],         // C-E-G
      ],
    };

    let step = 0;
    const intervalMs = 2800;

    const tick = () => {
      if (!this.isPlaying) return;

      const currentProg = progressions[this.currentTrack];
      const chord = currentProg[step % currentProg.length];

      // Play soft chord notes staggered slightly
      chord.forEach((freq, idx) => {
        setTimeout(() => {
          if (this.isPlaying) {
            this.playNote(freq, 2.5, 'sine', 1.4);
            // Add subtle higher chime on chill
            if (this.currentTrack === 'chill' && idx === chord.length - 1) {
              setTimeout(() => {
                if (this.isPlaying) this.playNote(freq * 1.5, 1.2, 'triangle', 0.8);
              }, 600);
            }
          }
        }, idx * 120);
      });

      step++;
      this.timer = window.setTimeout(tick, intervalMs);
    };

    tick();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const cyberMusic = new CyberSynthEngine();
