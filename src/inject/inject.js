/**
 * Created by czzou on 2016/7/22.
 */

var Q=require('q');
var ACTION=require('../utils').ACTION;

var fetcher;
if(location.host.indexOf("google.com")>-1){
    fetcher=require('./fetchors/google_image.js');
}
else{
    console.error("未实现此站点抓取！")
}
//fetcher(500).then(function(data){
//    console.log(data)
//}).done()
chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
    alert(1)
    console.log("=== message inject===",request)
    if(request.action!==ACTION.START_FETCH) return;
    var data=request.data;
    console.log(data);

});