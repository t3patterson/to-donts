import BackboneFire from 'bbfire'
import React, {Component} from 'react'
import { DontDoCollection, DontDoModel } from '../collection/dont-do.js'

import NavView from './XX-nav-view.js'
import ToDontListView from './XX-to-dont-list-view.js'
import AddDontView from './XX-add-dont-view.js'

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
      currentViewType: "all",
      user: ''
    }
  }

  _navToView(selectedVal){
    this.setState({
      currentViewType: selectedVal
    })
  }

  _updateItem(itemId, action){
    console.log(arguments)
    var mdl = this.props.fbColl._byId[itemId]

    console.log(action)

    switch(action){
      case "set-null":
        console.log("SET NULL!!")
        mdl.set({avoided: ""})
        break;
      case "set-boolean":
        if (mdl.get('avoided') ){
          mdl.set({avoided: false})
        } else {
          mdl.set({avoided: true})
        }
        break;
      default:
        console.log('nothign happens')
    }
    
  }

  _addItem(formEl){
    console.log('handling submit from AppView')
    var dontDoItm = document.getElementById('newTodo').value
    console.log(this.props.fbColl)
    
    this.props.fbColl.create({ avoided: "", item: dontDoItm })
  }

  _deleteItem(itemId){
    console.log(itemId)
    var mdl = this.props.fbColl._byId[itemId]
    console.log(mdl)
    mdl.destroy();
  }



  componentDidMount(){
    this.props.fbColl.on('sync update', function(){
      this.props.fbColl.autoSync = true
      console.log('SYNC!')
      this.setState({
        tasks: this.props.fbColl.toJSON()
      })
    }.bind(this))

    this.props.fbUserData.on('sync', function(){
      var usrModel = this.props.fbUserData.models[0]
      console.log('user data in REACT', usrModel )
      this.setState({
        user: usrModel.get('userName')
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
        <h3 className="greeting">Welcome <span className="hilite">{this.state.user}</span> </h3>
        <NavView navOptions={this.navOps} navToView={this._navToView.bind(this) } currentViewType={this.state.currentViewType}/>
        <ToDontListView deleteItem_cb={this._deleteItem.bind(this)} updateStatus_cb={this._updateItem.bind(this)} currentViewType={this.state.currentViewType} tasks={this.state.tasks}/>
        <hr/>
        <AddDontView handleSubmit={this._addItem.bind(this)} />

      </main>
    )
  }
}