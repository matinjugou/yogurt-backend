const Application = require('thinkjs');

const instance = new Application({
  ROOT_PATH: __dirname,
  proxy: true, // use proxy
  env: 'testing',
  host: '127.0.0.1',
  port: 2333
});

instance.run();