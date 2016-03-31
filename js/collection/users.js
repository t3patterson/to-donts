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

export var UserQueryModel = BackboneFire.Firebase.Model.extend({
  autoSync: false,
  _uid: "",

  url: "",
  
  initialize: function(uid){
    console.log('model iniitializEEDD!!!')
    var ref = new Firebase("https://todo4u.firebaseio.com/users")
    this.url = ref.orderByChild('uid').equalTo(uid)
  }
})

export var UserQueryColl = BackboneFire.Firebase.Collection.extend({
  autoSync: false,
  _uid: "",

  url: "",
  
  initialize: function(uid){
    console.log('model iniitializEEDD!!! -- ' + uid)
    var ref = new Firebase("https://todo4u.firebaseio.com/users/")
    this.url = ref.orderByChild('uid').equalTo(uid)
    testRef(ref)
  }
})

export var UsersCollection = BackboneFire.Firebase.Collection.extend({
  autoSync: true,
  _usr: "",
  
  url: function(){
    return "https://todo4u.firebaseio.com/users/"
  },

  initialize: function(){
    this.url = new Firebase("https://todo4u.firebaseio.com/users/")

  }
})
  

