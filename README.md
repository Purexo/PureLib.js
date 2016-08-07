# PureLib.js
It's a library with some javascript methods to help js developpement and DOM manipulation

## Why PureLib.js ?

It's a contraction of Purexo, Library and .js because it's javascript :3

## Import

```html
// recommanded
<script type="text/javascript" src="https://raw.githubusercontent.com/purexo/PureLib.js/master/dist/purelib-es5.min.js"></script>
or

// just if you want core and es6 components - need a really recent and modern browser (like Firefox)
<script type="text/javascript" src="https://raw.githubusercontent.com/purexo/PureLib.js/master/dist/purelib-es6.min.js"></script> 
or

// core + es5 + es6  - need a really recent and modern browser (like Firefox)
<script type="text/javascript" src="https://raw.githubusercontent.com/purexo/PureLib.js/master/dist/purelib-full.min.js"></script>
```

## What's in it ?

### Core (in ES5 for compatibility)
- `pl` function (a wrapper like jQuery) return generally a Collection - http://purexo.github.io/PureLib.js/global.html#plfunction
- `pl.Collection` Object extend Array - http://purexo.github.io/PureLib.js/pl.Collection.html
- `pl.fn` shortcut for pl.Collection.prototype (for append some functionnality) - http://purexo.github.io/PureLib.js/pl.fn.html
- `pl.Exception` Some Exceptions (you should handle or throws) - http://purexo.github.io/PureLib.js/pl.Exception.html

### es5
#### DOM
- `pl.flush` function - Remove all children's Element contain in a Collection - http://purexo.github.io/PureLib.js/pl.html#.flush
- `pl.fn.flush` children's Element contain in a current Collection - http://purexo.github.io/PureLib.js/pl.fn.html#~flush
- `pl.fn.append` - http://purexo.github.io/PureLib.js/pl.fn.html#~append
- `pl.fn.appendTo` - http://purexo.github.io/PureLib.js/pl.fn.html#~appendTo
- `pl.generate` - http://purexo.github.io/PureLib.js/pl.html#.generate

#### XHR
- `pl.getJSON` - http://purexo.github.io/PureLib.js/pl.html#.getJSON
- `pl.getXML` - http://purexo.github.io/PureLib.js/pl.html#.getXML
- `pl.getRAW` - http://purexo.github.io/PureLib.js/pl.html#.getRAW

#### utils
- `pl.each` - http://purexo.github.io/PureLib.js/pl.html#.each
- `pl.reMap` - http://purexo.github.io/PureLib.js/pl.html#.reMap
- `pl.map` - http://purexo.github.io/PureLib.js/pl.html#.map

#### storage
- `pl.LS` - Binding of LocalStorage API with ability to store any content (JSON encoded) - http://purexo.github.io/PureLib.js/pl.LS.html
- `pl.SS` - Binding of SessionStorage API with ability to store any content (JSON encoded) - http://purexo.github.io/PureLib.js/pl.SS.html

### ES6
#### utils
- `pl.asyncEach` - http://purexo.github.io/PureLib.js/pl.html#.asyncEach

## For more info
Look in [sources](https://github.com/purexo/PureLib.js/blob/master/PureLib.js/src) files and read commentary
