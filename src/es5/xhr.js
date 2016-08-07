(function () {

  function xhrFactory(settings) {
    if (!settings) {
      throw new pl.Exception.NotNullException('settings should not be empty', settings);
    }
    if (!settings.url) {
      throw new pl.Exception.NotNullException('url should not be empty', settings.url);
    }
    if (settings.onSuccess && typeof settings.onSuccess != 'function') {
      throw new pl.Exception.NotFunctionException('onSuccess should be a callback function', settings.onSuccess);
    }
    if (settings.onFail && typeof settings.onFail != 'function') {
      throw new pl.Exception.NotFunctionException('onFail should be a callback function', settings.onFail);
    }
    if (settings.onComplete && typeof settings.onComplete != 'function') {
      throw new pl.Exception.NotFunctionException('onComplete should be a callback function', settings.onComplete);
    }

    var xhr = new XMLHttpRequest();
    xhr.open(settings.method ? settings.method : 'get', settings.url, true);

    return xhr;
  }

  /**
   * @namespace pl.xhr
   */

  /**
   * @callback pl.xhr.fail
   * @this XMLHttpRequest
   */

  /**
   * @callback pl.xhr.always
   * @this XMLHttpRequest
   */

  /**
   * @typedef {Object} pl.xhr.Settings
   * @property {string} url - content url you want fetch
   * @property {string} [method=GET] - HTTP method you want use
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
   * @property {*} [data] - anything data you want send via the xhr request (that XMLHttpRequest.prototype.send can handled)
   * @property {pl.xhr.fail} [onFail] - fail callback
   * @property {pl.xhr.always} [onComplete] - complete callback (success and fail)
   */

  /**
   * @callback pl.xhr.getJSON_success
   * @param {*} data - retrieved data from `JSON.parse(xhr.responseText)`
   * @this XMLHttpRequest - request create by getJSON
   */

  /**
   * @typedef {pl.xhr.Settings} pl.xhr.Settings_json
   * @augments pl.xhr.Settings
   * @inheritdoc
   * @property {pl.xhr.getJSON_success} [onSuccess] - success callback
   */

  /**
   * Simply handle xhr request with json content
   * 
   * @author Purexo <contact@purexo.mom>
   * 
   * @function pl.getJSON
   * @memberof pl
   * @param {!pl.xhr.Settings_json} - settings for xhr request
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
   * @callback pl.xhr.getXML_success
   * @param {Document} xml - retrieved xml from `xhr.responseXML`
   * @this XMLHttpRequest - request create by getXML
   */

  /**
   * @typedef {pl.xhr.Settings} pl.xhr.Settings_xml
   * @augments pl.xhr.Settings
   * @inheritdoc
   * @property {pl.xhr.getXML_success} [onSuccess] - success callback
   */

  /**
   * Simply handle xhr request with xml content
   * 
   * @author Purexo <contact@purexo.mom>
   * 
   * @function pl.getXML
   * @memberof pl
   * @param {!pl.xhr.Settings_xml} - settings for xhr request
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
   * @callback pl.xhr.getRAW_success
   * @param {string} content - retrieved content from `xhr.responseText`
   * @this XMLHttpRequest - request create by getRAW
   */

  /**
   * @typedef {pl.xhr.Settings} pl.xhr.Settings_raw
   * @augments pl.xhr.Settings
   * @inheritdoc
   * @property {pl.xhr.getRAW_success} [onSuccess] - success callback
   */

  /**
   * Simply handle xhr request with raw content
   * 
   * @author Purexo <contact@purexo.mom>
   * 
   * @function pl.getRAW
   * @memberof pl
   * @param {!pl.xhr.Settings_raw} - settings for xhr request
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