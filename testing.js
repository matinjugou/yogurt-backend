const Application = require('thinkjs');
const path = require('path');
const test = require('ava');
const request = require('supertest');

const instance = new Application({
  ROOT_PATH: __dirname,
  proxy: true, // use proxy
  env: 'testing'
});

instance.run();

test('eee', t => {
  console.error("think=", think);
  console.error("app=", think.app);
  request('http://127.0.0.1:2333').post('/api/staff/login')
    .set('Content-Type', 'application/json')
    .send({
      staffId: '1_s1',
      password: '1_s2'
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      console.error("res=", res);
    });
  const a = think.model('staff');
  console.error(a);
  t.pass();
});