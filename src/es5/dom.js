(function () {

  /* test */ 

  /**
   * Flush all children's Element of the Collection
   * @see https://stackoverflow.com/questions/683366/remove-all-the-children-dom-elements-in-div (inspired from)
   * 
   * @author Purexo <contact@purexo.mom>
   * @function flush
   * @memberof pl
   * @static
   * @param {Collection} collection - collection (from pl())
   */
  pl.flush = function flush(collection) {
    if (!(collection instanceof pl.Collection)) {
      throw new pl.Exception.NotCollectionException('collection should be an Collection', collection);
    }

    collection.flush();
  };

  /**
   * Flush all children of Element in this Collection
   * @function flush
   * @memberof pl.fn
   * @inner
   * @this Collection
   */
  pl.fn.flush = function flush() {
    this.forEach(function (element) {
      while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
      }
    });
  }

  /**
   * Append each Element of collection to Each Element of this
   * @function append
   * @memberof pl.fn
   * @inner
   * @param {Collection} collection
   * @this Collection
   */
  pl.fn.append = function collectionAppend(collection) {
    this.forEach(function (parent) {
      collection.forEach(function (element) {
        parent.appendChild(element);
      });
    });
  }

  /**
   * Append each Element of this to Each Element of collection
   * @function append
   * @memberof pl.fn
   * @inner
   * @param {Collection} collection
   * @this Collection
   */
  pl.fn.appendTo = function collectionAppendTo(collection) {
    this.forEach(function (element) {
      collection.forEach(function (parent) {
        parent.appendChild(element);
      });
    });
  }

  /**
   * Attribute is a property of NodeTree to set attribute to the tag
   * @see NodeTree
   * 
   * @author Purexo <contact@purexo.mom>
   * 
   * @typedef {Object} Attribute
   * @property {string} name
   * @property {string} value
   * 
   * @example 
   * {name: 'foo', value: 'bar'} -> <tag foo="bar">
   */

  /**
   * NodeTree is an Object with some property for generating properly an Element
   * 
   * @author Purexo <contact@purexo.mom>
   * 
   * @typedef {Object} NodeTree
   * @property {string} [tag=div] - a valid DOM tag name
   * @property {string} [text] - text string to insert in your tag
   * @property {Attribute[]} [attr] - text string to insert in your tag
   * @property {NodeTree} [in] - recursive structure (obvious for a tree generator isn't it ?)
   * 
   * @example 
   * {} -> <div></div>
   * 
   * {
   *  tag: 'p',
   *  text: 'Hello World',
   *  attr: [
   *    {name: 'className', value: 'foo bar'},
   *    {name: 'data-foo', value: 'bar'}
   *  ],
   *  in: [
   *    {},
   *    {
   *      tag: p,
   *      text: 'Inner Hello World'
   *    }
   *  ]
   * } -->
   * <p class="foo bar" data-foo="bar">
   *  Hello World<div></div>
   *  <p>Inner Hello World</p>
   * </p>
   */

  /**
   * Will generate some DOM and eventually apend to an Element
   * 
   * @author Purexo <contact@purexo.mom>
   * 
   * @function generate
   * @memberof pl
   * @param {NodeTree[]} nodeTreeArray - Array of NodeTree
   * @see NodeTree
   * @param {Collection} [__parent] - if precise, each NodeTree of nodeTreeArray will be appended to him
   * @returns {Collection}
   * @throws {pl.Exception.NotArrayException|pl.Exception.NotStringException|pl.Exception.NotElementException}
   * 
   * @example 
   * pl.generate([{}])
   *  // return [<div></div>]
   * 
   * pl.generate([{
   *  tag: 'p',
   *  text: 'Hello World',
   *  attr: [
   *    {name: 'className', value: 'foo bar'},
   *    {name: 'data-foo', value: 'bar'}
   *  ],
   *  in: [
   *    {},
   *    {
   *      tag: span,
   *      text: 'Inner Hello World'
   *    }
   *  ]
   * }], pl('#test'))
   * 
   * // return
   * // <p class="foo bar" data-foo="bar">
   * //   Hello World
   * //   <div></div>
   * //   <span>Inner Hello World</span>
   * // </p>
   * 
   * // will update Element with id test
   * // <div id="test">
   * //   <\!-- already present content -->
   * //   <p class="foo bar" data-foo="bar">
   * //     Hello World
   * //     <div></div>
   * //     <span>Inner Hello World</span>
   * //   </p>
   * // </div>
   */
  function nodeTreeGenerator(nodeTreeArray, __parent) {
    if (!Array.isArray(nodeTreeArray)) {
      throw new pl.Exception.NotArrayException('you should put your NodeTree in an Array', nodeTreeArray);
    }

    var node_tree_length = nodeTreeArray.length;
    var elements = new pl.Collection();
    for (var i = 0; i < node_tree_length; i++) {
      var item = nodeTreeArray[i];
      if (!item.tag) item.tag = 'div';
      var element = document.createElement(item.tag);

      if (item.attr) {
        if (!Array.isArray(item.attr)) {
          throw new pl.Exception.NotArrayException(undefined, item.attr);
        }

        var attr_length = item.attr.length;
        for (var j = 0; j < attr_length; j++) {
          var attr = item.attr[j];
          if (attr.name != 'className') {
            element.setAttribute(attr.name, attr - value);
          }
          element[attr.name] = attr.value;
        }
      }

      if (item.text) {
        if (typeof item.text != 'string') {
          throw new pl.Exception.NotStringException(undefined, item.text);
        }

        var nodeText = document.createTextNode(item.text);
        element.appendChild(nodeText);
      }

      if (item.in) {
        if (!Array.isArray(item.in)) {
          throw new pl.Exception.NotArrayException(undefined, item.in);
        }

        nodeTreeGenerator(item.in, element);
      }

      if (__parent) {
        if (!(__parent instanceof Collection)) {
          throw new pl.Exception.NotCollectionException(undefined, __parent);
        }

        __parent.append(element);
      }

      elements[i] = element;
    }

    return elements;
  }
  pl.generate = nodeTreeGenerator;
})();