import React, {Component} from 'react'

export default class CheckBox extends Component {
  constructor(props){
    super(props)

  }

  toggleClick(){
    this.props.cb(this.props.itemId)
  }

  _getMark(checkStatus){
    if (checkStatus === "") { return '' }
    
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