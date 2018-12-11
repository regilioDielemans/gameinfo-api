
var ObjectID = require('mongodb').ObjectID;
const User = require('../models/user');

module.exports = {
    create(req, res) {
     console.log('Reaches the create controller');
       const newUser = new User({ userName: req.body.userName,password: req.body.password });
       console.log(req.body.userName)
       newUser.save()
       .catch((err)=> res.status(422).send("Could not add user"))
       //res.send('user added');
   },

   login(req,res){
    console.log('Reaches the create controller');
    var userName = req.body.userName;
    console.log(userName);
   }

}