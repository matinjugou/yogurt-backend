const Application = require('thinkjs');

const instance = new Application({
  ROOT_PATH: __dirname,
  proxy: true, // use proxy
  APP_PATH: ROOT_PATH + think.sep + 'app',
  RUNTIME_PATH: ROOT_PATH + think.sep + 'runtime',
  RESOURCE_PATH: ROOT_PATH + think.sep + 'www',
  env: 'testing'
});

instance.run();
console.error("ins_origin=", instance);
module.exports = instance;
