(function () {
  'use strict';
  /*
   * In this file you'll find some utils for ES6 compatible navigators
   */

  /**
   * asyncEach callback
   * @callback asyncEachCallback
   * @param {*} value - current value
   * @param {*} key - current key
   * @param {Array|Map|Set|string} iterable - iterable iterated
   */

  /**
   * make an async foreach for heavy iterable
   * 
   * @function asyncEach
   * @memberof pl
   * @static
   * @author Purexo <contact@purexo.mom>
   * 
   * @param {Array|Map|Set|string} iterable - An iterable object
   * @param {asyncEachCallback} callback - cf Array.prototype.forEach signature
   * @param {any} [bind=iterable] - `this` context you want binding to callback
   * @returns {Promise} 
   */
  pl.asyncEach = function asyncEach(iterable, callback, bind) {
    return new Promise((resolve, reject) => {
      // check iterable
      if (typeof iterable[Symbol.iterator] !== 'function') {
        reject({ context: iterable, reason: 'not an iterable', done: false });
        return;
      }

      // check callback
      if (typeof callback !== 'function') {
        reject({ context: callback, reason: 'not a function', done: false });
        return;
      }

      // callback binding
      const binding = bind || iterable;
      callback = callback.bind(binding);

      // iterate over iterable
      for (let [key, value] of iterable.entries()) {
        callback(value, key, iterable);
      }

      // all right, process terminated, raise the result
      resolve(iterable);
    });
  }


})();