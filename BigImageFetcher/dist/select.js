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
	 * Created by zm on 2016/7/24.
	 */

	var Vue=__webpack_require__(12);
	var formatDate=__webpack_require__(5).formatDate;

	var FETCH_ITEMS=chrome.extension.getBackgroundPage().FETCH_ITEMS;
	var tab_id=location.href.match(/tab_id=(\d+)/)[1];
	if(!tab_id){
	    tab_id=FETCH_ITEMS[0].tab_id;
	}
	if(!tab_id){
	    alert("尚未未完成任何抓取！")
	}
	tab_id=parseInt(tab_id);
	var fetch=FETCH_ITEMS.getByTabId(tab_id);
	var vm=window.vm=new Vue({
	    el: 'body',
	    data: {
	        downloading:false,
	        open_download:false,
	        tab_id:tab_id,
	        selectedNum:fetch.urls.length,
	        fetch:fetch,
	        FETCH_ITEMS: FETCH_ITEMS,
	    },
	    methods:{
	        select:function(url){
	            url.selected=!url.selected;
	            updateNum();
	        },
	        selectAll:function(url){
	            fetch.urls.forEach(function(url){
	                url.selected=true;
	            });
	            updateNum();
	        },
	        unselectAll:function(){
	            fetch.urls.forEach(function(url){
	                url.selected=false;
	            });
	            updateNum();
	        },
	        error:function(url){
	            url.selected=false;
	            updateNum();
	        },
	        load:function(url,e){
	            url.img=e.srcElement;
	        },
	        open_download_modal:function(){
	            this.open_download=true;
	        },
	        close_download_modal:function(){
	            this.open_download=false;
	        },
	        open_download_setting:function(){
	            chrome.tabs.create({
	                url: "chrome://settings/search#下载前询问每个文件的保存位置"
	            })
	        },
	        download:function(){
	            var now=formatDate(new Date(),'yyyy-MM-dd hh.mm.ss');
	            fetch.urls.forEach(function(url){
	                if(!url.selected) return;
	                chrome.downloads.download({
	                    url: url.url,
	                    filename: fetch.keyword+"_"+fetch.site.name+"_"+now + "/" + getFileName(url.url),
	                    saveAs: false,
	                    conflictAction: "uniquify"
	                }, function(f) {

	                });
	            });
	            this.open_download=false;
	        }
	    }
	});
	function getFileName(url){
	    var reg=/[^/]+?\.(?:jpg|jpeg|png|bmp|gif|ico)/;
	    var name=url.match(reg);
	    if(!name){
	        return Date.now()+".png";
	    }
	    return name[0];
	}
	function updateNum(){
	    var num=fetch.urls.filter(function(item){return item.selected}).length;
	    vm.selectedNum=num;
	}

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
	            return "https://www.google.com.hk/search?tbm=isch&q="+encodeURIComponent(data.keyword);
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
	function formatDate(timestamp, fmt,utc) {

	    if(!timestamp)
	    {
	        return "";
	    }
	    var date = timestamp;
	    if (typeof timestamp == "number") {
	        date = new Date(timestamp);
	    }

	    if (!fmt)
	        fmt = "yyyy-MM-dd hh:mm";


	    var o = {
	        "M+": date.getMonth() + 1, //月份
	        "d+": date.getDate(), //日
	        "h+": date.getHours(), //小时
	        "m+": date.getMinutes(), //分
	        "s+": date.getSeconds(), //秒
	        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
	        "S": date.getMilliseconds() //毫秒
	    };
	    if (/(y+)/.test(fmt))
	        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	        if (new RegExp("(" + k + ")").test(fmt))
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;


	}
	exports.ACTION=ACTION;
	exports.DOWNLOAD_STATUS=DOWNLOAD_STATUS;
	exports.SITES=SITES;
	exports.formatDate=formatDate;

/***/ },

/***/ 12:
/***/ function(module, exports) {

	module.exports = Vue;

/***/ }

/******/ });