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
* @param data : tab of object with (all optional) attributes :
*   - tag : HTML tag : string => document.createElement(data.tag). (default = div)
*   - attr : tab of object with attributes :
*     - name : string
*     - value : any (prefer string)
*     - el[data.attr[i].name] = value (if name is className =>) el.className = value
*   - text : string. put un current node as textNode el.appendChild(document.createTextNode())
*   - in : tab of object like data (Yeah It's recursive, obvious to make some tree)
*
* @param __parent : element : optional and usefull for recursion
*   nodeTreeGenerator will attach your created DOM to __parent element
*
* @return elements : it's a tab with the generated nodes

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
* http://stackoverflow.com/a/24587512
*/
var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};
