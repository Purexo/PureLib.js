/**
 * Itering on object or array.
 * 
 * Sample usage : 
 * var tab = {0: 5, 'bip': 'bep', 54: 'bip', 'bep': 89]}
 * foreach(tab, function(key, value) {
 *    console.log(key, ': ', value)
 * });
 * // will print something like
 * // 0: 5
 * // bip: bep
 * // 54: bip
 * 
 * @param data : Array | Object
 * @param callback : function
 * */
function foreach (data, callback) {
	var data_length = data.length;
	if (data_length) {
		for (var i = 0; i < data_length; i++) {
			callback(i, data[i]);
		}
	} else {
		for (var key in data) {
			callback(key, data[key]);
		}
	}
}

/**
* === Gestion DOM ===
* @author : Taken from https://stackoverflow.com/questions/683366/remove-all-the-children-dom-elements-in-div
* @param node : Dom Element where you want delete all children node
*/
function removeAllChildren(node){
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

/**
* @author Purexo <contact@purexo.eu>
* A selector System like jquery with native javascript
* Short alias for document.querySelector and querySelectorAll
* @param query : <string> It's the query string, same as CSS
* usage :
*   let nodes = $$('.test') return all elements who have class test atributes
*   let node  = $('#test') return first element who have id test atributes
*/
function $(query) { return document.querySelector(query); }
function $$(query) { return document.querySelectorAll(query); }

/**
* @author : Purexo <contact@purexo.eu>
* A NodeTreeGenerator
* @param data : Array : tab of object with (all optional) attributes :
*   - tag : HTML tag : string => document.createElement(data.tag). (default = div)
*   - attr : tab of object with attributes :
*     - name : string
*     - value : any (prefer string)
*     - el[data.attr[i].name] = value (if name is className =>) el.className = value
*   - text : string. put un current node as textNode el.appendChild(document.createTextNode())
*   - in : tab of object like data (Yeah It's recursive, obvious to make some tree)
*
* @param __parent : Element : optional and usefull for recursion
*   nodeTreeGenerator will attach your created DOM to __parent element
*
* @return elements : Array of generated nodes

  Example :
  var els = nodeTreeGenerator([
    {
      tag: 'div',
      attr: [
        {
          name: 'className',
          value: 'test'
        }
      ],
      in: [
        {
          tag: 'p',
          text: 'Helo'
        }
      ]
    }
  ]);
  document.body.appendChild(els);
  document.body.innerHTML =>
  <div class="test">
    <p>Helo</p>
  </div>
*/
function nodeTreeGenerator(data, __parent) {
  var data_length = data.length;
  var elements = [];
  for (var i = 0; i < data_length; i++) {
    var item = data[i];
    if (!item.tag) item.tag = 'div';
    var element = document.createElement(item.tag);
    
    if (item.attr && item.attr.length) {
      var attr_length = item.attr.length;
      for (var j = 0; j < attr_length; j++) {
        var attr = item.attr[j];
        element[attr.name] = attr.value
      }
    }
    
    if (item.text) {
      var nodeText = document.createTextNode(item.text)
      element.appendChild(nodeText);
    }
    
    if (item.in && item.in.length) {
      nodeTreeGenerator(item.in, element)
    }
    
    if (__parent) {
      __parent.appendChild(element)
    }
    
    elements[i] = element;
  }
  
  return elements
}

/**
* Author : Purexo
* simply handle xhr request with json content
* @param url : string, content url you want fetch
* @param callback : function(result), your callback to handle result of your request
* @param method : Optional, string, http method (GET POST PUT ...)
* @param data : Optional, any, data you want give to the send (XMLHttpRequest.send) method
*/
var getJSON = function(url, callback, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(method ? method : 'get', url, true);

    xhr.onreadystatechange = function (aEvt) {
        if (xhr.readyState == 4) {
          if (xhr.status == 200)
            callback(JSON.parse(xhr.responseText));
        }
    }
    
    xhr.send(data ? data : null);
}

/**
* Author : Purexo
* simply handle xhr request with xml content
* @param url : string, content url you want fetch
* @param callback : function(result), your callback to handle result of your request
* @param method : string, http method (GET POST PUT ...)
* @param data : any, data you want give to the send (XMLHttpRequest.send) method
*/
function getXML(url, callback, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('text/xml');
    xhr.open(method ? method : 'GET', url, true);
    xhr.onreadystatechange = function (aEvt) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200)
                callback(xhr.responseXML);
        }
    }
    xhr.send(data ? data : null);
}
/**
* Author : Purexo
* simply handle xhr request with json content
* @param url : string, content url you want fetch
* @param callback : function(result), your callback to handle result of your request
* @param method : Optional, string, http method (GET POST PUT ...)
* @param data : Optional, any, data you want give to the send (XMLHttpRequest.send) method
*/
var getRAW = function(url, callback, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(method ? method : 'get', url, true);

    xhr.onreadystatechange = function (aEvt) {
        if (xhr.readyState == 4) {
          if (xhr.status == 200)
            callback(xhr.responseText);
        }
    }
    
    xhr.send(data ? data : null);
}
