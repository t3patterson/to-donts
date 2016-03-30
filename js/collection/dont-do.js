import BackboneFire from 'bbfire'

export var DontDoModel = BackboneFire.Firebase.Model.extend({
  url: function(id){
    if (!id) id = 'dont-do.js'
    return "https://todo4u.firebaseio.com/dontDos/" + this._usr + "/dontDos/"+id
  },

  initialize: function(){
  }
})

export var DontDoCollection = BackboneFire.Firebase.Collection.extend({
  autoSync: true,
  _usr: "",
  
  url: function(){
    return "https://todo4u.firebaseio.com/" + this._usr + "/dontDos"
  },

  initialize: function(u){
    this._usr = u
  }

})
  
  
