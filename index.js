/*------------------------------Backend part-----------------------------*/

var app=require('express')();
app.use(require('body-parser').json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
var config = require('./config/index.js');
var mongodb=require('mongodb');



/*                   Getting Document List                      */
app.get('/list',function(request,results){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/MarkDowns";
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;    
    db.collection("MarkDown").find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    var  resp=[];
    result.forEach(function(item,i,result){
        resp[i]=item.name;
                  });
    results.send(resp);
    db.close();
  });
}); 
}
       )
/*                      Loading Documents                        */
app.get('/load',function(request,results){
    if (request.query.fileName) // fileName is in query
    { 
        var FileName=request.query.fileName;
        var url = "mongodb://localhost:27017/MarkDowns";
        MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { name: FileName };
        db.collection("MarkDown").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        results.send(result);
        db.close();
  });
});
    }
    else results.send('Request has a mistake!');
   
}
)
/*                      Getting Main Page                       */
app.get('/', (request, results) => {
	results.sendfile(__dirname + '/index.html');
})

/*                  Saving Current Document                     */
app.post('/save',function(request,results){
    if (request.query.fileName) // fileName is in query
    { 
        var FileName=request.query.fileName;
        var url = "mongodb://localhost:27017/MarkDowns";
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var myobj = { name: FileName, text: request.body.content };
            db.collection("MarkDown").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log(FileName+" inserted");
            db.close();
  });
}); 
    }
    
    else results.send('Request has a mistake!');   
    //results.send('SAVE')
}
        
)

    }
    else results.send('Request has a mistake!');    
    //results.send('LOAD')
}
)

app.listen(3000, () => console.log(`Node JS is Started on ${config.port} successfully`));