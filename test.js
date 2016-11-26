'use strict';

const expect = require('chai').expect;

describe('DataUriPlugin', function() {
  const Plugin = require('./index.js');

  it('should use gif, jpg and png file patterns by default',
    () => {
      const plugin = new Plugin();
      const pattern = /\.(gif|jpg|png)/.toString();

      expect(plugin.pattern.toString()).to.equal(pattern);
    }
  );

  it('should compile gif files to data uri format',
    () => {
      const plugin = new Plugin();

      return new Promise(
        (resolve, reject) => {
          const result = plugin.compile({path: 'test_files/dog1.gif'});

          result.catch(
            (error) => {
              reject(error);
            }
          );

          result.then(
            (data) => {
              expect(data.indexOf('data:image/gif;base64,')).to.not.equal(-1);
              resolve();
            }
          );
        }
      );
    }
  );

  it('should compile jpg files to data uri format',
    () => {
      const plugin = new Plugin();

      return new Promise(
        (resolve, reject) => {
          const result = plugin.compile({path: 'test_files/cat1.jpg'});

          result.catch(
            (error) => {
              reject(error);
            }
          );

          result.then(
            (data) => {
              expect(data.indexOf('data:image/jpeg;base64,')).to.not.equal(-1);
              resolve();
            }
          );
        }
      );
    }
  );

  it('should compile png files to data uri format',
    () => {
      const plugin = new Plugin();

      return new Promise(
        (resolve, reject) => {
          const result = plugin.compile({path: 'test_files/bird1.png'});

          result.catch(
            (error) => {
              reject(error);
            }
          );

          result.then(
            (data) => {
              expect(data.indexOf('data:image/png;base64,')).to.not.equal(-1);
              resolve();
            }
          );
        }
      );
    }
  );

});
