import FakeFileReader from '/specs/support/FakeFileReader.js';
import Cartridge from '/emulator/cartridge/Cartridge.js';

describe('Cartridge', function() {
  beforeEach(function() {
    // TODO: mock the request instead of the implementation
    window.fetch = jasmine.createSpy();
    window.FileReader = FakeFileReader;

    this.cartridge = new Cartridge('fakepath.gb');
  });

  afterEach(function() {
    window.fetch = undefined;
    window.FileReader = undefined;
  });

  describe('read()', function() {
    describe('when the file exists', function() {
      beforeEach(async function() {
        const blob = () => 'rom';
        const promise = Promise.resolve({ blob });

        window.fetch.and.returnValue(promise);

        this.response = await this.cartridge.read();
      });

      it('returns the file contents as an array of bytes', function() {
        const bytes = [98, 105, 110, 114, 111, 109];
        expect(this.response).toEqual(bytes);
      });
    });

    describe('when the file is not found', function() {
      beforeEach(function() {
        const promise = Promise.reject();
        window.fetch.and.returnValue(promise);
      });

      it('raises an exception', async function() {
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
