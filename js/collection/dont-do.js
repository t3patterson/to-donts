import BackboneFire from 'bbfire'

export var DontDoModel = BackboneFire.Firebase.Model.extend({
  url: function(id){
    if (!id) id = 'dont-do.js'
    return "https://todo4u.firebaseio.com/"+id
  }
})

export var DontDoCollection = BackboneFire.Firebase.Collection.extend({
  autoSync: true,
  url: "https://todo4u.firebaseio.com/"
})

