import BackboneFire from 'bbfire'
import React, {Component} from 'react'
import { DontDoCollection, DontDoModel } from '../collection/dont-do.js'
import NavView from './XX-nav-view.js'
import ToDontList from './XX-to-dont-list-view.js'

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
        <hr/>
      </main>
    )
  }
}