const functions = require('firebase-functions');
const firebase = require('firebase');
const config = {
    apiKey: "AIzaSyDwVIRVpAZpo6MCcnqXBIexV_tug34GhCc",
    authDomain: "ummproject-b4a9c.firebaseapp.com",
    databaseURL: "https://ummproject-b4a9c.firebaseio.com",
    projectId: "ummproject-b4a9c",
    storageBucket: "ummproject-b4a9c.appspot.com",
    messagingSenderId: "649849241088"
  };
firebase.initializeApp(config)
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

module.exports.getSearchText = functions.https.onRequest((req , res)=>{
  res.send("Hello")
})

module.exports.addNewSong = functions.https.onRequest((req , res)=>{

})
module.exports.addNewPorn = functions.https.onRequest((req , res)=>{
  if(typeof(req.query.name) === 'string'){
    firestore.collection('pornStars').add({
      name: req.query.name
    }).then(()=>{
      res.send("OK")
      return true
    }).catch(()=>{
      res.send("err")
    })
  }else if(typeof(req.query.name) !== 'string'){
    res.send("no Parameter")
  }
})
