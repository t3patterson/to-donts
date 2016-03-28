import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import React from 'react'
import DOM from 'react-dom'

import AppViewController from '../components/app-view-controller.js'


var AppRouter = Backbone.Router.extend({
  routes: {
    "*path": "showDefault"
  },

  showDefault: function(){
    console.log('HELLLOOO')
    DOM.render(<AppViewController/>, document.querySelector('.container'))
  },

  initialize: function(){
    console.log('..app routing..')
    Backbone.history.start()
  }
})

export default AppRouter
