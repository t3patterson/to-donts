import BackboneFire from 'bbfire'
import React, {Component} from 'react'
import {DontDoCollection, DontDoModel } from '../collection/dont-do.js'

var indexer = {
  val: 0
} 

export default class AppViewController extends Component {

  constructor(props){
    super(props)


    this.navOps = [   
        {label: "Successfully Avoided", "viewName": "yes-avoided"}, 
        {label: "Not Avoided", "viewName": "not-avoided"}, 
        {label: "Pending", "viewName": "pending"}, 
        {label: "All", "viewName": "all"}
    ]

    this.state = {
      tasks: this.props.fbColl.toJSON(),
      currentViewType: "all"
    }
  }



  _updateStatus(itemId){

    var mdl = this.props.fbColl._byId[itemId]

    if (mdl.get('avoided') ){
      mdl.set({avoided: false})
    } else {
      mdl.set({avoided: true})
    }

  }

  _navToView(selectedVal){
    this.setState({
      currentViewType: selectedVal
    })
  }


  componentDidMount(){
    this.props.fbColl.on('sync', function(){
      console.log('SYNC!')
      this.setState({
        tasks: this.props.fbColl.toJSON()
      })
    }.bind(this))
  }

  render(){
    return(
      <main>
        <header>
          <h1>To Don't List</h1>
          <p><small>just don't fuck up and I promise you'll be okay</small></p>
        </header>
        <NavView navOptions={this.navOps} navToView={this._navToView.bind(this) } currentViewType={this.state.currentViewType}/>
        <ToDontList updateStatus_cb={this._updateStatus.bind(this)} currentViewType={this.state.currentViewType} tasks={this.state.tasks}/>
      </main>
    )
  }
}

class NavView extends Component{
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


class ToDontList extends Component {
  constructor(props){
    super(props)
  }

  _generateJSXList(arr, viewType){

    var filter_fn = {
      "yes-avoided":  (itm) =>  itm.avoided === true,
      "not-avoided":  (itm) =>  itm.avoided === false && itm.avoided !== null,
      "pending"    :  (itm) =>  itm.avoided === null,
      "all"        :  (itm) =>  true 
    }

    var jsxEls = arr.filter(filter_fn[viewType]).map((dontItem, indx) => {
      return (
        <li key={indexer.val++}>
            <CheckBox cb={ this.props.updateStatus_cb } isChecked={dontItem.avoided} itemId={dontItem.id} />
            <span className="avoided-item">{dontItem.item} </span>
        </li>
      )
    })

    return jsxEls
  }

  render(){
    
    return (
      <section>
        <h4>{this.props.currentView}</h4>
        <ul>
          {this._generateJSXList(this.props.tasks, this.props.currentViewType) }
        </ul>
        <hr/>
      </section>
    )
  }
}

class CheckBox extends Component {
  constructor(props){
    super(props)

  }

  toggleClick(){
    this.props.cb(this.props.itemId)
  }

  _getMark(checkStatus){
    if (checkStatus === "") { console.log("nullllll"); return '' }
    
    if (checkStatus){
      return <img src="./images/checkmark.svg" />
    } else {
      return <img className="x-mark" src="./images/x-mark.svg"/>
    }
  }

  render(){
    var pendingCss = ''
    if ( this.props.isChecked === "" ){ pendingCss = 'is-pending' }
    return (
      <span className={"avoided-checkbox " + pendingCss } onClick={this.toggleClick.bind(this)}>
        <input type="checkbox"/>
        <span className="indicator">{ this._getMark(this.props.isChecked) }</span>
      </span>
    )
  }
}