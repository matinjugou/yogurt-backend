const view = require('think-view');
const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
const mongo = require('think-mongo');
const email = require('think-email');
const websocket = require('think-websocket');

module.exports = [
  view, // make application support view
  email,
  model(think.app),
  mongo(think.app),
  websocket(think.app),
  cache,
  session
];
