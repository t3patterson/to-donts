import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import React from 'react'
import DOM from 'react-dom'

import Firebase from 'firebase'
const fireBaseURL = "https://todo4u.firebaseio.com/"
var ref = new Firebase(fireBaseURL)

import AppViewController from '../components/app-view-controller.js'
import AuthViewController from '../components/app-view-controller.js'

import {ToDontMetaCollection, SingleToDontCollection } from '../collection/to-donts.js'
import {UsersCollection, UserQueryColl, UserQueryModel} from    '../collection/users.js'


var authenticatedUserSecrets = null

var AppRouter = Backbone.Router.extend({
  routes: {
    "login-test" : "loginTest",
    "signup-test": "signupTest",
    "*path": "showDefault"
  },

  showDefault: function(){
    console.log('def')

    if(!authenticatedUserSecrets) {
      this.navigate("login-test", {trigger: true}); 
      return 
    }

    var idKey = authenticatedUserSecrets.id

    var toDontColl = new SingleToDontCollection(idKey);
    var userColl = new UserQueryColl(authenticatedUserSecrets.get('uid'))

    userColl.fetch()

    DOM.render(<AppViewController fbUserData={userColl} fbColl={toDontColl}/>, document.querySelector('.container'))
  },

  signupTest: function(){

    console.log('so many seedds')
    // seedDB(fireBaseURL)

    var loginView = new SignUpView()
    loginView.render();
  },

  loginTest: function(){
    // seedDB(fireBaseURL)

    var loginView = new LoginView()
    // loginView.render();
  },



  initialize: function(){
    console.log('..app routing..')
    Backbone.history.start()
  }
})

var SignUpView = Backbone.View.extend({
  el: '.container',

  events: {
    "submit form.signup": "_handleSignUp"
  },

  //////////////////////
  _HTML_signup: function(){
      return `
        <h5>Sign Up </h5>

        <form class="signup">
          <input type="text"    placeholder="email"    id="email" ></br>
          <input type="passord" placeholder="password" id="password" ></br>
          <input type="text"    placeholder="username" id="username" ></br>
          <input type="text"    placeholder="location" id="location" ></br>
          <input type="text"    placeholder="secret message" id="secret" style="background: yellow"></br>
          <input type="submit" value="+">
        </form>
      `
  },
  //////////////////////

  _handleSignUp: function(evt){
    evt.preventDefault()

    // CREATE USER w/ FB-Auth
    ref.createUser(
      {
        email: evt.currentTarget.email.value,
        password: evt.currentTarget.password.value
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

  },

  _HTML_authenticatedUserInfo: function(){
  },


  render: function(){
    this.el.innerHTML = this._HTML_signup() + "<hr/>" 
  }
})

var LoginView = Backbone.View.extend({
  el: '.container',
  events: {
    "submit form.login": "_handleLogin",
    "click .logout" : "_handleLogout"
  },

  _htmlTemplate: function(){
    return `
      <h3>Authenticate</h3>

      <h5>Login</h5>
      <form class="login">
        <input type='text'id="email"></br>
        <input type='text' id="password"></br>
        <input type='submit' value="login">
      </form>
      <div class='logged-in-user'>
      </div>
    `
  },

  _handleLogin: function(evt){
    evt.preventDefault()
    var view = this
    ref.authWithPassword({
        email: evt.currentTarget.email.value,
        password: evt.currentTarget.password.value
      },

      function(err, userData){
        if(err) console.log(err)
          else  console.log('authenticated.....') 
      }
    )

   
  },

  _handleLogout: function(evt){
    console.log('logout!')
    ref.unauth()
  },

  render: function(){
    this.el.innerHTML = this._htmlTemplate()
  },

  initialize: function(){
    console.log('listening for hte auth:')
    var view = this

    this.render()

    ref.onAuth(function(authData){

      if(authData){
        console.log('user SO authenticated -- ', authData)
       


        // AWESOME 
        var userSecretColl = new ToDontMetaCollection( authData.uid );
        userSecretColl.fetch()
        userSecretColl.on("sync", function(){
          console.log("all the users secrets: ", userSecretColl.models[0])
          authenticatedUserSecrets = userSecretColl.models[0]
          window.location.hash= ''
        })
  
        // ALTERNATIVE PROMISE
        // var getUserByUid = function(uid){
        //   return new Promise(function(resolve, reject){
        //     var usr = new UserQueryColl(uid);
        //     usr.fetch();
        //     console.log('fetchingg....', uid)        
        //     usr.on('sync', function(){
        //       console.log('teh FOUND collection', usr.models[0] )
        //       resolve(uid)
        //     })
        //   })
        // }

        // getUserByUid(authData.uid).then(function(usrObj){
        //   console.log('promised usr', usrObj.id)
        //   var userSecretColl = new DontDoMetaCollection(usrObj.get('uid') );
        //   userSecretColl.fetch()
        //   userSecretColl.on("sync", function(){
        //     console.log("all the users secrets: ", userSecretColl)
        //   })

        // })

   


      

        
        $('.logged-in-user').html(`
          <hr/>
          <button class='logout'>Logout</button>
          <div>
            <div style="background: lightgreen">
                secrets here
            </div>
          </div>
        `)
      } else {
        console.log('user GONE bits'); $('.logged-in-user').html('')
      }
    })
  }

})



export default AppRouter
