import FakeFileReader from 'specs/support/FakeFileReader';
import Cartridge from 'emulator/cartridge/Cartridge';

describe('Cartridge', () => {
  beforeEach(() => {
    // TODO: mock the request instead of the implementation
    global.fetch = jasmine.createSpy();
    global.FileReader = FakeFileReader;

    this.cartridge = new Cartridge('fakepath.gb');
  });

  afterEach(() => {
    global.fetch = undefined;
    global.FileReader = undefined;
  });

  describe('read()', () => {
    describe('when the file exists', () => {
      beforeEach(async () => {
        const blob = () => 'rom';
        const promise = Promise.resolve({ blob });

        global.fetch.and.returnValue(promise);

        this.response = await this.cartridge.read();
      });

      it('returns the file contents as an array of bytes', () => {
        const bytes = [98, 105, 110, 114, 111, 109];
        expect(this.response).toEqual(bytes);
      });
    });

    describe('when the file is not found', () => {
      beforeEach(() => {
        const promise = Promise.reject();
        global.fetch.and.returnValue(promise);
      });

      it('raises an exception', async () => {
        let errorMessage = 'No error thrown';

        try {
          await this.cartridge.read();
        } catch (e) {
          errorMessage = e.message;
        }

        expect(errorMessage).toEqual('Could not read cartridge');
      });
    });
  });
});
