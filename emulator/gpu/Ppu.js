export default class Ppu {
  constructor(mmu) {
    this.mmu = mmu;
    this.controller = this.mmu.registers.get('lcdc');
  }

  draw() {
    const pixels = [];

    for (let row = 0; row < 144; row++) {
      pixels.push(...this.renderRow(row));
    }

    return pixels;
  }

  renderRow(row) {
    const pixels = [];

    const baseIdentityAddress = this.baseIdentityAddress + Math.floor(row / 8) * 32;
    const tileAddressOffset = (row % 8) * 2;

    for (let tile = 0; tile < 20; tile++) {
      const tileNumber = this.mmu.read(baseIdentityAddress + tile);
      const tileBaseAddress = this.baseTileAddress + 16 * tileNumber;

      const tileRowAddress = tileBaseAddress + tileAddressOffset;
      const tileRowPixels = this.renderTileRow(tileRowAddress);

      pixels.push(...tileRowPixels);
    }

    return pixels;
  }

  renderTileRow(baseAddress) {
    const pixels = [];

    const byte1 = this.mmu.read(baseAddress);
    const byte2 = this.mmu.read(baseAddress + 1);

    for (let i = 0; i < 8; i++) {
      const mask = 1 << (7 - i);

      const bit1 = (byte1 & mask) >> (7 - i);
      const bit2 = (byte2 & mask) >> (7 - i);

      pixels.push((bit2 << 1) | bit1);
    }

    return pixels;
  }

  get baseTileAddress() {
    return this.controller.getTilesBaseAddress();
  }

  get baseIdentityAddress() {
    return this.controller.getBackgroundBaseAddress();
  }
}
