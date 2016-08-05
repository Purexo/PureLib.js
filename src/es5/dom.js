/**
 * PureLib.js modular
 * @namespace pl
 */
pl = pl || {};

(function () {
  // Polyfill
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/isArray
  if (!Array.isArray) {
    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }

  /**
   * Get the first finded Element matched with selector or null if nothing match
   * 
   * @function $
   * @memberof pl
   * @param {string} selector - CSS selector
   * @return {Element|null}
   */
  pl.$ = document.querySelector.bind(document);

  /**
   * Get all matching Element with selector in NodeList format if you need it for any reason
   * 
   * @function $$_
   * @memberof pl
   * @param {string} selector - CSS selector
   * @return {NodeList}
   */
  pl.$$_ = document.querySelectorAll.bind(document);

  /**
   * Get all matching Element with selector in an Array (a bit less perfom), we can't call forEach on NodeList :(
   * 
   * @author Purexo <contact@purexo.mom>
   * @function $$
   * @memberof pl
   * @param {string} selector - CSS selector
   * @return {Element[]} all matching Element with selector
   */
  pl.$$ = function (selector) {
    var res = [];
    var nl = document.querySelectorAll(selector);

    // http://stackoverflow.com/a/15144269
    // generate Array from NodeList
    for (var i = -1, l = nl.length; ++i !== l; res[i] = nl[i]);

    return res;
  };

  /**
   * @namespace pl.exceptions
   */
  var exceptions = {
    /**
     * @author Purexo <contact@purexo.mom>
     * 
     * @class pl.exceptions.NotArrayException
     * @property {string} name - name of Exception
     * @property {string} message - message of Exception
     * @property {*} context - the incorrect object
     * @param {string} message - message of Exception
     * @param {*} context - the incorrect object
     */
    NotArrayException: function NotArrayException(message, context) {
      this.name = 'NotArrayException';
      this.message = message;
      this.context = context;
    },
    /**
     * @author Purexo <contact@purexo.mom>
     * 
     * @class pl.exceptions.NotElementException
     * @property {string} name - name of Exception
     * @property {string} message - message of Exception
     * @property {*} context - the incorrect object
     * @param {string} message - message of Exception
     * @param {*} context - the incorrect object
     */
    NotElementException: function NotElementException(message, context) {
      this.name = 'NotElementException';
      this.message = message;
      this.context = context;
    },
    /**
     * @author Purexo <contact@purexo.mom>
     * 
     * @class pl.exceptions.NotStringException
     * @property {string} name - name of Exception
     * @property {string} message - message of Exception
     * @property {*} context - the incorrect object
     * @param {string} message - message of Exception
     * @param {*} context - the incorrect object
     */
    NotStringException: function NotStringException(message, context) {
      this.name = 'NotStringException';
      this.message = message;
      this.context = context;
    }
  };
  pl.exceptions = pl.exceptions || {};
  Object.assign(pl.exceptions, exceptions);

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
   * @function nodeTreeGenerator
   * @memberof pl
   * @param {NodeTree[]} nodeTreeArray - Array of NodeTree
   * @see NodeTree
   * @param {Element} [__parent] - if precise, each NodeTree of nodeTreeArray will be appended to him
   * @returns {Element[]}
   * @throws {pl.exceptions.NotArrayException|pl.exceptions.NotStringException|pl.exceptions.NotElementException}
   * 
   * @example 
   * pl.nodeTreeGenerator([{}])
   *  // return [<div></div>]
   * 
   * pl.nodeTreeGenerator([{
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
   * }], pl.$('#test'))
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
  pl.nodeTreeGenerator = function nodeTreeGenerator(nodeTreeArray, __parent) {
    if (!Array.isArray(nodeTreeArray)) {
      throw new pl.exceptions.NotArrayException(undefined, nodeTreeArray);
    }

    var node_tree_length = nodeTreeArray.length;
    var elements = [];
    for (var i = 0; i < node_tree_length; i++) {
      var item = nodeTreeArray[i];
      if (!item.tag) item.tag = 'div';
      var element = document.createElement(item.tag);

      if (item.attr) {
        if (!Array.isArray(item.attr)) {
          throw new pl.exceptions.NotArrayException(undefined, item.attr);
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
          throw new pl.exceptions.NotStringException(undefined, item.text);
        }

        var nodeText = document.createTextNode(item.text)
        element.appendChild(nodeText);
      }

      if (item.in) {
        if (!Array.isArray(item.in)) {
          throw new pl.exceptions.NotArrayException(undefined, item.in);
        }

        nodeTreeGenerator(item.in, element);
      }

      if (__parent) {
        if (!(__parent instanceof Element)) {
          throw new pl.exceptions.NotElementException(undefined, __parent)
        }

        __parent.appendChild(element)
      }

      elements[i] = element;
    }

    return elements
  }
})();