import Firebase from 'firebase'
import {DontDoCollection} from '../collection/dont-do.js'

export default function seedDB(fbRootURL){
  var ref = new Firebase(fbRootURL)

  ref.set({
    users: ""
  })  

  seedUsers(ref)
  // seedUserDontDos(u)
}

function seedUserDontDos(u){
  var taskList = [
    {item: "more than 2 cups of coffee", avoided: false },
    {item: "call my ex", avoided: ""},
    {item: "gossip about how evil Mariah is", avoided: ""},
    {item: "no fried food at lunch", avoided: false },
    {item: "just one donut", avoided: ""},
    {item: "wake up after 10am", avoided: true},
  ]

  var dontDoColl = new DontDoCollection(u);

  dontDoColl.on('sync', function(){
    taskList.forEach( (itm) =>  dontDoColl.add(itm) )
  })  
}

function seedUsers(rf, tasks){
  var usersArr = [
    {email: "tacomeal@gmail.com", password: "123", dontDos: "" },
  ]

  // 1) 
  rf.createUser(usersArr[0], function(err, uData){
    if (err) console.log("error:", err)
      else console.log("user-data:", uData)
  })

}
