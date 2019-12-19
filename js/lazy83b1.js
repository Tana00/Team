(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Lazy load class to handle img tag in HTML
 */
var lazyLoadImgTag = function () {
  function lazyLoadImgTag(config) {
    _classCallCheck(this, lazyLoadImgTag);

    this.config = config;
  }

  _createClass(lazyLoadImgTag, [{
    key: 'debounce',
    value: function debounce(func) {
      var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
      var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var timeout = void 0;
      return function () {
        var context = this,
            args = arguments;
        var later = function later() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }
  }, {
    key: 'isInViewPort',
    value: function isInViewPort(element) {
      var rect = element.getBoundingClientRect();
      var html = document.documentElement;
      var result = rect.top >= -900 && rect.left >= -450 && rect.bottom <= (window.innerHeight + 900 || html.clientHeight + 900) && rect.right <= (window.innerWidth + 450 || html.clientWidth + 450);
      return result;
    }
  }, {
    key: 'showOnDemand',
    value: function showOnDemand(element) {
      if (!element.hasAttribute('src')) {
        var src = document.createAttribute('src');
        src.value = element.getAttribute('data-src');
        element.setAttributeNode(src);
        element.onload = function () {
          element.removeAttribute('data-src');
        };
      }
    }
  }, {
    key: 'loadEvent',
    value: function loadEvent() {
      var img = this.config.$imgTag;
      this.isInViewPort(img) && this.showOnDemand(img);
    }
  }, {
    key: 'scrollEvent',
    value: function scrollEvent(e) {
      e.preventDefault();
      var img = this.config.$imgTag;
      this.isInViewPort(img) && this.showOnDemand(img);
    }
  }, {
    key: 'eventHandler',
    value: function eventHandler() {
      window.addEventListener('load', this.loadEvent.bind(this));
      window.addEventListener('scroll', this.debounce(this.scrollEvent.bind(this)));
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.eventHandler();
    }
  }]);

  return lazyLoadImgTag;
}();

/**
 * lazy load background url in css
 */


var lazyLoadBackground = function () {
  function lazyLoadBackground(config) {
    _classCallCheck(this, lazyLoadBackground);

    this.config = config;
  }

  _createClass(lazyLoadBackground, [{
    key: 'debounce',
    value: function debounce(func) {
      var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
      var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var timeout = void 0;
      return function () {
        var context = this,
            args = arguments;
        var later = function later() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }
  }, {
    key: 'elementExist',
    value: function elementExist() {
      var elem = this.config.$elem;
      return document.querySelector(elem) ? document.querySelector(elem) : null;
    }
  }, {
    key: 'isInViewPort',
    value: function isInViewPort(element) {
      var rect = element.getBoundingClientRect();
      var html = document.documentElement;
      var result = rect.top >= -900 && rect.left >= -450 && rect.bottom <= (window.innerHeight + 900 || html.clientHeight + 900) && rect.right <= (window.innerWidth + 450 || html.clientWidth + 450);
      return result;
    }
  }, {
    key: 'handleBackground',
    value: function handleBackground(e) {
      e.preventDefault();
      var elem = this.elementExist();
      elem ? this.showBackground(elem) : null;
    }
  }, {
    key: 'showBackground',
    value: function showBackground(elem) {
      var elemClassName = elem.className;
      if (elemClassName.includes('--with-bg')) {
        return null;
      } else {
        var classWithBackgroundImage = elemClassName + '--with-bg';
        return this.isInViewPort(elem) ? elem.classList.add(classWithBackgroundImage) : null;
      }
    }
  }, {
    key: 'eventHandler',
    value: function eventHandler() {
      window.addEventListener('load', this.handleBackground.bind(this));
      window.addEventListener('scroll', this.debounce(this.handleBackground.bind(this)));
      window.addEventListener('resize', this.handleBackground.bind(this));
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.eventHandler();
    }
  }]);

  return lazyLoadBackground;
}();

/**
 *  Initialize lazy load for img in HTML
 */


var images = document.querySelectorAll('img');

images.forEach(function (image) {
  var lazyImages = new lazyLoadImgTag({
    $imgTag: image
  });
  lazyImages.initialize();
}
/**
 * Initialize lazy load for backgrounds in css
 */
);var hero = '.hero';
var heroNoVideo = 'hero--no-video';
var heroBbVideo = '.hero__bg__video';
var hireSectionPicOne = '.hire-section--pic1';
var hireSectionPicTwo = '.hire-section--pic2';
var hireSectionPicThree = '.hire-section--pic3';

var DOMelements = [hero, heroNoVideo, heroBbVideo, hireSectionPicOne, hireSectionPicTwo, hireSectionPicThree];

DOMelements.forEach(function (elem) {
  var lazyBackgrounds = new lazyLoadBackground({
    $elem: elem
  });
  lazyBackgrounds.initialize();
});

},{}]},{},[1]);
