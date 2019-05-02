export default class TestPpu {
  constructor(mmu) {
    this.mmu = mmu;
    this.controller = this.mmu.registers.get('lcdc');
  }

  draw() {
    const pixels = [];

    for (let row = 0; row < 128; row++) {
      pixels.push(this.renderRow(row));
    }

    return pixels;
  }

  renderRow(row) {
    const pixels = [];

    const baseAddress = 0x8000 + 16 * Math.floor(row / 8);
    const addressOffset = (row % 8) * 2;

    for (let tile = 0; tile < 16; tile++) {
      const tileBaseAddress = baseAddress + tile * 16 + addressOffset;
      const tilePixels = this.renderTileRow(tileBaseAddress);

      pixels.push(...tilePixels);
    }

    return pixels;
  }

  renderTileRow(baseAddress) {
    const pixels = [];

    const byte1 = this.mmu.read(baseAddress);
    const byte2 = this.mmu.read(baseAddress + 1);

    for (let i = 0; i < 8; i++) {
      // const mask = 1 << (7 - i);

      const bit1 = byte1 >> (7 - i);
      const bit2 = byte2 >> (7 - i);

      pixels.push((bit2 << 1) | bit1);
    }

    return pixels;
  }
}
