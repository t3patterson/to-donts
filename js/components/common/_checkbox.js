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
      return <i className="fa fa-2x fa-check" style={{color: "#1E824C"}}/>
    } else {
      return <i className="fa fa-2x fa-times" style={{color: "#96281B"}}/>
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