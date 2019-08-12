import Player from './Player.js';
import SquareChannel from './channels/SquareChannel.js';

export default class Apu {
  constructor(mmu) {
    this.mmu = mmu;
    this.counter = 0;
    this.player = new Player();

    this.channels = [
      new SquareChannel(this.mmu),
    ];
  }

  tick(cpuCycles) {
    this.counter += cpuCycles;

    if (this.counter >= 95) {
      this.counter = this.counter % 95;
      this.generateSamples();
    }
  }

  // private

  generateSamples() {
    const samples = this.channels.map((channel) => {
      return channel.generateSample();
    });

    this.player.addSamples(samples);
  }

  play() {
    this.player.play();
  }
}
