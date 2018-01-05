const assert = require('assert');
const request = require('supertest');
const path = require('path');
const instance = require(path.join(process.cwd(), 'testing.js'));

describe('manager', function() {
  before(function () {
    this.model('manager').add({
      companyId: 1,
      name: 'hello',
      tel: '123456789',
      password: '1_m1',
      managerId: '1_m1'
    });
  });
  describe('GET account-info', function() {
    it ('server should run and can get a manager', function(done){
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
  des
  after(function () {
    const model = this.model('manager');
    model.where({managerId: '1_m1'}).delete();
    process.exit();
  });
});

