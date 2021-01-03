import AbstractChannelRegisters from './AbstractChannelRegisters.js';

export default class BasicSquareChannelRegisters extends AbstractChannelRegisters {
  isChannelEnabled() {
    // https://gist.github.com/drhelius/3652407#file-game-boy-sound-operation-L342
    return super.isChannelEnabled() && this.read(2) & 0xF8;
  }

  getVolume() {
    return this.read(2) >> 4;
  }

  getActiveDutyCycle() {
    return this.read(1) >> 6;
  }

  getEnvelopePeriod() {
    return this.read(2) & 7;
  }

  isEnvelopeAddModeEnabled() {
    return this.read(2) & 8;
  }

  // private

  getBaseAddress() {
    return 0xFF15;
  }
}
