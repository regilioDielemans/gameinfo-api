const Game = require('../models/Game');
const ontwikkelaar = require('../models/ontwikkelaar');
var ObjectID = require('mongodb').ObjectID;


module.exports = {
   create(req, res) {
    console.log('Reaches the create controller');
      const newGame = new Game({ title: req.body.title,beschrijving: req.body.beschrijving, ontwikkelaar: req.body.ontwikkelaarNaam});
      newGame.save()
      res.send('game added');
      ontwikkelaar.findOne({Name: req.body.ontwikkelaarNaam})
        .then((result)=>{ 
          result.games.push(newGame);
          result.save();
        });
  },

  deleteGameByid(req,res){
    console.log('Reaches the delete controller');
    var idProp = req.body.id;
    console.log(idProp);
    Game.findByIdAndRemove({_id: new ObjectID(idProp)})
    .then((result) => {
        if(result){    
         res.send("is deleted")
        }
        else{
          res.status(422).send("Could not delete game")
        }
      })
    .catch((err)=> res.status(422).send("Could not delete game"))

  
  },

  getGame(req,res){
    const {title}  = req.query;
    if(title === undefined){
      console.log("undefined")
    console.log('Reaches the get controller');
      Game.find()
      .then((game) => {
        res.json(game);
      });
    }
  else{
    Game.findOne({title: title})
    .then((game) => {
      
      res.json(game);
    });
    }
  },

  editGame(req,res, next){
    console.log('Reaches the edit controller : ' + req.body);

    //gets id from body
    var idProp = req.body._id;
    console.log(req.body)
    //new ObjectID(idProp) turns the id string from the body into an ObjectId instance so it can be found in the database
    Game.findById({_id: new ObjectID(idProp)})
    .then((result)=>{
      if(result){
          result.updateOne({title: req.body.title, beschrijving: req.body.beschrijving})
            .then(() =>
              res.json({ message: 'Successfully updated'}))
            .catch((err) => res.send(err))
            }
          else(res.status(422).send("game doesn't exist"))
        })
        .catch((err) => res.send("Could update game"))
  },

};

