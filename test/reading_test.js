const assert = require('assert');
const thread = require('../models/Thread');

describe('view a thread', () => {


    it('gets a thread', (done) => {
        const testThread = new thread({ userName: "tester", title: "test title", content: "content" });
        
        testThread.save().then(() => {
            request(app)
                .delete('/api/threads')
                .send(testThread)
                .end((err, response) => {
                    assert(response.body.content === 'content');
                    done();
                })
            });
        });
});