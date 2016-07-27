/**
 * Created by zm on 2016/7/22.
 */
var Q=require('q');
var utils=require('../../utils');
var ACTION=utils.ACTION;
var open_window=require('./open_window');
var　FetchItem=require('../FetchItem');

module.exports=function(data){
    var dfd= Q.defer();
    open_window(data).then(function(data){
        var tab_id=data.tab_id;
        //开始抓取，创建抓取条目
        var fetch_item=FetchItem.create(data);
        window.FETCH_ITEMS.push(fetch_item);
        //给tab页发送抓取消息,不断重试
        var __max_try_num=5;
        var __interval_time=2000;
        var __timer=setInterval(function(){
            if(__max_try_num<0){
                data.message="网页加载超时";
                dfd.reject(data);
                clearInterval(__timer);
            }
            chrome.tabs.sendMessage(tab_id, {
                action:ACTION.START_FETCH,
                data:data
            }, function(response) {
                clearInterval(__timer);
                if(response && response.err==0){
                    dfd.resolve(data);
                }
                else{
                    //if(data){
                    //    data.message=response.message;
                    //}
                    //dfd.reject(data);
                    console.error("==== null callbakc of message =====");
                    return;
                }
            });
            __max_try_num--;
        },__interval_time);

    }).done();
    return dfd.promise;
}