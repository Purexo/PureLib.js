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
   * @param {Promise[]} promises - Array of Promise you want wait resolve
   * @returns {Promise} - .then of this Promise give an array with each data given by each Promise of promises (same ordered)
   * @throws {pl.Exception.NotArrayException}
   */
  pl.PromiseWaitAll = function PromiseWaitAll(promises) {
    if (!Array.isArray(promises)) {
      throw new pl.Exception.NotArrayException('promises should be an Array of Promise')
    }

    return new Promise(function (resolve, reject) {
      let count = promises.length;
      let results = [];

      promises.forEach((promise, index, array) => {
        let handler = data => {
          results[index] = data;
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
      })
    });
  }

})();