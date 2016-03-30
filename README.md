###BackboneFire
```js
  //1) Extend the collection to the ToDoCollection
  //----------- collection/dont-do.js 
  var TodoCollection = BackboneFire.Firebase.Collection.extend({
    url: "https://todo4u.firebaseio.com/"
  })

  //2) Create instance new TodoModel()
  //----------- router.js 
  //    NB: immediately triggers a 'fetch' and creates 
  //        an open connection thru web sockets to the db
  var bbFireInstance = new TodoCollection()


  //3) Pass the collection instance as props to the React Component
  //----------- router.js 
  DOM.render(
    <AppViewController fbColl={bbFireInstance}/>, 
    document.querySelector('.container') 
  )


  //4) Fetching Records for View (first-time and on db changes )

  //----------- app-view-controller.js : <AppViewController/>

  componentDidMount(){
      this.props.fbColl.on('sync update', function(d){
        console.log("SYNCED!")
        console.log(bbFireInstance.toJSON())
      })
  }
  //   ^^on componentDidMount(): collectionInstance.on('sync update') 
  //   'update' to handle fetched data and when data updates (fbColl.create)


  //5) Creating Records
  //----------- app-view-controller.js : <AppViewController/>
  _addItem(formEl){
    console.log('handling submit from AppView')
    var dontDoItm = document.getElementById('newTodo').value
    console.log(this.props.fbColl)
    
    this.props.fbColl.create({ avoided: "", item: dontDoItm })
  }
  //^^ note: make sure that you have .on('update') so that the listener picks up the change...'sync' event doesn't fire event though create successfully posts to db

  //6) Updating Records
  //----------- app-view-controller.js : <AppViewController/>
  _updateItem(itemId){

    var mdl = this.props.fbColl._byId[itemId]

    if (mdl.get('avoided') ){
      mdl.set({avoided: false})
    } else {
      mdl.set({avoided: true})
    }
  }

  //^^ triggers 'sync' event and is picked up by fbColl.on('sync')

  //7) Deleting Records
  //----------- app-view-controller.js : <AppViewController/>

  _deleteItem(itemId){
    console.log(itemId)
    var mdl = this.props.fbColl._byId[itemId]
    console.log(mdl)
    mdl.destroy();
  }

  //note, the callbacks looks like this---just passing in the item.id:
  <ToDontListView deleteItem_cb={this._deleteItem.bind(this)} ... />
  ...
  <ListItem>
    <i className="fa fa-2x fa-trash-o" onClick={this.props.deleteItem_cb.bind(this, dontItem.id)}  />
```