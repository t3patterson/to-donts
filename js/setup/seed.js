import Firebase from 'firebase'
import { ToDontMetaCollection, SingleToDontCollection } from '../collection/to-donts.js'
import { UsersCollection  } from '../collection/users.js'

var usersArr = [
  {email: "taco@x.com", password: "123", userName: "taco", location: "austin" },
  {email: "hi@ok.com",  password: "123", userName: "heythere", location: "houston" },
  {email: "niceguy@g.com", password: "123", userName: "nice", location: "dallas" },
]

var dontLists = [
  [ 
    {item: "more than 2 cups of coffee", avoided: false },
    {item: "call my ex", avoided: ""},
    {item: "gossip about how evil Mariah is", avoided: ""},
    {item: "no fried food at lunch", avoided: false },
    {item: "just one donut", avoided: ""},
    {item: "wake up after 10am", avoided: true},
  ],
  [ 
    {item: "undertip", avoided: true },
    {item: "pop knuckles", avoided: ""},
    {item: "eat red meat", avoided: true },
    {item: "go to bed after midnight", avoided: false},
  ],
  [ 
    {item: "leave car under oak tree", avoided: true},
    {item: "leave dishes in sink", avoided: false },
    {item: "respond late to messages", avoided: ""},
    {item: "leave umbrella at home", avoided: false},
  ],
]



export default function seedDB(fbRootURL){
  var ref = new Firebase(fbRootURL)

  ref.set({
    users: "",
    toDontObjects: ""
  })  

  seedData(ref, dontLists)
  
}


function seedData(rf, taskLists){
  

  var usersColl   = new UsersCollection()
  var dontDoMetaColl =  new DontDoMetaCollection()

  usersArr.forEach(function(userObj, usrInd){
    var fullUserData = userObj
    // 1) Create Registered Users 
    rf.createUser(fullUserData, function(err, uData){

      if (err) console.log("error:", err)
        else console.log("user-data:", uData)

        // Create Users in DB
        fullUserData.uid = uData.uid
        usersColl.create(fullUserData)

        // // create DontDo Obj in DB
        // var dontListObj = dontLists[ (dontLists.length - 1) % usrInd ]
        var dontListObj = { 
          uid:  uData.uid, 
          toDontList: "" 
        }

        dontDoMetaColl.create(dontListObj)

        var p = new Promise(function(resolve,reject){})


        setTimeout(function(){
          var queriedMetaColl = new DontDoMetaCollection(uData.uid);
          queriedMetaColl.fetch()
          queriedMetaColl.on('sync', function(){
             console.log('queriedMetaColl', queriedMetaColl.models[0])
             var dontDoMetaObjModel = queriedMetaColl.models[0]


             var singleDontDoColl = new SingleDontDoCollection( dontDoMetaObjModel.get('id') ) 

             console.log("endpoint", singleDontDoColl)
             
             var p = new Promise(function(resolve, reject){
               singleDontDoColl.fetch()

               singleDontDoColl.on('sync', function(){
                 resolve()
               })
             })

             p.then(function(){
               taskLists[usrInd].forEach(function(dntItm, i){
                  singleDontDoColl.create(dntItm)
               })
             })
             

          });
        },1000)

    })
  })
}
