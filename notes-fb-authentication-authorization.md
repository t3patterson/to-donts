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
