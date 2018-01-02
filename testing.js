const thinkjs = require('thinkjs'),
  path = require('path'),
  ROOT_PATH = path.dirname(__dirname);

thinkjs.load({
  ROOT_PATH: ROOT_PATH,
  APP_PATH: ROOT_PATH + think.sep + 'app',
  RUNTIME_PATH: ROOT_PATH + think.sep + 'runtime',
  RESOURCE_PATH: ROOT_PATH + think.sep + 'www',
  port:1234,
  env: 'testing'
});

module.exports = function(req, res) {
  think.http(req, res).then(function (http) {
    const app = think.require('app');
    (new app(http)).run();
  });
};