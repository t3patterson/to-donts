import Firebase from 'firebase'

import BackboneFire from 'bbfire'


function testRef(r){
  console.log('======== ==== ====')
  console.log('==== testRef ====')
  r.on(
    'value', 
    function(s){ console.log("the--reff", s.val() ) },
    function(e){ console.log( e ) }
  )
}

export var DontDoModel = BackboneFire.Firebase.Model.extend({
  url: "",

  initialize: function(){
    this.url = "https://todo4u.firebaseio.com/toDontObjects/" + this._usr 
  }
})

export var ToDontMetaCollection = BackboneFire.Firebase.Collection.extend({
  autoSync: false,
  
  url: "",

  initialize: function(uid){
    //pass a uid to query
    var ref = new Firebase("https://todo4u.firebaseio.com/toDontObjects/")
    if (uid) { ref = ref.orderByChild('uid').equalTo(uid) }
    this.url = ref
    testRef(ref)
  }
})



export var SingleToDontCollection = BackboneFire.Firebase.Collection.extend({
  autoSync: true,
  
  url: "",
  parse: function(d){
    console.log(d)
  },

  initialize: function(fbId){
    console.log('time to get a singleDontDo')
    var ref = new Firebase("https://todo4u.firebaseio.com/toDontObjects/")
    this.url = ref.child(fbId).child("toDontList")
  }
})

  
  
// export var DontDoCollection = BackboneFire.Firebase.Collection.extend({
//   autoSync: true,
  
//   url: ""

//   initialize: function(u){
//     this.url = new Firebase("https://todo4u.firebaseio.com/dontDoObject/")
//   }
// })
  
