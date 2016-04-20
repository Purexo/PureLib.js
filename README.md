# PureLib.js
It's a repository with some javascript methods to help js developpement

## Why PureLib.js ?

It's a contraction of Purexo and Library and .js because it's javascript :3

## Import

```html
<script type="text/javascript" src="https://raw.githubusercontent.com/purexo/PureLib.js/master/PureLib.js"></script>
```

## Include (Typescript Style)
- foreach(data : Array | Object, callback(key : any, value : any))
- removeAllChildren(node : Element)
- $(query : String) : Element
  - return Element with a query string (jQuery style)
- $$(query : String) : Array<Element>
  - return NodeList with a query string (jQuery style)
- getJSON(url : String, callback(json : Object), method ? : String, data ? : Object)
  - `getJSON('http://example.com/something.json', function(json) {console.log(json);});`
- getXML(url : String, callback(xml : Object), method ? : String, data ? : Object)
  - `getXML('http://example.com/something.xml', function(xml) {console.log(xml);});`
- getRAW(url : String, callback(data : String), method : String, data : Object)
  - `getRAW('http://example.com/something.txt', function(data) {console.log(data);});`
- Array<Element> nodeTreeGenerator(data : Object, __parent : Element)
  - will create some DOM Elements and attach themselves 
  - `__parent` is optional, the DOMTreeElements will append to `__parent` if you set it

```javascript
data : {
  tag : ? string, // (It's the tagName, default 'div')
  attr : ? Array<{
    name : string, // (It's an Attribute Name, like className)
    value : string | any // ( It's what you put in your attribute, like 'member')
  }>,
  text : ? string, // (If you wan't put some text in your Element)
  in :  ? Array<Object data>
}
```

And binding of localStorage and sessionStorage API with support of object storage (with JSON conversion) :
- LS for LocalStorage
- SS for SessionStorage

## For more info
Look in [PureLib.js](https://github.com/purexo/PureLib.js/blob/master/PureLib.js) file and read commentary
