const Application = require('thinkjs');

const instance = new Application({
  ROOT_PATH: __dirname,
  proxy: true, // use proxy
  env: 'testing'
});

instance.run();
console.error("ins_origin=", instance);
module.exports = instance;
