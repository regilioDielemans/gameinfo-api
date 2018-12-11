const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/mongo_studdit_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Warning', error);
    });
});

beforeEach(done => {
  //TODO:specify collections to drop
    mongoose.connection.collections.threads.drop(() => {
    
  });

  mongoose.connection.collections.comments.drop(() => {
    done();
  });
});
