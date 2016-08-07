(function () {

  /**
   * @callback pl.each_callback
   * @param {any} value - value of current item
   * @param {any} key - current index
   * @param {Array} array - The array that you are iterate
   * @this Array - The array that you are iterate
   */

  /**
   * shortcut cor iterate over array
   * 
   * @author Purexo <contact@purexo.mom>
   * 
   * @function each
   * @memberof pl
   * @param {Array} - The array to iterate
   * @param {pl.each_callback}
   * @return {Array} - The array iterated
   */
  pl.each = function (array, callback) {
    Array.prototype.forEach.call(array, callback);
    return array;
  }

  /**
   * @callback pl.map_callback
   * @param {any} value - value of current item
   * @param {any} key - current index
   * @param {map} array - The array that you are iterate
   * @this Array - The array that you are iterate
   * @return {any}
   */

  /**
   * Change the value of array with return of your callback
   * 
   * @author Purexo <contact@purexo.mom>
   * 
   * @function reMap
   * @memberof pl
   * @param {Array} - The array to iterate
   * @param {pl.map_callback}
   * @return {Array} - The array iterated
   */
  pl.reMap = function (array, callback) {
    array.forEach(function (value, index, array) {
      array[index] = callback.call(array, value, index, array);
    })
  }

  /**
   * Create new Array the value return with your callback on item of array
   * 
   * @author Purexo <contact@purexo.mom>
   * 
   * @function map
   * @memberof pl
   * @param {Array} - The array to iterate
   * @param {pl.map_callback}
   * @return {Array} - the generated array
   */
  pl.map = function (array, callback) {
    var result = [];
    
    array.forEach(function (value, index, array) {
      result[index] = callback.call(array, value, index, array);
    })

    return result;
  }
})();