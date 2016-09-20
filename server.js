var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var moment = require('moment');
var path = require('path');

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("Listening on port: " + port);
});


app.get('/', function (req, res) {
  res.render('index');
});

app.get('/:id',function(req,res){
  var myDate;
  if(/^\d{8,}$/.test(req.params.id)){
    myDate = moment(req.params.id, "X");
  } else{
    myDate = moment(req.params.id, "MMMM D, YYYY");
  }

  if(myDate.isValid()) {
    res.json({
        unix: Number(myDate.format("X")),
        natural: myDate.format("MMMM D, YYYY")
    });
  } else{
    res.json({
        unix: 'Null',
        natural: 'Null'
    });
  }

});

//View engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
