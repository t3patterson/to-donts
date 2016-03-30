// export const utils = {}

// Handle Signup
function handleSignUp (evt){
  evt.preventDefault()

  // CREATE USER w/ FB-Auth
  ref.createUser(
    {
      email: evt.currentTarget.email.value,
      password: evt.currentTarget.username.value
    }, 
    function handleUserSignUp(err, uData){
      $('form input').value = ''

      if (err) console.log(err)
        else {
          console.log('new user---> ',  uData )
          var uColl = new UsersCollection();
          uColl.create({
            email:    evt.currentTarget.email.value,
            username: evt.currentTarget.username.value,
            location: evt.currentTarget.location.value,
            uid: uData.uid,
            secrets: {
              msg: evt.currentTarget.secret.value
            }
          })

          uColl.on('sync update', function(){
            console.log('UPDATE: last user -- ', uColl.models[uColl.length-1])
          })
        }
    }
  )
}

// Handle Login
_handleLogin: function(evt){
    evt.preventDefault()
    var view = this
    ref.authWithPassword({
        email: evt.currentTarget.email.value,
        password: evt.currentTarget.password.value
      },

      function(err, userData){
        if(err) console.log(err)
          else console.log('authenticated: ', userData)
      }
    )
  },


// Handle Changes in Auth-Status
 ref.onAuth(function(authData){
    if(authData){
      console.log('user SO authenticated -- ', authData)
      
      $('.logged-in-user').html(`
        <hr/>
        <button class='logout'>Logout</button>"
        <div>
          <pre>
            ${ JSON.stringify(authData.password,null,2) }
          </pre>
        </div>
      `)
    } else {
      console.log('user GONE bits'); $('.logged-in-user').html('')
    }
  })
}

// Handle Logout
_handleLogout: function(evt){
    console.log('logout!')
    ref.unauth()
  },
