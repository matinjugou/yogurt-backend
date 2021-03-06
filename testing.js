const Application = require('thinkjs');
const path = require('path');

const instance = new Application({
  ROOT_PATH: __dirname,
  proxy: true, // use proxy
  env: 'testing'
});

instance.run();

instance.runInWorker({ port: 2333 });

module.exports = instance;