var express = require('express')
var app = express()

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

var outlier = require('outlier');

var bodyParser = require('body-parser')
parasites = ['ну', 'ээ', 'дурак', 'тупой', 'дибил', 'сволоч'];

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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
  await dbo.dropCollection('profile')
  dbo.createCollection("profile", function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
    dbo.collection('profile').find().toArray(function (err, result) {
      if (err) throw err;
      if (!result.length) {
        dbo.collection('profile').insertMany(users, (err) => {
          if (err) throw err
          db.close()
          console.log("Profile: Collection created!");
        })
      }
    });
  });
});

MongoClient.connect(url, async function (err, db) {
  if (err) throw err;
  var dbo = null;
  dbo = db.db("mydb");
  // await dbo.dropCollection('profile')
  dbo.createCollection("vocabulary", function (err, res) {
    if (err) throw err;
    console.log("vocabulary: Collection created!");
  });
});


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

async function getVocabulary(profileId) {
  let { dbo, db } = await connectToMongo()
  let vocabulary = (await dbo.collection('vocabulary')
    .findOne({ profileId: profileId }));
  let newVocabulary = false;
  if (!vocabulary) {
    vocabulary = { profileId: profileId, word: {} };
    newVocabulary = true;
  }
  if (newVocabulary) {
    await dbo.collection('vocabulary').insertOne(vocabulary)
  } else {
    await dbo.collection('vocabulary').updateOne({ profileId: profileId }, { $set: vocabulary });
  }
  db.close();
  return vocabulary;
}

// datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
Date.dateDiff = function (datepart, fromdate, todate) {
  datepart = datepart.toLowerCase();
  var diff = todate - fromdate;
  var divideBy = {
    w: 604800000,
    d: 86400000,
    h: 3600000,
    n: 60000,
    s: 1000
  };

  return Math.floor(diff / divideBy[datepart]);
}

// #region requests
app.get('/', (req, res) => {
  res.send('смотри исходники в папке server')
})

app.get('/profile', async function (req, res) {
  let result = await getCurrentProfile(req)
  res.send(result)
})

app.get('/leaders', async function (req, res) {
  let { dbo, db } = await connectToMongo()
  dbo.collection('profile').find().limit(10).toArray((err, result) => {
    if (err) throw err
    db.close()
    let now = Date.now();
    res.send(result.map(profile => ({
      ...profile,
      badWordTimeDif: Date.dateDiff('s', new Date(profile.lastParasiteWordUsed), now)
    })))
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

app.get('/my-vocabulary-statistics', async (req, res) => {
  let profile = await getCurrentProfile();
  let vocabulary = await getVocabulary(profile.id);
  let allWords = Object.keys(vocabulary.word).map(key => ({ word: key, used: vocabulary.word[key] }));
  let allOutlier = allWords.filter(outlier('used'));
  return allOutlier;
})

app.post('/check-for-parasite', async (req, res) => {
  console.log(req.body.phrase)
  let newWords = req.body.phrase.split(' ').map(x => x.toLowerCase());
  let profile = await getCurrentProfile();
  let vocabulary = await getVocabulary(profile.id);
  let { dbo, db } = await connectToMongo()
  let words = vocabulary.word ? vocabulary.word : {};
  newWords.forEach((word) => {
    if (words[word]) {
      words[word]++;
    } else {
      words[word] = 1;
    }
  })
  await dbo.collection('vocabulary').updateOne({ profileId: profile.id }, { $set: { word: words } });

  let countParasites = 0;

  newWords.forEach(w => {
    if (w.includes('**') || parasites.includes(w)) {
      countParasites++;
    }
  })

  if (countParasites > 0) {
    await dbo.collection('profile').updateOne(
      { id: profile.id },
      {
        $set: {
          lastParasiteWordUsed: new Date(),
          daysWithout: {
            ...profile.daysWithout,
            parasiteWords: 0
          }
        }
      }
    )
  }

  db.close();

  console.log('count is: ', String(countParasites))
  res.send(String(countParasites));
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