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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by czzou on 2016/7/22.
	 */
	var Vue=__webpack_require__(12);
	var utils=__webpack_require__(5);
	var ACTION=utils.ACTION;
	var SITES=utils.SITES;
	var DOWNLOAD_STATUS=utils.DOWNLOAD_STATUS;
	//$(function(){
	//    //绑定
	//    $("#fetch").click(function(){
	//        var keyword=$("#keyword").val();
	//        var max=$("#max").val();
	//        var site=$("input[name='site']:checked").val();
	//        var data={action:ACTION.START_FETCH, data:{keyword:keyword, max:max, site:site}};
	//        chrome.runtime.sendMessage(data); //发送给background
	//    });
	//});
	var FETCH_ITEMS=chrome.extension.getBackgroundPage().FETCH_ITEMS;
	var vm=new Vue({
	    el: '#wrapper',
	    data: {
	        tab_id:"-",
	        fetchParam:{
	            keyword:"百合,玫瑰,月季",
	            max:100,//500
	            site:"baidu_image"
	        },
	        SITES:SITES,
	        DOWNLOAD_STATUS:DOWNLOAD_STATUS,
	        FETCH_ITEMS: FETCH_ITEMS
	    },
	    methods:{
	        fetch:function(){
	            if(!vm.fetchParam.keyword){
	                alert("抓取关键词不能为空！");
	                return;
	            }
	            var keyword=this.fetchParam.keyword;
	            keyword.split(/[,，]/).forEach(function(item){
	                vm.fetchParam.keyword=item;
	                chrome.runtime.sendMessage({action:ACTION.START_FETCH,data:vm.fetchParam});
	            });
	            vm.fetchParam.keyword="";
	        },
	        stop:function(tab_id){
	            chrome.tabs.remove(tab_id, function(){
	                FETCH_ITEMS.removeById(tab_id);
	            })
	        },
	        reload:function(){
	            location.reload();
	        },
	        select:function(tab_id){
	            var url=chrome.extension.getURL("/select.html?tab_id="+tab_id);
	            window.open(url);
	        }
	    }
	});
	chrome.tabs.query({active:true,currentWindow:true},function(tab){
	    var tab_id=tab[0].id;
	    vm.tab_id=tab_id;
	});


/***/ },

/***/ 5:
/***/ function(module, exports) {

	/**
	 * Created by czzou on 2016/7/22.
	 */
	var ACTION ={
	    SET_URL:"set_url",
	    START_FETCH:"start_fetch",
	    FETCH_PROGTRESS:"fetch_progress",
	    FETCH_SUCCESS:"fetch_success"
	}

	var DOWNLOAD_STATUS={
	    INIT:"准备中",
	    DOWNLOADING:"抓取中",
	    SUCCESS:"抓取完成",
	    ERROR:"抓取出错"
	}
	//站点列表
	var SITES=[
	    {
	        name:"百度图片",
	        value:"baidu_image",
	        createUrl:function(data){
	            return "http://image.baidu.com/search/index?tn=baiduimage&word="+encodeURIComponent(data.keyword);
	        }
	    },
	    {
	        name:"谷歌图片",
	        value:"google_image",
	        createUrl:function(data){
	            return "http://image.baidu.com/search/index?tn=baiduimage&word="+encodeURIComponent(data.keyword);
	        }
	    }
	];
	/**
	 * 根据value获取site
	 * @param value
	 */
	SITES.getSite=function(value){
	    return SITES.filter(function(item){
	        return item.value==value;
	    })[0];
	}

	exports.ACTION=ACTION;
	exports.DOWNLOAD_STATUS=DOWNLOAD_STATUS;
	exports.SITES=SITES;

/***/ },

/***/ 12:
/***/ function(module, exports) {

	module.exports = Vue;

/***/ }

/******/ });