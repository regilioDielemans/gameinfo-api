const assert = require('assert');
const thread = require('../models/Thread');
const comment = require('../models/comment');
const app = require('../app');

describe('Creating a thread', () => {
  it('saves a thread', (done) => {

    const testThread = new thread({ userName: "tester", title: "test title", content: "test content" });
    thread.count().then(thread => {
        request(app)
          .post('/api/threads')
          .send(testThread)
          .end(() => {
            thread.count().then(newCount => {
              assert(count + 1 === newCount);
              done();
            });
          });
      });
    }),
    


    it('saves a comment', (done) => {

        const testComment = new comment({ userName: "tester", comment: "test comment" });
    
        comment.count().then(comment => {
            request(app)
              .post('/api/comment')
              .send(testComment)
              .end(() => {
                comment.count().then(newCount => {
                  assert(count + 1 === newCount);
                  done();
                });
              });
            });
        });
          

});