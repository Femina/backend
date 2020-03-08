'use strict'
//used to import service module
var util = require('./services');

module.exports = function(app,express){
    
    var api = express.Router();

      /**
       * @Femina 
       * @description
       *  Service to get total balance
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
       * @name Iban Validator Service
       * @description
       *  This will send Bank Details for mattching Iban
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
       * @name Transfer money
       * @description
       *  This is to transfer money from total Balance to ClientAccount
       */ 

      api.post('/transfer/:amount',function(req,res){
           
            var result = util.doTransfer(req.params.amount, function(err,response,data){
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
       * @name Transfer money
       * @description
       *  This is to transfer money from total Balance to ClientAccount
       */ 

      api.post('/transfer',function(req,res){
           
            var result = util.doTransferbyIBAN(req.params.iban,req.params.amount,req.params.currency, function(err,response,data){
            if(!err){
              res.send(data);   
            }
			
           })
		   .then(data=> {
			   res.json({
				   code: 202,
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

    return api;

}