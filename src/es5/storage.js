(function () {
  /**
   * Binding of LocalStorage API for support of object (transform on JSON)
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
   * @namespace pl.LS
   */
  pl.LS = {
    /**
     * @function setItem
     * @memberof pl.LS
     * @param {string} key
     * @param {any} data
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
     */
    setItem: function (key, data) {
      return localStorage.setItem(key, JSON.stringify(data));
    },
    /**
     * @function getItem
     * @memberof pl.LS
     * @param {string} key
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem
     */
    getItem: function (key) {
      return JSON.parse(localStorage.getItem(key));
    },
    /**
     * @function removeItem
     * @memberof pl.LS
     * @param {string} key
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem
     */
    removeItem: function (key) {
      return localStorage.removeItem(key);
    },
    /**
     * @function key
     * @memberof pl.LS
     * @param {string} index
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/key
     */
    key: function (index) {
      return localStorage.key(index);
    },
    /**
     * @function clear
     * @memberof pl.LS
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear
     */
    clear: function () {
      return localStorage.clear();
    }
  };
  /**
   * Binding of SessionStorage API for support of object (transform on JSON)
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
   * @namespace pl.SS
   */
  pl.SS = {
    /**
     * @function setItem
     * @memberof pl.SS
     * @param {string} key
     * @param {any} data
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
     */
    setItem: function (key, data) {
      return sessionStorage.setItem(key, JSON.stringify(data));
    },
    /**
     * @function getItem
     * @memberof pl.SS
     * @param {string} key
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem
     */
    getItem: function (key) {
      return JSON.parse(sessionStorage.getItem(key));
    },
    /**
     * @function removeItem
     * @memberof pl.SS
     * @param {string} key
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem
     */
    removeItem: function (key) {
      return sessionStorage.removeItem(key);
    },
    /**
     * @function key
     * @memberof pl.SS
     * @param {string} index
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/key
     */
    key: function (index) {
      return sessionStorage.key(index);
    },
    /**
     * @function clear
     * @memberof pl.SS
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear
     */
    clear: function () {
      return sessionStorage.clear();
    }
  };
})();