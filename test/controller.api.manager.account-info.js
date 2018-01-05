const assert = require('assert');
const request = require('supertest');
const expect = require('chai').expect;
const path = require('path');
const instance = require(path.join(process.cwd(), 'testing.js'));
const self = global.think;
self.model('manager').add({
  companyId: 1,
  name: 'hello',
  tel: '123456789',
  password: '1_m1',
  managerId: '1_m1'
});
self.model('manager').add({
  companyId: 1,
  name: 'hello',
  tel: '123456789',
  password: '1_m2',
  managerId: '1_m2'
});
setTimeout(function () {
  describe('AllTest', function() {
    describe('manager', function() {
      describe('GET account-info', function() {
        it ('server should run and can get a manager', function(done) {
          request(think.app.server).get('/api/manager/account-info')
            .set('Content-Type', 'application/json')
            .query({
              managerId: '1_m1',
              password: '1_m1'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) throw err;
              console.error(res.body.data);
              expect(res.body.data).to.include.keys('managerId');
              done();
            });
        });
      });
      describe('PUT account-info', function() {
        it ('server should run and can update a manager', function(done) {
          request(think.app.server).put('/api/manager/account-info')
            .set('Content-Type', 'application/json')
            .send({
              managerId: '1_m2',
              email: 'email@example.com'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) throw err;
              console.error(res.body.data);
              expect(res.body.data).to.include.keys('code');
              expect(res.body.data.code).to.be.equal(0);
              done();
            });
        });
        /*
        after(async function(done) {
          const model = self.model('manager');
          await model.where({managerId: '1_m2'}).delete();
          // process.exit();
          done();
        });
        */
      });
    });

    describe('staff', function() {
      describe('login', function() {
        it ('server should run and login should failed', function(done){
          request(think.app.server).post('/api/staff/login')
            .set('Content-Type', 'application/json')
            .send({
              staffId: '1_s1',
              password: '1_s2'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) throw err;
              console.error(res.body.data);
              assert.equal(res.body.data.code, 1);
              assert.equal(res.body.data.msg, 'Staff does not exist!');
              done();
            });
        })
      });
    });
    /*
    after(function () {
      process.exit();
    })
    */
  });
  run();
}, 5000);
