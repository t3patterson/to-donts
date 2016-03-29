import {DontDoCollection} from '../collection/dont-do.js'

export default function seedDB(){
  var taskList = [
    {item: "more than 2 cups of coffee", avoided: false },
    {item: "call my ex", avoided: ""},
    {item: "gossip about how evil Mariah is", avoided: ""},
    {item: "no fried food at lunch", avoided: false },
    {item: "just one donut", avoided: ""},
    {item: "wake up after 10am", avoided: true},
  ]

  var dontDoColl = new DontDoCollection()
  dontDoColl.on('sync', function(){
    dontDoColl.models.forEach( function(m){dontDoColl.remove(m) })
    taskList.forEach( (itm) =>  dontDoColl.add(itm) )
  })
}