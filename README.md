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