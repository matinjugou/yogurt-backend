const Application = require('thinkjs');

const instance = new Application({
  ROOT_PATH: __dirname,
  proxy: true, // use proxy
  env: 'testing',
  port: 2333
});

instance.run();