var express = require('express')
var app = express()

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

const users = require('./defaultUsers.js').users

function connectToMongo() {
  return new Promise((resolve, error) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = null;
      dbo = db.db("mydb");
      resolve({
        dbo,
        db
      })
    })
  })
}

MongoClient.connect(url, async function (err, db) {
  if (err) throw err;
  var dbo = null;
  dbo = db.db("mydb");
  // await dbo.dropCollection('profile')
  dbo.createCollection("profile", function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
    dbo.collection('profile').find({ name: 'Artsiom' }).toArray(function (err, result) {
      if (err) throw err;
      if (!result.length) {
        dbo.collection('profile').insertMany(users, (err) => {
          if (err) throw err
          db.close()
        })
      }
    });
  });
});

// #region requests
app.get('/', (req, res) => {
  res.send('смотри исходники в папке сервер')
})

function getCurrentProfile(req) {
  return new Promise(async (resolve, reject) => {
    let { dbo, db } = await connectToMongo()
    dbo.collection('profile').findOne({}, (err, result) => {
      if (err) throw err
      db.close()
      resolve(result)
    })
  })
}

app.get('/profile', async function (req, res) {
  let result = await getCurrentProfile(req)
  res.send(result)
})

app.get('/leaders', async function (req, res) {
  let { dbo, db } = await connectToMongo()
  dbo.collection('profile').find().limit(10).toArray((err, result) => {
    if (err) throw err
    db.close()
    res.send(result)
  })
})

app.post('/profile', async (req, res) => {
  let { dbo, db } = await connectToMongo()
  dbo.collection('profile').insertOne(req.body.profile, (err) => {
    if (err) throw err
    db.close()
    res.send('ok')
  })
})

app.post('/add-parasite-word', async (req, res) => {
  let current = await getCurrentProfile(req)
  let { dbo, db } = await connectToMongo()
  dbo.collection('profile').updateOne({ id: current.id }, {
    $set: {
      daysWithout: {
        ...current.daysWithout,
        parasiteWords: 0
      },
      lastParasiteWordUsed: new Date()
    }
  }, (err) => {
    if (err) throw err
    db.close()
    res.send('ok')
  })
})

// #endregion 

try {
  let port = Number(process.argv[process.argv.length - 1])
  port = port ? port : 6969

  var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
  })
}
catch (err) {
  console.log(err)
}