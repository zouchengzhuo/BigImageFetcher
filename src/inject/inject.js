/**
 * Created by czzou on 2016/7/22.
 */

var Q=require('q');
var utils=require('../utils');
var ACTION=utils.ACTION;
var SITES=utils.SITES;


var fetcher;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    var data=request.data;
    //开始抓取
    if(request.action==ACTION.START_FETCH){
        var site=SITES.getSite(data.site);
        if(!site){
            sendResponse({err:1,message:"未实现此网页抓取"});
            return;
        }
        sendResponse({err:0});
        fetcher=require('./fetchors/'+data.site);
        fetcher(data).then(function(urls){
            data.urls=urls;
            chrome.runtime.sendMessage({action:ACTION.FETCH_SUCCESS, data:data}); //发送给background
        }).done()
    }
});