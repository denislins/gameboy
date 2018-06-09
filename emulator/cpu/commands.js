import SaveAddress from './operations/saveAddress.js';
import SaveRegister from './operations/saveRegister.js';
import CopyRegister from './operations/copyRegister.js';

class Commands {
  constructor() {
    this.commands = {};
    this.initCommands();
  }

  initCommands() {
    this.commands[0x3e] = new SaveRegister('a');
    this.commands[0x06] = new SaveRegister('b');
    this.commands[0x0e] = new SaveRegister('c');
    this.commands[0x16] = new SaveRegister('d');
    this.commands[0x1e] = new SaveRegister('e');
    this.commands[0x26] = new SaveRegister('h');
    this.commands[0x2e] = new SaveRegister('l');
    this.commands[0x36] = new SaveRegister('hl');

    this.commands[0x7f] = new CopyRegister('a', 'a');
    this.commands[0x78] = new CopyRegister('a', 'b');
    this.commands[0x79] = new CopyRegister('a', 'c');
    this.commands[0x7a] = new CopyRegister('a', 'd');
    this.commands[0x7b] = new CopyRegister('a', 'e');
    this.commands[0x7c] = new CopyRegister('a', 'h');
    this.commands[0x7d] = new CopyRegister('a', 'l');
    this.commands[0x0a] = new CopyRegister('a', 'bc');
    this.commands[0x1a] = new CopyRegister('a', 'de');
    this.commands[0x7e] = new CopyRegister('a', 'hl');

    this.commands[0x47] = new CopyRegister('b', 'a');
    this.commands[0x40] = new CopyRegister('b', 'b');
    this.commands[0x41] = new CopyRegister('b', 'c');
    this.commands[0x42] = new CopyRegister('b', 'd');
    this.commands[0x43] = new CopyRegister('b', 'e');
    this.commands[0x44] = new CopyRegister('b', 'h');
    this.commands[0x45] = new CopyRegister('b', 'l');
    this.commands[0x46] = new CopyRegister('b', 'hl');

    this.commands[0x4f] = new CopyRegister('c', 'a');
    this.commands[0x48] = new CopyRegister('c', 'b');
    this.commands[0x49] = new CopyRegister('c', 'c');
    this.commands[0x4a] = new CopyRegister('c', 'd');
    this.commands[0x4b] = new CopyRegister('c', 'e');
    this.commands[0x4c] = new CopyRegister('c', 'h');
    this.commands[0x4d] = new CopyRegister('c', 'l');
    this.commands[0x4e] = new CopyRegister('c', 'hl');

    this.commands[0x57] = new CopyRegister('d', 'a');
    this.commands[0x50] = new CopyRegister('d', 'b');
    this.commands[0x51] = new CopyRegister('d', 'c');
    this.commands[0x52] = new CopyRegister('d', 'd');
    this.commands[0x53] = new CopyRegister('d', 'e');
    this.commands[0x54] = new CopyRegister('d', 'h');
    this.commands[0x55] = new CopyRegister('d', 'l');
    this.commands[0x56] = new CopyRegister('d', 'hl');

    this.commands[0x5f] = new CopyRegister('e', 'a');
    this.commands[0x58] = new CopyRegister('e', 'b');
    this.commands[0x59] = new CopyRegister('e', 'c');
    this.commands[0x5a] = new CopyRegister('e', 'd');
    this.commands[0x5b] = new CopyRegister('e', 'e');
    this.commands[0x5c] = new CopyRegister('e', 'h');
    this.commands[0x5d] = new CopyRegister('e', 'l');
    this.commands[0x5e] = new CopyRegister('e', 'hl');

    this.commands[0x67] = new CopyRegister('h', 'a');
    this.commands[0x60] = new CopyRegister('h', 'b');
    this.commands[0x61] = new CopyRegister('h', 'c');
    this.commands[0x62] = new CopyRegister('h', 'd');
    this.commands[0x63] = new CopyRegister('h', 'e');
    this.commands[0x64] = new CopyRegister('h', 'h');
    this.commands[0x65] = new CopyRegister('h', 'l');
    this.commands[0x66] = new CopyRegister('h', 'hl');

    this.commands[0x6f] = new CopyRegister('l', 'a');
    this.commands[0x68] = new CopyRegister('l', 'b');
    this.commands[0x69] = new CopyRegister('l', 'c');
    this.commands[0x6a] = new CopyRegister('l', 'd');
    this.commands[0x6b] = new CopyRegister('l', 'e');
    this.commands[0x6c] = new CopyRegister('l', 'h');
    this.commands[0x6d] = new CopyRegister('l', 'l');
    this.commands[0x6e] = new CopyRegister('l', 'hl');

    this.commands[0x02] = new CopyRegister('bc', 'a');

    this.commands[0x12] = new CopyRegister('de', 'a');

    this.commands[0x77] = new CopyRegister('hl', 'a');
    this.commands[0x70] = new CopyRegister('hl', 'b');
    this.commands[0x71] = new CopyRegister('hl', 'c');
    this.commands[0x72] = new CopyRegister('hl', 'd');
    this.commands[0x73] = new CopyRegister('hl', 'e');
    this.commands[0x74] = new CopyRegister('hl', 'h');
    this.commands[0x75] = new CopyRegister('hl', 'l');

    this.commands[0xfa] = new LoadWord('a');

    this.commands[0xea] = new SaveAddress('a');

    this.commands[0xf2] = new CopyRegister('a', 'c');
    this.commands[0xe2] = new CopyRegister('c', 'a');
  }
}

export default new Commands();
