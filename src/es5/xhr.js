pl = pl || {};

(function () {

  var exceptions = {
    /**
     * @author Purexo <contact@purexo.mom>
     * 
     * @class pl.exceptions.NotNullException
     * @property {string} name - name of Exception
     * @property {string} message - message of Exception
     * @property {*} context - the incorrect object
     * @param {string} message - message of Exception
     * @param {*} context - the incorrect object
     */
    NotNullException: function NotNullException(message, context) {
      this.name = 'NotNullException';
      this.message = message;
      this.context = context;
    },

    /**
     * @author Purexo <contact@purexo.mom>
     * 
     * @class pl.exceptions.NotFunctionException
     * @property {string} name - name of Exception
     * @property {string} message - message of Exception
     * @property {*} context - the incorrect object
     * @param {string} message - message of Exception
     * @param {*} context - the incorrect object
     */
    NotFunctionException: function NotFunctionException(message, context) {
      this.name = 'NotFunctionException';
      this.message = message;
      this.context = context;
    }
  };
  pl.exceptions = pl.exceptions || {};
  Object.assign(pl.exceptions, exceptions);

  function xhrFactory(settings) {
    if (!settings) {
      throw new pl.exceptions.NotNullException('settings should not be empty', settings);
    }
    if (!settings.url) {
      throw new pl.exceptions.NotNullException('url should not be empty', settings.url);
    }
    if (settings.onSuccess && typeof settings.onSuccess != 'function') {
      throw new pl.exceptions.NotFunctionException('onSuccess should be a callback function', settings.onSuccess);
    }
    if (settings.onFail && typeof settings.onFail != 'function') {
      throw new pl.exceptions.NotFunctionException('onFail should be a callback function', settings.onFail);
    }
    if (settings.onComplete && typeof settings.onComplete != 'function') {
      throw new pl.exceptions.NotFunctionException('onComplete should be a callback function', settings.onComplete);
    }

    var xhr = new XMLHttpRequest();
    xhr.open(settings.method ? settings.method : 'get', settings.url, true);

    return xhr;
  }

  /**
   * @callback pl.xhf.fail
   * @this XMLHttpRequest
   */

  /**
   * @callback pl.xhf.always
   * @this XMLHttpRequest
   */

  /**
   * @typedef {Object} pl.xhr.Settings
   * @property {string} url - content url you want fetch
   * @property {string} [method=GET] - HTTP method you want use
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
   * @property {*} [data] - anything data you want send via the xhr request (that XMLHttpRequest.prototype.send can handled)
   * @property {pl.xhf.fail} [onFail] - fail callback
   * @property {pl.xhf.always} [onComplete] - complete callback (success and fail)
   */

  /**
   * @callback pl.xhf.getJSON~success
   * @param {*} data - retrieved data from `JSON.parse(xhr.responseText)`
   * @this XMLHttpRequest - request create by getJSON
   */

  /**
   * @typedef {pl.xhr.Settings} pl.xhr.Settings~json
   * @property {pl.xhf.getJSON~success} [onSuccess] - success callback
   */

  /**
   * Simply handle xhr request with json content
   * 
   * @author Purexo <contact@purexo.mom>
   * 
   * @function getJSON
   * @memberof pl
   * @param {!pl.xhr.Settings~json} - settings for xhr request
   */
  pl.getJSON = function getJSON(settings) {
    var xhr = xhrFactory(settings);

    xhr.onreadystatechange = function (aEvt) {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 && settings.onSuccess) {
          settings.onSuccess.call(xhr, JSON.parse(xhr.responseText));
        }
        else {
          settings.onFail.call(xhr);
        }
        settings.onComplete.call(xhr);
      }
    }

    xhr.send(data ? data : null);
  }

  /**
   * @callback pl.xhf.getXML~success
   * @param {Document} xml - retrieved xml from `xhr.responseXML`
   * @this XMLHttpRequest - request create by getXML
   */

  /**
   * @typedef {pl.xhr.Settings} pl.xhr.Settings~xml
   * @property {pl.xhf.getXML~success} [onSuccess] - success callback
   */

  /**
   * Simply handle xhr request with xml content
   * 
   * @author Purexo <contact@purexo.mom>
   * 
   * @function getXML
   * @memberof pl
   * @param {!pl.xhr.Settings~xml} - settings for xhr request
   */
  pl.getXML = function getXML(settings) {
    var xhr = xhrFactory(settings);

    xhr.overrideMimeType('text/xml');

    xhr.onreadystatechange = function (aEvt) {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 && settings.onSuccess) {
          settings.onSuccess.call(xhr, xhr.responseXML);
        }
        else {
          settings.onFail.call(xhr);
        }
        settings.onComplete.call(xhr);
      }
    }

    xhr.send(data ? data : null);
  }


  /**
   * @callback pl.xhf.getRAW~success
   * @param {string} content - retrieved content from `xhr.responseText`
   * @this XMLHttpRequest - request create by getRAW
   */

  /**
   * @typedef {pl.xhr.Settings} pl.xhr.Settings~raw
   * @property {pl.xhf.getRAW~success} [onSuccess] - success callback
   */

  /**
   * Simply handle xhr request with raw content
   * 
   * @author Purexo <contact@purexo.mom>
   * 
   * @function getRAW
   * @memberof pl
   * @param {!pl.xhr.Settings~xml} - settings for xhr request
   */
  pl.getRAW = function getRAW(settings) {
    var xhr = xhrFactory(settings);

    xhr.onreadystatechange = function (aEvt) {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 && settings.onSuccess) {
          settings.onSuccess.call(xhr, xhr.responseText);
        }
        else {
          settings.onFail.call(xhr);
        }
        settings.onComplete.call(xhr);
      }
    }

    xhr.send(data ? data : null);
  }

})();