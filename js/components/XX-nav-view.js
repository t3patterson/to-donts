import React, {Component} from 'react'

export default class NavView extends Component{
  constructor(props){
    super(props)
  }

  _generateButtonsJSX(navList, currentView){
    return navList.map(function(navBtn, ik){ 
      var btnClass = ''
      // console.log('view is...', currentView)
      // console.log('button says...', navBtn.viewName, navList)


      if (currentView === navBtn.viewName ){btnClass = "selected"}

      return <button key={ik} onClick={this.props.navToView.bind(this, navBtn.viewName)} className={btnClass}> {navBtn.label} </button>
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