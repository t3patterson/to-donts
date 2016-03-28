
import React, {Component} from 'react'

export default class AppViewController extends Component {

  constructor(props){
    super(props)
    console.log('new component, yeah?')
  }

  render(){
    return(
      <main>
        <header>
          <h1>To Don't List</h1>
          <p><small>just don't fuck up and I promise you'll be okay</small></p>
        </header>
        <ToDontList/>
      </main>
    )
  }
}


class ToDontList extends Component {
  constructor(props){
    super(props)
    this.indexer = 0
    this.state = {
      tasks: [
        { _id: 1, item: "more than 2 cups of coffee", avoided: false },
        { _id: 2, item: "call my ex", avoided: true},
        { _id: 3, item: "gossip about how evil Mariah is", avoided: false},
        { _id: 4, item: "no fried food at lunch", avoided: false }
      ]
    }
  }

  _updateStatus(itemId){
    var founded = this.state.tasks.find( (t) => t._id === itemId )
    console.log(founded)

    var updatedTasks = this.state.tasks.map((t)=>{
      if ( founded._id !== t._id ) return t

      if (t.avoided){
        t.avoided = false
      } else {
        t.avoided = true
      }

      return t
    })

    this.setState({updatedTasks}) 
  }

  generateJSXList(arr, filter_fn){
    console.log(this.state.tasks)
    var jsxEls = arr.filter(filter_fn).map((dontItem, indx) => {
      return (
        <li key={indx}>
            <CheckBox cb={ this._updateStatus.bind(this) } isChecked={dontItem.avoided} itemId={dontItem._id} />
            <span className="avoided-item">{dontItem.item} </span>
        </li>
      )
    })

    return jsxEls
  }

  render(){
    return (
      <section>
        <h4>Successfully Avoided</h4>
        <ul>
          {this.generateJSXList(this.state.tasks, (t)=>{return t.avoided===true})}
        </ul>
        <hr/>
        <h4>Not Yet Avoided</h4>
        <ul>
          {this.generateJSXList(this.state.tasks, (t)=>{return t.avoided===false})}
        </ul>
        <hr/>
        <h4>Errthing</h4>
        <ul>
          {this.generateJSXList(this.state.tasks, (t)=>{return true})}
        </ul>
        <hr/>
      </section>
    )
  }
}

class CheckBox extends Component {
  constructor(props){
    super(props)

    this.state = { isChecked: this.props.isChecked }

    this.checkMark = () => { return <img src="./images/checkmark.svg" />} 
  }

  toggleClick(){
    this.props.cb(this.props.itemId)
  }

  render(){
    console.log('checked??', this.state.isChecked)
    return (
      <span className="avoided-checkbox" onClick={this.toggleClick.bind(this)}>
        <input type="checkbox"/>
        <span className="indicator">{ this.state.isChecked ? this.checkMark() : "" }</span>
      </span>
    )
  }
}