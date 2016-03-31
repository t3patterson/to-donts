#Steps

###Authentication
*NOTE:* Not associated w/ the data in your application


###1) Configure your db for user-login and authentication
https://«yourapp».firebaseio.com/?page=Auth

###2) create a ref-object to your fb app
```js
var ref = new Firebase("https://«yourappp».firebaseio.com/")
```

###3) create a user w/ `ref.createUser()` and handle the response

```js
ref.createUser(
  {
    email: evt.currentTarget.email.value,
    password: evt.currentTarget.username.value
  }, function(err, u){
        
  }
)
```

###4) login the user w/ `ref.authWithPassword()`

```js
ref.authWithPassword({
    email: evt.currentTarget.email.value,
    password: evt.currentTarget.password.value
  },

  function(err, userData){
    if(err) console.log(err)
      else console.log('authenticated: ', userData)
  }
)
```


###Authorization
To secure this data: 
```js
  {
    "toDontObjects" : {
      "-KECYPx4ItmdUZMONp7E" : {
        "id" : "-KECYPx4ItmdUZMONp7E",
        "secrets" : "I heart u",
        "uid" : "ed2abf4f-dd3f-4e63-9c99-ca5842ff3ac6"
      },
      "-KECYPx4ItmdUZMONp7E" : {
        "id" : "-KECYPx4ItmdUZMONp7E",
        "secrets" : "I dont hart you u",
        "uid" : "3d26b84l-bb3-4e0x-9lza-f3ac842f6ca5"
      }
    }
  }
```

You must do this:
```js
{
    "rules": {
      ".write": true,
      ".read" : false,        
      "toDontObjects":{
        ".read" : "auth !== null",
        "$toDontKey":{
          ".read": "data.child('uid').val() === auth.uid"  
        }
      }
    }
}
```
