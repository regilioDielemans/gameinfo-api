const Ontwikkelaar = require('../models/ontwikkelaar')



module.exports = {
   create(req, res) {
      console.log('Reaches the create controller');
      const newOntwikkelaar = new Ontwikkelaar({ Name: req.body.Name,Headquarters: req.body.Headquarters,Founder: req.body.Founder });
      newOntwikkelaar.save()
      res.send('added')
   },
   getOntwikkelaars(req,res){
      console.log('Reaches the get controller');
      Ontwikkelaar.find()
        .then((ontwikkelaars) => {
          res.json(ontwikkelaars);
        });
        
      
  
    }
   

}