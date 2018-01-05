const assert = require('assert');
const request = require('supertest');
const path = require('path');
// const instance = require(path.join(process.cwd(), 'testing.js'));

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
  })
  after(function () {
    process.exit();
  })
});