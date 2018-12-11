const assert = require('assert');
const neo4j = require('../neo4j_setup.js')
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = mongoose.model('user');


describe('Friendship endpoints for POST, and DEL', () => {
    it('POST to /api/friendships creates a new friendship relation between users', (done) => {
        const testFriendshipUser1 = new User({ 
            userName: "user2test", 
            password: "123goedwachtwoord"
            });

            const testFriendshipUser2 = new User({ 
                userName: "user1test", 
                password: "123goedwachtwoord"
            });


            request(app)
              .post('/api/users')
              .send(testFriendshipUser1)
              .end(() => {
                request(app)
                .post('/api/users')
                .send(testFriendshipUser2)
                .end(() => {
                    request(app)
                    .post('/api/friendships')
                    .send({ userName: "user1test", 
                            userName: "user2test", })
                    .end(() => {

                        session = neo4j.session();
                        params = {
                            u1: testFriendshipUser1.userName,
                            u2: testFriendshipUser2.userName
                        }

                        friendshipExistsQuery = 'MATCH (u:User)-[r:FRIENDSHIP]-(z:User) ' +
                        'WHERE u.userName = $u1 AND z.userName = $u2' +
                        'RETURN u';
                        
                
                        const addFriendshipPromise = session.writeTransaction(tx => tx.run(
                        FriendshipRelationQuery, params
                        ));
                        
                        addFriendshipPromise.then((result) =>{
                            session.close();
                            assert(result.records.length !== 0)
                            done();
                        })
                        .catch(() => done())
                    });
                });
            });
  
    });



    it('DEL to /api/friendships deletes a friendship relation between users', (done) => {
        const testFriendshipUser1 = new User({ 
            userName: "user2test", 
            password: "123goedwachtwoord"
            });

            const testFriendshipUser2 = new User({ 
                userName: "user1test", 
                password: "123goedwachtwoord"
            });


            request(app)
              .post('/api/users')
              .send(testFriendshipUser1)
              .end(() => {
                request(app)
                .post('/api/users')
                .send(testFriendshipUser2)
                .end(() => {
                    request(app)
                    .post('/api/friendships')
                    .send({ userName: "user1test", 
                            userName: "user2test", })
                    .end(() => {
                        request(app)
                        .delete('/api/friendships')
                        .send({ userName: "user1test", 
                                userName: "user2test", })
                        .end(() => {

                            session = neo4j.session();
                            params = {
                                u1: testFriendshipUser1.userName,
                                u2: testFriendshipUser2.userName
                            }

                            friendshipExistsQuery = 'MATCH (u:User)-[r:FRIENDSHIP]-(z:User) ' +
                            'WHERE u.userName = $u1 AND z.userName = $u2' +
                            'RETURN u';
                            
                    
                            const checkFriendshipPromise = session.writeTransaction(tx => tx.run(
                            FriendshipRelationQuery, params
                            ));
                            
                            checkFriendshipPromise.then((result) =>{
                                session.close();
                                assert(result.records.length === 0)
                                done();
                            })
                            .catch(() => done())
                    });
                });
            });
            });
        });
    });


