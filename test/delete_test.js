const assert = require('assert');
const thread = require('../models/Thread');
const comment = require('../models/comment');
const app = require('../app');

describe('delete a thread or comment', () => {

   

    it('deletes a thread', (done) => {
        testThread = new thread({ userName: 'tester', title:"testTitle",content:"testContent" });
      

        testThread.save().then(() => {
          request(app)
              .delete('/api/threads')
              .send(testThread)
              .end(() => {
              thread.findOne(testThread).then(thread => {
                  assert(!thread);
                  done();
            });
          });
      });
    });

      it('deletes a comment', (done) => {
        testcomment = new comment({userName:'tester',commment:"testComment"})
        


        testcomment.save().then(() => {
          request(app)
              .delete('/api/comment')
              .send(testcomment)
              .end(() => {
              thread.findOne(testcomment).then(comment => {
                  assert(!comment);
                  done();
            });
          });
      });
    });

              

});