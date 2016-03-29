import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import React from 'react'
import DOM from 'react-dom'

import AppViewController from '../components/app-view-controller.js'
import {DontDoCollection, DontDoModel } from '../collection/dont-do.js'

var AppRouter = Backbone.Router.extend({
  routes: {
    "*path": "showDefault"
  },

  showDefault: function(){
    var dontDoColl = new DontDoCollection();
    console.log(AppViewController)
    DOM.render(<AppViewController fbColl={dontDoColl}/>, document.querySelector('.container'))
  },

  initialize: function(){
    console.log('..app routing..')
    Backbone.history.start()
  }
})

export default AppRouter
