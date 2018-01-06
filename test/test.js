const assert = require('assert');
const request = require('supertest');
const expect = require('chai').expect;
const path = require('path');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
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
  describe('test', function () {
    describe('user', function () {
      describe('GET queue', function () {
        const addSql = 'INSERT INTO staff (staffId,companyId,onlineStatus,servingCount,queueCount) VALUES (?, ?, ?, ?, ?)';
        let addSqlParams = ['1_s1', 1, 1, 29, 29];
        before(function (done) {
          connection.query(addSql, addSqlParams, function(err, result) {
            if (err) {
              throw err;
            }
            addSqlParams = ['1_s2', 1, 1, 29, 29];
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
              done();
            })
          })
        });
        let firstStaff;
        it('The first user should be arranged', function (done) {
          request(think.app.server).get('/api/user/queue')
            .set('Content-Type', 'application/json')
            .query({
              userId: '1_u1'
            })
            .end(function(err, res) {
              if (err) {
                console.error(err);
                throw err;
              }
              console.log("body=", res.body.data);
              console.error("body=", res.body.data);
              expect(res.body.data).to.include.keys('code');
              expect(res.body.data.code).to.be.equal(0);
              firstStaff = res.body.data.msg;
              done();
            });
        });

        it('The second user should be arranged with different user', function (done) {
          request(think.app.server).get('/api/user/queue')
            .set('Content-Type', 'application/json')
            .query({
              userId: '1_u2'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) throw err;
              expect(res.body.data).to.include.keys('code');
              expect(res.body.data.code).to.be.equal(0);
              expect(res.body.data.msg).to.be.not.equal(firstStaff);
              done();
            });
        });

        it('The third user should not be arranged with different user', function (done) {
          request(think.app.server).get('/api/user/queue')
            .set('Content-Type', 'application/json')
            .query({
              userId: '1_u3'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) throw err;
              expect(res.body.data).to.include.keys('code');
              expect(res.body.data.code).to.be.not.equal(0);
              done();
            });
        });
      })
    });

    describe('manager', function() {
      describe('login', function () {
        describe('GET login', function() {
          const addSql = 'INSERT INTO manager (companyId,name,tel,managerId,password) VALUES (1, ?, ?, ?, ?)';
          const addSqlParams = ['hello', '123456789', '1_m6', '1_m6'];
          before(function (done) {
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
              done();
            });
          });
          it('should check successfully with correct token', function (done) {
            const token = jwt.sign({managerId: '1_m6'}, self.config('secretKey'));
            request(think.app.server).get('/api/manager/login')
              .set('Content-Type', 'application/json')
              .query({
                managerId: '1_m6',
                token: token
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

          it('should check failed with wrong token', function (done) {
            const token = jwt.sign({managerId: '1_m5'}, self.config('secretKey'));
            request(think.app.server).get('/api/manager/login')
              .set('Content-Type', 'application/json')
              .query({
                managerId: '1_m6',
                token: token
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.body.data).to.include.keys('code');
                expect(res.body.data.code).to.be.equal(2);
                done();
              });
          });

          it('should check failed with invalid token', function (done) {
            const token = 'test 9527';
            request(think.app.server).get('/api/manager/login')
              .set('Content-Type', 'application/json')
              .query({
                managerId: '1_m6',
                token: token
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.body.data).to.include.keys('code');
                expect(res.body.data.code).to.be.equal(1);
                done();
              });
          });
        });

        describe('POST login', function() {
          const addSql = 'INSERT INTO manager (companyId,name,tel,managerId,password) VALUES (1, ?, ?, ?, ?)';
          const addSqlParams = ['hello', '123456789', '1_m5', '1_m5'];
          before(function (done) {
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
              done();
            })
          });
          it('should login successfully with correct info', function (done) {
            request(think.app.server).post('/api/manager/login')
              .set('Content-Type', 'application/json')
              .send({
                managerId: '1_m5',
                password: '1_m5'
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

          it('should login failed with wrong info', function (done) {
            request(think.app.server).post('/api/manager/login')
              .set('Content-Type', 'application/json')
              .send({
                managerId: '1_m5',
                password: '1_m4'
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.body.data).to.include.keys('code');
                expect(res.body.data.code).to.be.equal(1);
                done();
              });
          });
        });
      });

      describe('account-info', function() {
        describe('GET account-info', function () {
          const addSql = 'INSERT INTO manager (companyId,name,tel,managerId,password) VALUES (1, ?, ?, ?, ?)';
          const addSqlParams = ['hello', '123456789', '1_m1', '1_m1'];
          before(function (done) {
            connection.query(addSql, addSqlParams, function (err, result) {
              if (err) {
                throw err;
              }
              done();
            })
          });
          it('server should run and can get a manager', function (done) {
            request(think.app.server).get('/api/manager/account-info')
              .set('Content-Type', 'application/json')
              .query({
                managerId: '1_m1'
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function (err, res) {
                if (err) throw err;
                expect(res.body.data).to.include.keys('managerId');
                done();
              });
          });
          it('server should run and cannot get a manager', function (done) {
            request(think.app.server).get('/api/manager/account-info')
              .set('Content-Type', 'application/json')
              .query({
                managerId: '1xxxx1'
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function (err, res) {
                if (err) throw err;
                expect(res.body.data).to.be.empty;
                done();
              });
          });
        });

        describe('PUT account-info', function () {
          const addSql = 'INSERT INTO manager (companyId,name,tel,managerId,password) VALUES (1, ?, ?, ?, ?)';
          const addSqlParams = ['hello', '123456789', '1_m2', '1_m2'];
          before(function (done) {
            connection.query(addSql, addSqlParams, function (err, result) {
              if (err) {
                throw err;
              }
              done();
            });
          });
          it('server should run and can update a manager', function (done) {
            request(think.app.server).put('/api/manager/account-info')
              .set('Content-Type', 'application/json')
              .send({
                managerId: '1_m2',
                email: 'email@example.com'
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function (err, res) {
                if (err) throw err;
                expect(res.body.data).to.include.keys('code');
                expect(res.body.data.code).to.be.equal(0);
                done();
              });
          });
        });
      });

      describe('company-info', function () {
        describe('GET company-info', function() {
          const addSql = 'INSERT INTO company (id,name,managerId) VALUES (2, ?, ?)';
          const addSqlParams = ['company222', '1_m1'];
          before(function (done) {
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
              done();
            });
          });
          it ('server should run and can get a company', function(done) {
            request(think.app.server).get('/api/manager/company-info')
              .set('Content-Type', 'application/json')
              .query({
                companyId: 2
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.body.data).to.include.keys('managerId');
                done();
              });
          });
          it ('server should run and cannot get a company', function(done) {
            request(this.app.server).get('/api/manager/company-info')
              .set('Content-Type', 'application/json')
              .query({
                companyId: 4442
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.body.data.keys('code').length).to.be.equal(0);
                done();
              });
          });
        });

        describe('PUT company-info', function() {
          const addSql = 'INSERT INTO company (id,name,managerId) VALUES (3, ?, ?)';
          const addSqlParams = ['company333', '1_m2'];
          before(function (done) {
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
              done();
            });
          });
          it ('server should run and can update a company', function(done) {
            request(think.app.server).put('/api/manager/company-info')
              .set('Content-Type', 'application/json')
              .send({
                companyId: 3,
                robotWelcome: 'Hello, this is robot 1'
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
          it ('server should run and cannot update a company', function(done) {
            request(think.app.server).put('/api/manager/company-info')
              .set('Content-Type', 'application/json')
              .send({
                companyId: 4443,
                robotWelcome: 'Hello, this is robot 1'
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.body.data).to.include.keys('code');
                expect(res.body.data.code).to.be.equal(2);
                done();
              });
          });
        });
      });

      describe('note', function() {
        describe('GET note', function() {
          const addSql = 'INSERT INTO note (companyId,userId,content,email,isReplied) VALUES(?, ?, ?, ?, ?)';
          let addSqlParams = [1, '1_u22', 'I want detail information', 'example@example.com', 0];
          before(function (done) {
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
            });
            addSqlParams = [1, '1_u23', 'I want to know more about your company', 'example@example.com', 0];
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
              done();
            });
          });
          it ('server should run and can get 2 notes', function(done) {
            request(think.app.server).get('/api/manager/note')
              .set('Content-Type', 'application/json')
              .query({
                companyId: 1
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.body.data[0]).to.include.keys('content');
                assert.equal(res.body.data.length, 2);
                done();
              });
          });
          it ('server should run and cannot get notes', function(done) {
            request(think.app.server).get('/api/manager/note')
              .set('Content-Type', 'application/json')
              .query({
                companyId: 32
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.body.data).to.be.empty;
                done();
              });
          });
        });

        describe('POST note', function() {
          const addSql = 'INSERT INTO note (id,companyId,userId,content,email,isReplied) VALUES(?, ?, ?, ?, ?, ?)';
          let addSqlParams = [3, 2, '2_u22', 'I want detail information', 'thss15_yangbf@163.com', 0];
          before(function (done) {
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
            });
            addSqlParams = [4, 2, '2_u23', 'I want to know more about your company', 'thss15_yangbf@163.com', 0];
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
              done();
            });
          });
          it ('server should run and can post reply', function(done) {
            request(think.app.server).post('/api/manager/note')
              .set('Content-Type', 'application/json')
              .send({
                noteId: 4,
                staffId: '2_s2',
                reply: 'testing note reply'
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
          it ('server should run and cannot post reply', function(done) {
            request(think.app.server).post('/api/manager/note')
              .set('Content-Type', 'application/json')
              .send({
                noteId: 4222,
                staffId: '2_s2',
                reply: 'testing note reply'
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.body.data).to.include.keys('code');
                expect(res.body.data.code).to.be.equal(2);
                done();
              });
          });
        });
      });

      describe('staff', function() {
        describe('GET staff', function() {
          const addSql = 'INSERT INTO staff (companyId,staffId,password,companyId,isInit,onlineStatus,servingCount,queueCount) VALUES (4, ?, ?, ?, ?, ?, ?, ?)';
          let addSqlParams = ['4_s41', '4_s41', 1, 1, 1, 29, 29];
          before(function(done) {
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
            });
            addSqlParams = ['4_s42', '4_s42', 1, 1, 1, 21, 21];
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
            });
            addSqlParams = ['4_s43', '4_s43', 1, 1, 5, 0, 1];
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
              done();
            });
          });
          it ('server should run and can get 2 staffs', function(done) {
            request(think.app.server).get('/api/manager/staff')
              .set('Content-Type', 'application/json')
              .query({
                companyId: 4
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.body.data[0]).to.include.keys('staffId');
                assert.equal(res.body.data.length, 2);
                done();
              });
          });
          it ('server should run and cannot get staffs', function(done) {
            request(think.app.server).get('/api/manager/staff')
              .set('Content-Type', 'application/json')
              .query({
                companyId: 1222
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.body.data).to.be.empty;
                done();
              });
          });
        });

        describe('POST staff', function() {
          it ('server should run and can add staffs', function(done) {
            request(think.app.server).post('/api/manager/staff')
              .set('Content-Type', 'application/json')
              .send({
                number: 3,
                companyId: 4
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.body.data.length).to.be.equal(3);
                done();
              });
          });
        });

        describe('PUT staff', function() {
          const addSql = 'INSERT INTO staff (companyId,staffId,password,companyId,isInit,onlineStatus,servingCount,queueCount) VALUES (4, ?, ?, ?, ?, ?, ?, ?)';
          const addSqlParams = ['4_s3', '4_s3', 1, 1, 1, 29, 29];
          before(function (done) {
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
              done();
            });
          });
          it ('server should start and can update role', function(done) {
            request(think.app.server).put('/api/manager/staff')
              .set('Content-Type', 'application/json')
              .send({
                staffId: '4_s3',
                role: '售后'
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
          it ('server should start and cannot update role', function(done) {
            request(think.app.server).put('/api/manager/staff')
              .set('Content-Type', 'application/json')
              .send({
                staffId: '44_s23',
                role: '售后'
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.body.data).to.include.keys('code');
                expect(res.body.data.code).to.be.equal(1);
                done();
              });
          });
        });

        describe('DELETE staff', function() {
          const addSql = 'INSERT INTO staff (companyId,staffId,password,companyId,isInit,onlineStatus,servingCount,queueCount) VALUES (4, ?, ?, ?, ?, ?, ?, ?)';
          let addSqlParams = ['4_s11', '4_s11', 1, 1, 1, 29, 29];
          before(function (done) {
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
            });
            addSqlParams = ['4_s12', '4_s12', 1, 1, 1, 29, 29];
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
              done();
            });
          });
          it ('server should run and cannot delete staff', function(done) {
            request(think.app.server).delete('/api/manager/staff')
              .set('Content-Type', 'application/json')
              .query({
                stuff: ['11_s1', '11_s2']
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.body.data).to.include.keys('code');
                assert.equal(res.body.data.code, 1);
                done();
              });
          });
          it ('server should run and can delete staffs', function(done) {
            request(think.app.server).delete('/api/manager/staff')
              .set('Content-Type', 'application/json')
              .query({
                stuff: ['4_s11', '4_s12']
              })
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) throw err;
                expect(res.body.data).to.include.keys('code');
                assert.equal(res.body.data.code, 0);
                done();
              });
          });
        });
      });
    });

    describe('staff', function() {
      describe('login', function() {
        const addSql = 'INSERT INTO staff (staffId,password,companyId,isInit,onlineStatus,servingCount,queueCount) VALUES (?, ?, ?, ?, ?, ?, ?)';
        let addSqlParams = ['1_s3', '1_s3', 1, 1, 1, 29, 29];
        before(function (done) {
          connection.query(addSql, addSqlParams, function(err, result) {
            if (err) {
              throw err;
            }
            addSqlParams = ['1_s4', '1_s4', 1, 0, 1, 29, 29];
            connection.query(addSql, addSqlParams, function(err, result) {
              if (err) {
                throw err;
              }
              done();
            })
          })
        });
        it ('wrong info login should failed', function(done){
          request(think.app.server).post('/api/staff/login')
            .set('Content-Type', 'application/json')
            .send({
              staffId: '1_s3',
              password: '1_s2'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) throw err;
              assert.equal(res.body.data.code, 1);
              done();
            });
        });

        it ('correct info and login should succeed', function(done){
          request(think.app.server).post('/api/staff/login')
            .set('Content-Type', 'application/json')
            .send({
              staffId: '1_s3',
              password: '1_s3'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) throw err;
              assert.equal(res.body.data.code, 0);
              done();
            });
        });

        it ('correct info and login need init', function(done){
          request(think.app.server).post('/api/staff/login')
            .set('Content-Type', 'application/json')
            .send({
              staffId: '1_s4',
              password: '1_s4'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) throw err;
              assert.equal(res.body.data.code, 2);
              done();
            });
        })
      });
    });

    after(function () {
      connection.end();
      process.exit();
    })
  });
  run();
}, 5000);
