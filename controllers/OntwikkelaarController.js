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
      const {name}  = req.query;
      if(name === undefined){
      Ontwikkelaar.find()
        .then((ontwikkelaars) => {
          res.json(ontwikkelaars);
        });
      }else{
         Ontwikkelaar.findOne({Name: name})
         .then((ontwikkelaar) => {
          res.json(ontwikkelaar);
         });
      }
    }
}