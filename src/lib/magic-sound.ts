// Web Audio API Synthesizer for high quality magical portal sounds
class MagicSoundSystem {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Play ascending magical crystal chime arpeggio + cosmic whoosh
  playMagicalPortalSound() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Cosmic Deep Bass Whoosh / Warp Sweep
      const whooshOsc = ctx.createOscillator();
      const whooshGain = ctx.createGain();
      const whooshFilter = ctx.createBiquadFilter();

      whooshOsc.type = 'sine';
      whooshOsc.frequency.setValueAtTime(80, now);
      whooshOsc.frequency.exponentialRampToValueAtTime(320, now + 1.2);
      whooshOsc.frequency.exponentialRampToValueAtTime(60, now + 2.2);

      whooshFilter.type = 'lowpass';
      whooshFilter.frequency.setValueAtTime(300, now);
      whooshFilter.frequency.exponentialRampToValueAtTime(2000, now + 1.0);
      whooshFilter.frequency.exponentialRampToValueAtTime(400, now + 2.2);

      whooshGain.gain.setValueAtTime(0.01, now);
      whooshGain.gain.linearRampToValueAtTime(0.25, now + 0.6);
      whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      whooshOsc.connect(whooshFilter);
      whooshFilter.connect(whooshGain);
      whooshGain.connect(ctx.destination);

      whooshOsc.start(now);
      whooshOsc.stop(now + 2.3);

      // 2. Ascending Sparkly Celestial Chimes (Major pentatonic / Lydian scale for magical wonder)
      const notes = [
        523.25, // C5
        659.25, // E5
        783.99, // G5
        987.77, // B5
        1046.50, // C6
        1318.51, // E6
        1567.98, // G6
        2093.00, // C7
        2637.02  // E7
      ];

      notes.forEach((freq, i) => {
        const noteTime = now + (i * 0.11);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

        // Sparkly triangle + sine mixture
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);
        // Slight shimmer vibrato
        osc.frequency.linearRampToValueAtTime(freq * 1.015, noteTime + 0.35);

        // Envelopes
        gain.gain.setValueAtTime(0.0001, noteTime);
        gain.gain.linearRampToValueAtTime(0.18 - (i * 0.01), noteTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.8);

        if (pan) {
          pan.pan.setValueAtTime((i % 2 === 0 ? -0.4 : 0.4) * (i / notes.length), noteTime);
          osc.connect(gain);
          gain.connect(pan);
          pan.connect(ctx.destination);
        } else {
          osc.connect(gain);
          gain.connect(ctx.destination);
        }

        osc.start(noteTime);
        osc.stop(noteTime + 0.85);
      });

      // 3. Shimmering high frequency fairy dust burst
      for (let s = 0; s < 12; s++) {
        const dustTime = now + 0.5 + (s * 0.08);
        const dustFreq = 1800 + Math.random() * 2400;
        const dustOsc = ctx.createOscillator();
        const dustGain = ctx.createGain();

        dustOsc.type = 'sine';
        dustOsc.frequency.setValueAtTime(dustFreq, dustTime);
        dustOsc.frequency.exponentialRampToValueAtTime(dustFreq + 400, dustTime + 0.15);

        dustGain.gain.setValueAtTime(0.001, dustTime);
        dustGain.gain.linearRampToValueAtTime(0.07, dustTime + 0.02);
        dustGain.gain.exponentialRampToValueAtTime(0.0001, dustTime + 0.2);

        dustOsc.connect(dustGain);
        dustGain.connect(ctx.destination);

        dustOsc.start(dustTime);
        dustOsc.stop(dustTime + 0.22);
      }

      // 4. Celebratory Harmonic Chord at the climax
      const climaxTime = now + 1.1;
      const climaxChord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      climaxChord.forEach(f => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, climaxTime);

        gain.gain.setValueAtTime(0.001, climaxTime);
        gain.gain.linearRampToValueAtTime(0.12, climaxTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, climaxTime + 1.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(climaxTime);
        osc.stop(climaxTime + 1.45);
      });

    } catch (e) {
      console.warn("Audio synthesis note:", e);
    }
  }
}

export const magicSound = new MagicSoundSystem();
