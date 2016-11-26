'use strict';

const filesystem = require('fs');
const lodash = require('lodash');
const mimeTypes = require('mime-types');

class DataUriCompiler {

  constructor(config) {
    this.config = lodash.defaultsDeep(
      lodash.cloneDeep(config && config.plugins && config.plugins.datauri || {}),
      {
        pattern: /\.(gif|jpg|png)/
      }
    );

    if (this.config.pattern) {
      this.pattern = this.config.pattern;
    }
  }

  getDataUri(path) {
    return new Promise(
      (resolve, reject) => {
        filesystem.readFile(
          path,
          (error, data) => {
            if (error) {
              reject(error);
            }

            resolve('data:' + mimeTypes.lookup(path) + ';base64,' + data.toString('base64'));
          }
        );
      }
    );
  }

  compile(file) {
    return new Promise(
      (resolve, reject) => {
        const result = this.getDataUri(file.path);

        result.catch(
          (error) => {
            reject(error);
          }
        );

        result.then(
          (data) => {
            resolve('module.exports = ' + JSON.stringify(data) + ';');
          }
        );
      }
    );
  }

}

DataUriCompiler.prototype.brunchPlugin = true;
DataUriCompiler.prototype.pattern = /\.(gif|jpg|png)/;
DataUriCompiler.prototype.type = 'template';

module.exports = DataUriCompiler;
