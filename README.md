# PureLib.js
It's a repository with some javascript methods to help js developpement

## Why PureLib.js ?

It's a contraction of Purexo and Library and .js because it's javascript :3

## Import

```html
<script type="text/javascript" src="https://raw.githubusercontent.com/purexo/PureLib.js/master/PureLib.js"></script>
```

## Include (prototype c style)
- void removeAllChildren(Element node)
- Element $(string query)
  - return Element with a query string (jQuery style)
- NodeList $$(string query)
  - return NodeList with a query string (jQuery style)
- Promise getJSON(url)
  - `getJSON('http://example.com/something.json').then(json => { console.log(json) });`
- Array<Element> nodeTreeGenerator(Object data, Element __parent)
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

## For more info
Look in [PureLib.js](https://github.com/purexo/PureLib.js/blob/master/PureLib.js) file and read commentary
