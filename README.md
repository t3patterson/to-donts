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


//4) on componentDidMount(): collectionInstance.on('sync') to handle 
//   fetched data
//----------- app-view-controller.js : <AppViewController/>

componentDidMount(){
    this.props.fbColl.on('sync', function(d){
      console.log("SYNCED!")
      console.log(bbFireInstance.toJSON())
    })
}
//-------------------------------


//4) collectionInstance.on('sync') to handle fetched data
//----------- app-view-controller.js : <AppViewController/>


```



###Interesting Bug w/ The `keys`
```js
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
```


Since the generated `<li>` tags were all at the same 'level', the `indx` was not generating unique keys so the DOM diff was broken and the `<li>` tags were not reflecting state accurately

```js
var jsxEls = arr.filter(filter_fn).map((dontItem, indx) => {
  return (
    <li key={indx}> 
        
    </li>
  )
})
```

####Solution: Put an 'indexer' property on the component and increment
```js
this.indexer = 0

var jsxEls = arr.filter(filter_fn).map((dontItem, indx) => {
  return (
    <li key={indexer++}> 
        
    </li>
  )
})
```
