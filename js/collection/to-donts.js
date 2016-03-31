import Firebase from 'firebase'

import BackboneFire from 'bbfire'

export var DontDoModel = BackboneFire.Firebase.Model.extend({
  url: "",

  initialize: function(){
    this.url = "https://todo4u.firebaseio.com/toDontObjects/" + this._usr 
  }
})

export var DontDoMetaCollection = BackboneFire.Firebase.Collection.extend({
  autoSync: false,
  
  url: "",

  initialize: function(uid){
    //pass a uid to query
    var ref = new Firebase("https://todo4u.firebaseio.com/toDontObjects/")
    if (uid) { ref = ref.orderByChild('uid').equalTo(uid) }
    this.url = ref
  }
})



export var SingleDontDoCollection = BackboneFire.Firebase.Collection.extend({
  autoSync: false,
  
  url: "",

  initialize: function(id){
    var ref = new Firebase("https://todo4u.firebaseio.com/toDontObjects/"+id)
    this.url = ref.child("toDontList")
  }
})

  
  
// export var DontDoCollection = BackboneFire.Firebase.Collection.extend({
//   autoSync: true,
  
//   url: ""

//   initialize: function(u){
//     this.url = new Firebase("https://todo4u.firebaseio.com/dontDoObject/")
//   }
// })
  
