var express = require('express'); 

var bodyParser =  require('body-parser'); 

var morgan = require('morgan');

var config = require('./config'); // config file

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public')); 
var api = require('./controller')(app,express);

app.use('/api/v1', api); 
app.listen(config.port,function(err){

  if(err){
    console.log("error");
  }else{
    console.log("server listening on port "+ config.port);   
  }

});

