export default class Cartridge {
  static async fromUrl(url) {
    let response;

    try {
      response = await fetch(url);
    } catch (e) {
      throw new Error('Could not read cartridge');
    }

    const contents = await response.blob();
    return new Cartridge(contents);
  }

  constructor(file) {
    this.file = file;
  }

  async read() {
    return this.parseContents(this.file);
  }

  async parseContents(file) {
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = () => {
        const byteArray = this.getByteArray(reader.result);
        resolve(byteArray);
      };

      reader.readAsBinaryString(file);
    });
  }

  getByteArray(string) {
    const byteArray = [];

    for (let i = 0; i < string.length; i++) {
      byteArray.push(string.charCodeAt(i));
    }

    return byteArray;
  }
}
