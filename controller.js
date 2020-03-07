'use strict'
//used to import service module
var util = require('./services');

module.exports = function(app,express){
    
    var api = express.Router();

      /**
       * @name latest
       * @description
       *  end point to get latest exchange rate with USD as base currency
       */    

      api.get('/balance',function(req,res){
            var result = util.getBalance(function(err,response,data){
            if(!err){
              res.send(data);   
            }
           })
		   .then(data=> {
			   res.json({
				   code: 200,
				   data 
			   })
		   })
		   .catch(error=>{
			   res.json({
				   code: error.status,
				   message: error.message
			   })
		   });           
        });

      /**
       * @name currencies
       * @description
       *  end point to get list of currencies available
       */  

      api.get('/bank/:iban',function(req,res){
		  
            var result = util.getBank(req.params.iban, function(err,response,data){
            if(!err){
              res.send(data);   
            }
			
           })
		   .then(data=> {
			   res.json({
				   code: 200,
				   data
			   })
		   })
		   .catch(error=>{
			   res.json({
				   code: error.status,
				   message: error.message
			   })
		   });
        });

      /**
       * @name history
       * @description
       *  end point to get history data given a date ass parameter
       */ 

      api.post('/transfer',function(req,res){
           var dateString = req.query.date;
           var result = util.doTransfer(dateString,function(err,response,data){
            if(!err){
              res.send(data);   
            }
           });
        });

    return api;

}