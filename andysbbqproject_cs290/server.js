var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.use(express.static('public')); 


app.get('/',function(req,res){

  res.render('home');
});

app.get('/menu',function(req,res){
  res.render('menu');
});

app.get('/location-hours',function(req,res){
  res.render('location-hours');
});

app.get('/catering',function(req,res){
  var data = {params: '', requestType: ''};
    data.requestType = "Catering";
    var queryParams = [];
    for (var param in req.query) {
        queryParams.push({'name':param,'value':req.query[param]});
    }
    data.params = queryParams;

    if (queryParams.length > 0) {
        data.requestType = "GET Request Received";
    }
    res.render('catering', data);
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
