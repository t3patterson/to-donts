import BackboneFire from 'bbfire'
import React, {Component} from 'react'
import {DontDoCollection, DontDoModel } from '../collection/dont-do.js'

export class NavView extends Component{
  constructor(props){
    super(props)
  }

  _generateButtonsJSX(navList, currentView){
    return navList.map(function(navBtn){ 
      var btnClass = ''
      // console.log('view is...', currentView)
      // console.log('button says...', navBtn.viewName, navList)


      if (currentView === navBtn.viewName ){btnClass = "selected"}

      return <button key={indexer.val++} onClick={this.props.navToView.bind(this, navBtn.viewName)} className={btnClass}> {navBtn.label} </button>
    }.bind(this))
  }

  render(){
    return (
      <nav>
        { this._generateButtonsJSX(this.props.navOptions, this.props.currentViewType) }
      </nav>
    )
  }
}