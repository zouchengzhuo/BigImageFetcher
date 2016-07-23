/**
 * Created by czzou on 2016/7/22.
 */
var start_fetch=require('./actions/start_fetch');
var utils=require('../utils');
var ACTION=utils.ACTION;
var DOWNLOAD_STATUS=utils.DOWNLOAD_STATUS;
//暴露到background全局的抓取列表，供popup查询
var FETCH_ITEMS=window.FETCH_ITEMS=[];
FETCH_ITEMS.getByTabId= function (tab_id) {
    return this.filter(function(item){
        return item.tab_id==tab_id;
    })[0]
}
FETCH_ITEMS.removeById=function(tab_id){
    var fetcher=this.getByTabId(tab_id);
    this.splice(this.indexOf(fetcher),1);
}

var __fetch_list=[];
__fetch_list.starting=false;

//按顺序开启队列中的抓取
function readFetchList(){
    if(__fetch_list.starting) return;
    var data=__fetch_list.shift();
    if(!data){
        __fetch_list.starting=false;
        return;
    }
    __fetch_list.starting=true;
    start_fetch(data).then(function(data){
        var fetch=FETCH_ITEMS.getByTabId(data.tab_id);
        fetch.status=DOWNLOAD_STATUS.DOWNLOADING;
    }).catch(function(data){
        var fetch=FETCH_ITEMS.getByTabId(data.tab_id);
        fetch.status=DOWNLOAD_STATUS.ERROR;
    }).done(function(){
        __fetch_list.starting=false;
        readFetchList();
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
    var data=request.data;
    var fetch;
    if(data.tab_id){
        fetch=window.FETCH_ITEMS.getByTabId(data.tab_id);
    }
    //开始抓取消息，读取抓取队列的第一个，开始抓取，抓取完成之后继续读
    if(request.action==ACTION.START_FETCH){
        __fetch_list.push(data);
        readFetchList();
    }
    else if(request.action==ACTION.FETCH_PROGTRESS){
        fetch.urls=data.urls;
    }
    //抓取完成，修改fetch_item状态，若存在弹窗，通知弹窗刷新视图
    else if(request.action==ACTION.FETCH_SUCCESS){
        fetch.status=DOWNLOAD_STATUS.SUCCESS;
        fetch.urls=data.urls;
    }
});

