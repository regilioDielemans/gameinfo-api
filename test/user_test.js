const assert = require('assert');

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = mongoose.model('user');


describe('User endpoints for POST, PUT and DEL', () => {
    it('POST to /api/users creates a new user', (done) => {
        const testUser = new User({ 
            userName: "testUser", 
            password: "123goedwachtwoord"
          });

       User.count().then(count => {
            request(app)
              .post('/api/users')
              .send(testUser)
              .end(() => {
                User.count().then(newCount => {
                  assert(count + 1 === newCount);
                  done();
                });
              });
          });
        });

  

    it('Put to /api/users can update the password', done => {
        const testUser = new User({ 
            userName: "updateTestUser", 
            password: "123goedwachtwoord"
        });
        testUser.save().then(() => {
        request(app)
            .put('/api/users/')
            .send({ username: "updateTestUser",
                        currentPassword: "123goedwachtwoord",
                        newPassword: "1234beterwachtwoord"})
            .end(() => {
            User.findOne({ userName: 'updateTestUser' })
                .then(user => {
                assert(user.password === "1234beterwachtwoord");
                done();
                });
            });
        });
    });

  
  it('DELETE to /api/users/ can delete a user based on username and password', done => {
    const testUser = new User({ 
        userName: "deleteTestUser", 
        password: "123goedwachtwoord"
      });

      testUser.save().then(() => {
        request(app)
            .delete('/api/users')
            .send({ username: "deleteTestUser",
                    password: "123goedwachtwoord"
                    })
            .end(() => {
            User.findOne(testUser).then(user => {
                assert(!user);
                done();
          });
        });
    });
  });
});
