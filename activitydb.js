var mysql;
var con;
var sql;

var bodyParser = require('body-parser')

const express= require('express');

const app = new express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded(true));

connect_to_database();

function connect_to_database()
{   
   mysql = require('mysql');

   con = mysql.createConnection
    ({
          host: "localhost",
          user: "root",
          password: "",
          database : "life"
    });

   con.connect(function(err) 
   {
   if (err) throw err;    
   }
   );
}

app.get('/',function(req,res)
{
res.sendFile('C://Users/lenovo/Desktop/node/node_crud/activities.html');
});

app.get('/display',function(req,res)
{
con.query("select * from activities order by activitydate desc",function(err,result)
   {
            res.json(result);
   });
});

app.post('/add',function(req,res)
{
  res.send(addData(req.body.acdate,req.body.activity,req.body.timespent));
});

app.post('/update',function(req,res)
{
	res.send(upData(req.body.id,req.body.activity,req.body.timespent));
});

app.post('/del',function(req,res)
{
  console.log(req.body.id);
  var returnvalue=200;
  con.query("delete from activities where id="+req.body.id,function(err,result)
   {
            if (err)
              returnvalue=400; 
   });
  return returnvalue;
});

function upData(a,b,c)
{
   var returnvalue=200;
   con.query("update activities set activity='"+b+"', timespent="+c+" where id="+a+"",function(err,result)
   {
      if(err)
           returnvalue=400;
   });
return returnvalue;
}

function addData(a,b,c)
{
   var values = [[a,b,c]];
   var returnvalue=200;
   con.query("insert into activities(activitydate,activity,timespent) values ?",[values],function(err,result)
   {
      if(err)
          returnvalue=400;
   });
return returnvalue;
}


app.listen(3000)
