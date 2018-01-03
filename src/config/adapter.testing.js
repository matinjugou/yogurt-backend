const fileCache = require('think-cache-file');
const redisCache = require('think-cache-redis');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const mysql = require('think-model-mysql');
const {Console, File, DateFile} = require('think-logger3');
const socketio = require('think-websocket-socket.io');
const path = require('path');
const isDev = think.env === 'testing';

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'redis',
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  },
  redis: {
    handle: redisCache,
    port: 6379,
    host: '123.206.22.71',
    password: ''
  }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'mysql',
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    handle: mysql,
    database: 'yogurt_test',
    prefix: '',
    encoding: 'utf8',
    host: '127.0.0.1',
    user: 'root',
    password: '',
    dateStrings: true
  },

  mongo: {
    host: ['127.0.0.1', '60.205.178.28'],
    port: [27017, 27018],
    user: '',
    password: '',
    database: 'yogurt',
    options: ''
  }
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
  type: 'file',
  common: {
    cookie: {
      name: 'thinkjs'
      // keys: ['werwer', 'werwer'],
      // signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks
  }
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? 'console' : 'dateFile',
  console: {
    handle: Console
  },
  file: {
    handle: File,
    backups: 10, // max chunk number
    absolute: true,
    maxLogSize: 50 * 1024, // 50M
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  },
  dateFile: {
    handle: DateFile,
    level: 'ALL',
    absolute: true,
    pattern: '-yyyy-MM-dd',
    alwaysIncludePattern: true,
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  }
};

/**
 * websocket adapter config
 * @type {Object}
 **/
exports.websocket = {
  type: 'socketio',
  common: {
  },
  socketio: {
    handle: socketio,
    path: '/socket.io',
    adapter: null,
    messages: [{
      open: '/websocket/open',
      userReg: '/websocket/userReg',
      staffReg: '/websocket/staffReg',
      userMsg: '/websocket/userMsg',
      staffMsg: '/websocket/staffMsg',
      staffLogOut: '/websocket/staffLogOut',
      userLogOut: '/websocket/userLogOut',
      transUser: '/websocket/transUser',
      transAccept: '/websocket/transAccept',
      transReject: '/websocket/transReject',
      staffServiceStop: 'websocket/staffServiceStop',
      userServiceStop: 'websocket/userServiceStop',
      serviceStart: 'websocket/serviceStart',
      newUser: 'websocket/newUser',
      close: '/websocket/close'
    }]
  }
};
