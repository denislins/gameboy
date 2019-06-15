export default class Ppu {
  constructor(mmu) {
    this.mmu = mmu;
    this.controller = this.mmu.registers.get('lcdc');
  }

  draw() {
    const pixels = [];

    for (let row = 0; row < 144; row++) {
      const actualRow = this.mmu.registers.read('scy') + row;

      for (let column = 0; column < 160; column++) {
        const actualColumn = this.mmu.registers.read('scx') + column;
        const pixel = this.renderPixel(actualRow, actualColumn);

        pixels.push(pixel);
      }
    }

    return pixels;
  }

  renderPixel(row, column) {
    const tileNumber = this.calculateTileNumber(row, column);
    const tileBaseAddress = this.calculateTileBaseAddress(tileNumber);

    const tileAddressOffset = (row % 8) * 2;
    const tileRowAddress = tileBaseAddress + tileAddressOffset;

    const internalColor = this.calculateInternalColor(tileRowAddress, column % 8);
    const displayColor = this.mapDisplayColor(internalColor);

    return displayColor;
  }

  calculateTileNumber(row, column) {
    const tileIdentityOffset = Math.floor(row / 8) * 32 + Math.floor(column / 8);
    const tileIdentityAddress = this.controller.getBackgroundBaseAddress() + tileIdentityOffset;

    return this.mmu.read(tileIdentityAddress);
  }

  calculateTileBaseAddress(tileNumber) {
    const tileBaseAddress = this.controller.getTilesBaseAddress();

    if (tileBaseAddress === 0x8800) {
      return tileBaseAddress + (tileNumber ^ 0x80) * 16;
    }

    return tileBaseAddress + tileNumber * 16;
  }

  calculateInternalColor(baseAddress, pixel) {
    const byte1 = this.mmu.read(baseAddress);
    const byte2 = this.mmu.read(baseAddress + 1);

    const mask = 1 << (7 - pixel);

    const bit1 = (byte1 & mask) >> (7 - pixel);
    const bit2 = (byte2 & mask) >> (7 - pixel);

    return (bit2 << 1) | bit1;
  }

  mapDisplayColor(color) {
    const pallete = this.mmu.registers.read('bgp');

    const shift = color * 2;
    const mask = 0b11 << shift;

    return (pallete & mask) >> shift;
  }
}
