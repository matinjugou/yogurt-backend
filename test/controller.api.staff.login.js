const test = require('ava');
const request = require('supertest');
const path = require('path');
require(path.join(process.cwd(), 'production.js'));

test('eee', t => {
  console.error("think=", think);
  console.error("app=", think.app);
  /*
  request(think.app.server).post('/api/staff/login')
    .set('Content-Type', 'application/json')
    .send({
      staffId: '1_s1',
      password: '1_s2'
    })
    .expect('Content-Type', /json/)
    .expect(200);
  */
  const a = think.model('staff');
  console.error(a);
  t.pass();
});
/**
const test = require('ava');
const request = require('supertest');
const path = require('path');
const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');
const fetch = require('node-fetch');
const Q = require('q');
/*
const Application = require('thinkjs');
function createServer() {
  const instance = new Application({
    ROOT_PATH: __dirname,
    proxy: true, // use proxy
    env: 'production'
  });

  return instance.run();
}

require(path.join(process.cwd(), 'production.js'));
test('postAction', t => {
  const body = {
    staffId: '1_s1',
    password: '1_s1'
  };
  const staff = think.model('staff');
  const stub =  sinon.stub(staff, "validateStaff");
  function staffValidatePromise() {
    return Q.fcall(function() {
      return {
        staffId: '1_s1',
        companyId: 1,
        isInit: true,
        status: 1
      };
    });
  }
  stub.withArgs('1_s1', '1_s1').returns(staffValidatePromise());
  /*
  request(process.cwd())
    .post('/api/staff/login')
    .set('Content-Type', 'multipart/form-data')
    .field('raw', JSON.stringify(body))
    .end(function (err, res) {
      if (err) {
        console.log(err);
      }
      if (res) {
        console.log(res);
      }
      done();
    })
   *
  fetch('/api/staff/login', {
    method:'POST',
    body: {
      staffId: '1_s1',
      password: '1_s1'
    }
  }).then(function (res) {
    return res.json();
  }).then(function(json) {
    console.log(json);
    t.end();
  });
  t.pass();
});
**/