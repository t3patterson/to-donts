import React, {Component} from 'react'
import CheckBox from './common/_checkbox.js'

export default class ToDontList extends Component {
  constructor(props){
    super(props)
  }

  _generateJSXList(arr, viewType){

    var filter_fn = {
      "yes-avoided":  (itm) =>  itm.avoided === true,
      "not-avoided":  (itm) =>  itm.avoided === false && itm.avoided !== "",
      "pending"    :  (itm) =>  itm.avoided === "",
      "all"        :  (itm) =>  true 
    }

    var jsxEls = arr.filter(filter_fn[viewType]).map((dontItem, indx) => {
      return (
        <li key={dontItem.id}>
            <CheckBox cb={ this.props.updateStatus_cb } isChecked={dontItem.avoided} itemId={dontItem.id} />
            <span className="avoided-item">{dontItem.item} </span>
            <span className="item-ops">
              <i className="fa fa-2x fa-trash-o" onClick={this.props.deleteItem_cb.bind(this, dontItem.id)}  />
              <i className="fa fa-2x fa-refresh" onClick={this.props.updateStatus_cb.bind(this, dontItem.id, "set-null") }/>
            </span>
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
      </section>
    )
  }
}