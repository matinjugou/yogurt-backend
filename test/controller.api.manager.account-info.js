const assert = require('assert');
const request = require('supertest');
const path = require('path');
const instance = require(path.join(process.cwd(), 'testing.js'));

descirbe('AllTest', function() {
  describe('manager', function() {
    before(async () => {
      await this.model('manager').add({
        companyId: 1,
        name: 'hello',
        tel: '123456789',
        password: '1_m1',
        managerId: '1_m1'
      });
    });
    describe('GET account-info', function() {
      it ('server should run and can get a manager', function(done) {
        const f = function() {
          request(think.app.server).get('/api/manager/account-info')
            .set('Content-Type', 'application/json')
            .send({
              managerId: '1_s1',
              password: '1_s1'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) throw err;
              console.error(res.body.data);
              assert.equal(res.body.data.name, 'hello');
              done();
            });
        };
        setTimeout(f, 4000);
      });
    });
    describe('PUT account-info', function() {
      it ('server should run and can update a manager', function(done) {
        const f = function() {
          request(think.app.server).post('/api/manager/account-info')
            .set('Content-Type', 'application/json')
            .send({
              managerId: '1_s1',
              email: 'email@example.com'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) throw err;
              console.error(res.body.data);
              assert.equal(res.body.data.code, 0);
              assert.equal(res.body.data.msg, 'Update succeeded');
              done();
            });
        };
        setTimeout(f, 4000);
      });
    });
    after(async () => {
      const model = this.model('manager');
      await model.where({managerId: '1_m1'}).delete();
      // process.exit();
    });
  });

  describe('staff', function() {
    describe('login', function() {
      it ('server should run and login should failed', function(done){
        const f = function() {
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
        };
        setTimeout(f, 4000);
      })
    });
  });
  after(function () {
    process.exit();
  })
});


