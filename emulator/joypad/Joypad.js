export default class Joypad {
  constructor(mmu) {
    this.mmu = mmu;
    this.register = mmu.registers.get('joypad');
    this.columns = [0xF, 0xF];
  }

  install() {
    this.initKeystrokes();
    this.initEventListeners();
    this.updateRegisterColumns();
  }

  initKeystrokes() {
    this.keystrokes = {
      65: { column: 0, mask: 1 },
      83: { column: 0, mask: 2 },
      32: { column: 0, mask: 4 },
      13: { column: 0, mask: 8 },
      39: { column: 1, mask: 1 },
      37: { column: 1, mask: 2 },
      38: { column: 1, mask: 4 },
      40: { column: 1, mask: 8 },
    };
  }

  initEventListeners() {
    document.addEventListener('keydown', (event) => {
      this.pressButton(event.keyCode);
    });

    document.addEventListener('keyup', (event) => {
      this.releaseButton(event.keyCode);
    });
  }

  pressButton(keyCode) {
    const keystroke = this.keystrokes[keyCode];

    if (keystroke) {
      this.columns[keystroke.column] &= ~keystroke.mask;
      this.updateRegisterColumns();
    }
  }

  releaseButton(keyCode) {
    const keystroke = this.keystrokes[keyCode];

    if (keystroke) {
      this.columns[keystroke.column] |= keystroke.mask;
      this.updateRegisterColumns();
    }
  }

  updateRegisterColumns() {
    this.register.updateColumns(this.columns);
  }
}
