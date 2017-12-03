const path = require('path');
const isDev = think.env === 'development';
const cors = require('@koa/cors');

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: cors,
    options: {}
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {}
  },
  {
    handle: 'router',
    options: {}
  },
  {
    handle: 'token-verify',
    enable: false
  },
  {
    handle: 'koa2-file-server',
    options: {
      root: path.join(think.ROOT_PATH, 'media'),
      webp: true,
      identifier: '??'
    }
  },
  'logic',
  'controller'
];
