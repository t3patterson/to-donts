import React, {Component} from 'react'


export class ToDontList extends Component {
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
        <li key={dontItem.id}>
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