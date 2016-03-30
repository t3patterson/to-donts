import BackboneFire from 'bbfire'

export var UserModel = BackboneFire.Firebase.Model.extend({
  url: function(id){

    return "https://todo4u.firebaseio.com/users/" + this.id
  },
  
  initialize: function(id){
    this.id = id
  }
})

export var UsersCollection = BackboneFire.Firebase.Collection.extend({
  autoSync: true,
  _usr: "",
  
  url: function(){
    return "https://todo4u.firebaseio.com/users/"
  },

  initialize: function(){
  }

})
  
  
