const assert = require('assert');
const thread = require('../models/Thread');

describe('Update a thread', () => {

    it('edit a thread',(done)=>{
        testThread = new thread({userName:"testUser", title: 'testThread',content:"testthreadContent"  })

            testThread.save().then(() => {
                request(app)
                    .put('/api/threads/')
                    .send(testThread)
                    .end(() => {
                    thread.findOne({ userName: 'testUser' })
                        .then(thread => {
                        assert(thread.content === "content");
                        done();
                        });
                    });
            
         })
    
    })

});