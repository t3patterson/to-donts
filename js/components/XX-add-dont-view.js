import React, {Component} from 'react'

export default class AddDontView extends Component{
  constructor(props){
    super(props)
  }

  _handleSubmit(e){
    e.preventDefault();
    this.props.handleSubmit(e.target)
  }

  render(){
    return (
      <form className="make-dont" onSubmit={this._handleSubmit.bind(this)}>
        <input type="text" id={"newTodo"} placeholder={"don't do this"}/>
        <input type="submit" value="+"/>
      </form>
    )
  }
}