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
    const tileIdentityOffset = Math.floor(row / 8) * 32 + Math.floor(column / 8);
    const tileIdentityAddress = this.controller.getBackgroundBaseAddress() + tileIdentityOffset;

    const tileNumber = this.mmu.read(tileIdentityAddress);
    const tileBaseAddress = this.calculateTileBaseAddress(tileNumber);

    const tileAddressOffset = (row % 8) * 2;
    const tileRowAddress = tileBaseAddress + tileAddressOffset;

    const internalColor = this.calculateInternalColor(tileRowAddress, row % 8);
    const displayColor = this.mapDisplayColor(internalColor);

    return displayColor;
  }

  calculateTileBaseAddress(tileNumber) {
    const tileBaseAddress = this.controller.getTilesBaseAddress();

    if (tileBaseAddress === 0x8800) {
      return tileBaseAddress + (tileNumber ^ 0x80) * 16;
    }

    return tileBaseAddress + tileNumber * 16;
  }

  calculateInternalColor(baseAddress, bit) {
    const byte1 = this.mmu.read(baseAddress);
    const byte2 = this.mmu.read(baseAddress + 1);

    const mask = 1 << (7 - bit);

    const bit1 = (byte1 & mask) >> (7 - bit);
    const bit2 = (byte2 & mask) >> (7 - bit);

    return (bit2 << 1) | bit1;
  }

  mapDisplayColor(color) {
    return color;

    const pallete = this.mmu.registers.read('bgp');
    const mask = 11 << (color * 2);

    return (pallete & mask) >> (color * 2);
  }
}
