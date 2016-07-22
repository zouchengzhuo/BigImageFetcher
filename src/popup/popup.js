/**
 * Created by czzou on 2016/7/22.
 */
var ACTION=require('../utils').ACTION;
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
        //chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
        //        console.log(response.farewell);
        //    });
        //});
    })
})