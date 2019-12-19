(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var formSubmitUtils = require('../src/templates/forms/submit-utils');

/*
 * Add form submit functions to global scope
 */
window.formSubmit = formSubmitUtils.formSubmit;
window.joinFormSubmit = formSubmitUtils.joinFormSubmit;

},{"../src/templates/forms/submit-utils":4}],2:[function(require,module,exports){
(function (process){
/**
 * Configuration file.
 */

// Use env var if set in CI, or use local dir root.
var config = {
  staticPath: "https://x-team.com" || "",
  noIndex: process.env.NO_INDEX,
  autoApiUrl: process.env.AUTO_API_URL || 'https://join.x-team.com/api',
  autoUrl: process.env.AUTO_URL || 'https://join.x-team.com',
  // usual local dev setup:
  // autoApiUrl: process.env.AUTO_API_URL || 'http://localhost:8000/api',
  // autoUrl: process.env.AUTO_URL || 'http://localhost:8000',
}

module.exports = config;

}).call(this,require('_process'))
},{"_process":3}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
const config = require('../../../config')

/**
 * Hit ipify to figure out client ip address
 *
 * @param {function} callback - callback function
 */
function extractClientIp(callback) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function() {
    callback(null, JSON.parse(this.responseText));
  });

  xhr.addEventListener('error', function(e) {
    callback(e);
  });

  xhr.addEventListener('abort', function(e) {
    callback(e);
  })

  xhr.open('GET', 'https://api.ipify.org/?format=json', true);
  xhr.send();
}

/**
 * Extracts values from the passed form and
 * send them to a Zapier webhook, passed as 'base_url' field.
 *
 * @param {DOMElement} form - Form being submitted.
 */

 function formSubmit(form) {
   function formSubmitErrorHandler(err) {
     if (err) {
       alert('Oops! Something went wrong, try again or send an email to contact@x-team.com');
       console.error(err);
       return;
     }

     window.location.href = redirect;
   }

   var baseUrl = document.getElementsByName('base_url')[0].value;
   var redirect = document.getElementsByName('redirect')[0].value;
   var payload = preparePayload(form);

   if (grecaptcha &&
       payload['g-recaptcha-response'] !== undefined
       && grecaptcha.getResponse().length < 1) {
     alert('Please tick the reCAPTCHA box to proceed');
     return false;
   }

   var shouldCheckForVaultSelection = payload.context === 'vault'

   if (shouldCheckForVaultSelection && !isSelectedVaultItem(payload)) {
     alert('Select an item from The Vault first, in order to request it.');
     return false;
   }

   // if we see a form field called `client_ip` with a value of `set`
   // then we call a 3rd party service to figure out the ip address
   if(payload.client_ip === 'set') {
     extractClientIp(function handleClientIp(err, result) {
       // if there is an error, we want to still submit anyway
       if(err) {
         console.log(err);
         payload.client_ip = 'error';
       }
       else
         payload.client_ip = result.ip;

       sendPayload(baseUrl, payload, formSubmitErrorHandler);
     });
   }
   else {
     sendPayload(baseUrl, payload, formSubmitErrorHandler);
   }

   return false;
 }

/**
 * Extracts values from the passed form and
 * send them to a AUTO API
 *
 * @param {DOMElement} form - Form being submitted.
 */
function joinFormSubmit(form) {
  var baseUrl = document.getElementsByName('base_url')[0].value;
  var submitButton = document.getElementsByName('submit_form')[0];
  var payload = preparePayload(form);

  submitButton.disabled = true;
  sendJSONPayload(baseUrl, payload, function (err, response) {
    if (err) {
      const statusCode = err.statusCode

      if (statusCode && statusCode === 409) {
        alert('It looks like you have already registered with this email. Please check your inbox for further instructions, or use the "Forgot my Secret" form to request another.');
        submitButton.disabled = false;
        return window.location.href = `${config.autoUrl}/forgot-secret?email=${encodeURIComponent(payload['email'])}`;
      }

      alert('Sorry, something went wrong and your registration could not be completed. Please try again, or contact talent@x-team.com for support.');
      console.error(err);
      submitButton.disabled = false;
      return;
    }

    const applicant = response && response.applicant;
    if (!applicant) {
      return window.location.href = '/join-success';
    }

    // push data to google tag manager
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'formSubmission',
      'formType': 'joinDeveloper',
    });

    const redirect = response && response.applicant ?
      `${config.autoUrl}/applicant/${response.applicant.token}` : '/join-success';

    window.location.href = redirect;
  });

  return false;
}

/**
 * Extract values from form.
 *
 * @param {DOMElement} form - Form being submitted.
 */
function preparePayload(form) {
  var ignoredFields = ['base_url', 'submit_form', 'redirect'];
  var params = {};
  var fields = Array.prototype.slice.call(form.elements);

  fields.forEach(function (field) {
    var name = field.getAttribute('name');

    if (ignoredFields.indexOf(name) >= 0) { return; }

    var type = field.getAttribute('type');
    var value = field.value || field.getAttribute('value');

    if (type === 'checkbox') {
      if (field.checked) {
        params[name] = value || '';
      }
    } else {
      params[name] = value || '';
    }
  });

  return params;
}

/**
 * Create a XMLHttpRequest object with headers
 *
 * @param {string} url - url for the request
 * @param {array} headers - array of header objects example: [{name: 'Content-type', value: 'application/json'}]
 */
function createRequest(url, headers) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  if (headers) {
    headers.forEach(function(header) {
      xhr.setRequestHeader(header.name, header.value);
    });
  }

  return xhr;
}

/**
 * Preapre response handling for the request and send it
 *
 * @param {XMLHttpRequest} xhr - request object
 * @param {Object} payload - object to stringify in request
 * @param {function} callback - callback function
 */
function prepareAndSendRequest(xhr, payload, callback) {
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState == 4) {
      const err = (xhr.status != 200) ? ((xhr.status === 409) ? {statusCode: xhr.status} : new Error('XHR failed with status ' + xhr.status)) : null
      let response = null
      if (xhr.status === 200) {
        try {
          response = JSON.parse(xhr.response)
        } catch (error) {
          console.error(error)
        }
      }

      return callback(err, response)
    }
  };
  xhr.send(JSON.stringify(payload));
}

/**
 * Send payload via XHR with JSON headers to url, then redirect via callback.
 *
 * @param {string} url - Url to send values.
 * @param {array} payload - Assoc array of payload vals.
 * @param {function} callback - Function to let the caller know when the request is complete
 */
function sendJSONPayload(url, payload, callback) {
  prepareAndSendRequest(createRequest(url, [{name: 'Content-type', value: 'application/json'}]), payload, callback);
}

/**
 * Send payload via XHR to url, then redirect via callback.
 *
 * @param {string} url - Url to send values.
 * @param {array} payload - Assoc array of payload vals.
 * @param {function} callback - Function to let the caller know when the request is complete
 */
function sendPayload(url, payload, callback) {
  prepareAndSendRequest(createRequest(url), payload, callback);
}

/**
 * Check if at least one vault item is selected.
 *
 * @param {array} payload - Assoc array of payload vals.
 */
function isSelectedVaultItem(payload) {
  return Object.keys(payload).some(function (prop) {
    return prop.indexOf('items') > -1;
  });
}

module.exports = {
  formSubmit,
  joinFormSubmit
}

},{"../../../config":2}]},{},[1]);
