/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by czzou on 2016/7/22.
	 */
	var ACTION=__webpack_require__(1).ACTION;
	function sendMessage(type,data){
	    chrome.runtime.sendMessage({type:"cnblog-article-information", data:data});
	}

	$(function(){
	    $("#fetch").click(function(){
	        var keyword=$("#keyword").val();
	        var max=$("#max").val();
	        var site=$("input[name='site']").val();
	        chrome.runtime.sendMessage({action:ACTION.START_FETCH, data:{
	            keyword:keyword,
	            max:max,
	            site:site
	        }});
	    })
	})

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Created by czzou on 2016/7/22.
	 */
	var ACTION ={
	    START_FETCH:"start",//Symbol(),
	    GET_FETCH_STATUS:"get_res"//Symbol()
	}

	exports.ACTION=ACTION;

/***/ }
/******/ ]);