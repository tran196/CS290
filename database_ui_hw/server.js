var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'classmysql.engr.oregonstate.edu',
  user  : 'cs290_trant6',
  password: '2091',
  database: 'cs290_trant6'
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 9112);

pool.query("DROP TABLE IF EXISTS workoutTable", function(err){
    var createString = "CREATE TABLE workoutTable(" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "name VARCHAR(255) NOT NULL," +
    "reps INT," +
    "weight INT," +
    "date DATE," +
    "unit BOOLEAN)";
    pool.query(createString, function(err){
      console.log( "Created Table");
    });
});

app.get('/', function(req, res, next){
  var context = {};
  pool.query('SELECT * FROM workoutTable', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context = JSON.stringify(rows);
    res.render('home');
  });
});

 app.post('/', function(req, res){
    res.render('home');
 });  

 app.get('/reset-table',function(req,res,next){
    var context = {};
    pool.query("DROP TABLE IF EXISTS workoutTable", function(err){
      var createString = "CREATE TABLE workoutTable(" +
      "id INT PRIMARY KEY AUTO_INCREMENT," +
      "name VARCHAR(255) NOT NULL," +
      "reps INT," +
      "weight INT," +
      "date DATE," +
      "unit BOOLEAN)";
      pool.query(createString, function(err){
        context.results = "Table reset";
        res.render('home',context);
      });
    });
  });


   app.get('/safe-update',function(req,res,next){
    var context = {};
    pool.query("SELECT * FROM workoutTable WHERE id=?", [req.query.id], function(err, result){
      if(err){
        next(err);
        return;
      }
      if(result.length == 1){
        var curVals = result[0];
        pool.query("UPDATE workoutTable SET name=?, reps=?, weight=?, date=?, unit=? WHERE id=? ",
          [req.query.name || curVals.name, req.query.done || curVals.done, req.query.due || curVals.due, req.query.id],
          function(err, result){
          if(err){
            next(err);
            return;
          }
          context.results = "Updated " + result.changedRows + " rows.";
          res.render('home',context);
        });
      }
    });
  });

  app.post('/insert',function(req,res,next){
  var context = {};
  pool.query("INSERT INTO workoutTable (`name`, `reps`, `weight`, `date`, `units`) VALUES (?, ?, ?, ?, ?)", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.units], function(err, result){
    if(err){
      next(err);
      return;
    }
    // context.results = "Inserted id " + result.insertId;
    // res.render('home',context);
    context.inserted = result.insertId;
    res.send(JSON.stringify(context));

  });
});


  app.get('/delete', function(req, res, next){
    var context = {};
    pool.query("DELETE FROM workoutTable WHERE id=?", [req.query.id], function(err, result){
        if(err) {
            next(err);
            return;
        }
        context.results = "Deleted " + result.changedRows + " rows.";
        res.send(context);
    });
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
