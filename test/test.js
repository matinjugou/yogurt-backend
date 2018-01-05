const assert = require('assert');
const request = require('supertest');
const expect = require('chai').expect;
const path = require('path');
const mysql = require('mysql');
const instance = require(path.join(process.cwd(), 'testing.js'));
const self = global.think;
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'yogurt_test'
});
connection.connect();
setTimeout(function () {
    describe('manager', function() {
      describe('GET account-info', function() {
        const addSql = 'INSERT INTO manager (companyId,name,tel,managerId,password) VALUES (1, ?, ?, ?, ?)';
        const addSqlParams = ['hello', '123456789', '1_m1', '1_m1'];
        before(function (done) {
          connection.query(addSql, addSqlParams, function(err, result) {
            if (err) {
              throw err;
            }
            done();
          })
        });
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
              expect(res.body.data).to.include.keys('managerId');
              done();
            });
        });
      });
      describe('PUT account-info', function() {
        const addSql = 'INSERT INTO manager (companyId,name,tel,managerId,password) VALUES (1, ?, ?, ?, ?)';
        const addSqlParams = ['hello', '123456789', '1_m2', '1_m2'];
        before(function (done) {
          connection.query(addSql, addSqlParams, function(err, result) {
            if (err) {
              throw err;
            }
            done();
          })
        });
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
              assert.equal(res.body.data.code, 1);
              assert.equal(res.body.data.msg, 'Staff does not exist!');
              done();
            });
        })
      });
    });

    after(function () {
      process.exit();
    })
  run();
}, 5000);
