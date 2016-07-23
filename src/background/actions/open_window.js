/**
 * Created by zm on 2016/7/23.
 */
var Q=require('q');
var utils=require('../../utils');
var SITES=utils.SITES;

//1.打开窗口
function open_window(data){
    var dfd= Q.defer();
    var fetch_url=SITES.getSite(data.site).createUrl(data);
    data.fetch_url=fetch_url;
    chrome.windows.create({
        url :fetch_url,
        height:window.screen.height,
        width:window.screen.width
    },function(){
        dfd.resolve(data);
    });
    return dfd.promise;
}
//2.获取tab_id
function getTabId(data){
    var dfd= Q.defer();
    chrome.tabs.query({active:true,currentWindow:true},function(tab){
        var tab_id=tab[0].id;
        data.tab_id=tab_id;
        dfd.resolve(data);
    });
    return dfd.promise;
}

module.exports=function(data){
    return open_window(data).then(function(){
        return getTabId(data);
    })
}