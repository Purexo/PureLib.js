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
      for (let [key, value] of iterable) {
        callback(value, key, iterable);
      }

      // all right, process terminated, raise the result
      resolve(iterable);
    });
  }

  /**
   * @author Purexo <contact@purexo.mom>
   * 
   * @class pl.Exception.NotIterableException
   * @memberof pl.Exception
   * @static
   * @augments pl.Exception
   * 
   * @param {string} message - message of Exception
   * @param {*} context - the incorrect object
   */
  pl.Exception.NotIterableException =
    function NotIterableException(message, context) {
      Exception.prototype.constructor.call(this, 'NotIterableException', message, context);
    }
  inherit(pl.Exception, pl.Exception.NotIterableException);

  /**
   * @typedef {Promise} Promise
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
   */

  /**
   * Work like Promise.all but without fail-fast behaviour and just accept an Array on Promise
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
   * 
   * @function PromiseWaitAll
   * @memberof pl
   * @static
   * @author Purexo <contact@purexo.mom>
   * @author ZatsuneNoMoku https://github.com/ZatsuneNoMokou
   * 
   * @param {Object} promises - an Iterable of Promise you want wait resolve
   * @param {function} promises[Symbol.iterator]
   * @returns {Promise} .then of this Promise give a Map with each data given by each Promise of promises (same index)
   * @throws {pl.Exception.NotIterableException}
   */
  pl.PromiseWaitAll = function PromiseWaitAll(promises) {
    if (typeof promises[Symbol.iterator] !== 'function') {
      throw new pl.Exception.NotIterableException('promises should be an Iterable of Promise')
    }

    return new Promise(function (resolve, reject) {
      let count = typeof promises.size == 'function' ? promises.size() : promises.length;
      let results = new Map();

      // iterate over iterable
      // array not work with [index, value] array.entries() did
      var iterator = typeof promises.entries == 'function' ? promises.entries() : promises;
      for (let [index, promise] of iterator) {
        let handler = data => {
          results.set(index, data);
          if (--count == 0) {
            resolve(results);
          }
        }

        if (promise instanceof Promise) {
          promise.then(handler);
          promise.catch(handler);
        } else {
          handler(promise);
        }
      }
    });
  }

})();