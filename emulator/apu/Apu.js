import Phaser from '../common/Phaser.js';
import Frame from './Frame.js';
import FrameSequencer from './FrameSequencer.js';
import Player from './Player.js';
import SweepSquareChannel from './channels/SweepSquareChannel.js';
import BasicSquareChannel from './channels/BasicSquareChannel.js';

export default class Apu {
  constructor(mmu) {
    this.mmu = mmu;
    this.currentFrame = undefined;
    this.player = new Player();

    this.initChannels();
    this.initPhaser();
    this.initFrameSequencer();
  }

  reset() {
    this.currentFrame = new Frame();
    this.player.reset();
    this.channels.forEach(channel => channel.reset());
  }

  tick() {
    this.frameSequencer.tick();
    this.phaser.tick();
    this.channels.forEach(channel => channel.tick());
  }

  getEnqueuedSampleCount() {
    return this.player.enqueuedFrames;
  }

  // private

  initChannels() {
    this.channels = [
      new SweepSquareChannel(this.mmu),
      new BasicSquareChannel(this.mmu),
    ];
  }

  initPhaser() {
    this.phaser = new Phaser(95);
    this.phaser.whenFinished(() => this.generateSamples());
  }

  initFrameSequencer() {
    this.frameSequencer = new FrameSequencer();

    this.frameSequencer.onLengthCounter(() => {
      this.channels.forEach(channel => channel.execLengthCounter());
    });

    this.frameSequencer.onFrequencySweep(() => {
      this.channels.forEach(channel => channel.execFrequencySweep());
    });

    this.frameSequencer.onVolumeEnvelope(() => {
      this.channels.forEach(channel => channel.execVolumeEnvelope());
    });
  }

  generateSamples() {
    const samples = this.channels.map(channel => channel.generateSample());

    this.currentFrame.push(samples);

    if (this.currentFrame.getSampleCount() === 400) {
      this.enqueueFrame();
    }
  }

  enqueueFrame() {
    this.player.enqueue(this.currentFrame);
    this.currentFrame = new Frame();
  }
}
