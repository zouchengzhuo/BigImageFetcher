/**
 * Created by czzou on 2016/7/22.
 */
var Vue=require('vue');
var utils=require('../utils');
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
