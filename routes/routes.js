//require necessary controllers here
const app = require('../app');
const cors = require('cors')

const gameController = require('../controllers/gameController');
const UserController = require('../controllers/userController');
const ontwikkelaarController = require('../controllers/OntwikkelaarController');



module.exports = (app) => {
  //app.use(cors());
  
  //games
  app.post('/api/games', gameController.create);
  app.put('/api/games',gameController.editGame);
  app.delete('/api/games',gameController.deleteGameByid);
  app.get('/api/games',gameController.getGame);

  //User endpoints
   app.post('/api/users', UserController.create);
   app.post('/api/login',UserController.login)
  


  //ontwikkelaar endpoints
  app.post('/api/ontwikkelaars', ontwikkelaarController.create);
  app.get('/api/ontwikkelaars', ontwikkelaarController.getOntwikkelaars);

  

};


