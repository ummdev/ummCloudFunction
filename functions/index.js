const functions = require('firebase-functions');
const firebase = require('firebase');
const config = {
    apiKey: 'AIzaSyDwVIRVpAZpo6MCcnqXBIexV_tug34GhCc',
    authDomain: 'ummproject-b4a9c.firebaseapp.com',
    databaseURL: 'https://ummproject-b4a9c.firebaseio.com',
    projectId: 'ummproject-b4a9c',
    storageBucket: 'ummproject-b4a9c.appspot.com',
    messagingSenderId: '649849241088'
  };
firebase.initializeApp(config)
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
module.exports.getSuggestion = functions.https.onRequest((req , res)=>{
    const allPornStars = []
    firestore.collection('pornStars').get().then((data)=>{
      data.forEach((value)=>{
        allPornStars.push(value.data())
      })
      res.status(200).send(allPornStars)
      return
    }).catch(()=>{
      res.status(500).send("err")
    })
})
module.exports.addNewSound = functions.https.onRequest((req , res)=>{
  if(typeof(req.body.pornStarId) === 'string' && typeof(req.body.soundURL) === 'string'){
    firestore.collection('sounds').add({
      pornStarId: req.body.pornStarId,
      soundURL: req.body.soundURL
    }).then(()=>{
      res.status(200).send("added")
      return
    }).catch(()=>{
      res.status(500).send("Err")
    })
  }else if(typeof(req.body.pornStarId) !== 'string' || typeof(req.body.soundURL) !== 'string'){
    res.status(400).send('no parameter')
  }
})
module.exports.addNewPorn = functions.https.onRequest((req , res)=>{
  if(typeof(req.body.name) === 'string'){
    firestore.collection('pornStars').add({
      name: req.body.name.toLowerCase()
    }).then(()=>{
      res.status(200).send('OK')
      return true
    }).catch(()=>{
      res.status(500).send('err')
    })
  }else if(typeof(req.body.name) !== 'string'){
    res.status(400).send('no Parameter')
  }
})
