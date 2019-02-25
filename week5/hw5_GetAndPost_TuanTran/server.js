var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 9112);

app.get('/',function(request,response){
    var data = {params: '', requestType: ''};
    data.requestType = "HW5: Make a GET or a POST request";
    var queryParams = [];
    for (var param in request.query) {
        queryParams.push({'name':param,'value':request.query[param]});
    }
    data.params = queryParams;

    if (queryParams.length > 0) {
        data.requestType = "GET Request Received";
    }
    response.render('result', data);
});




app.post('/', function(request, response) {
    var data = {params: '', requestType: ''};
    data.requestType = "HW5: Make a GET or a POST request";

    var params = [];
    if (request.query) {
        for (var param in request.query) {
            params.push({'name':param,'value':request.query[param]});
        }
        data.params = params;
        if (Object.keys(request.query).length === 0 && request.query.constructor === Object) {
          
            for (var param in request.body) {
                params.push({'name':param,'value':request.body[param]});
            }
            data.params = params;
        }

        data.requestType = "POST Request Received";
    }

    response.render('result', data);
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
