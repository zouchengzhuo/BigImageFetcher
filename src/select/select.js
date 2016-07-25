/**
 * Created by zm on 2016/7/24.
 */
var Q=require('q');
var Vue=require('vue');
var getDataUrl=require('./fileOperate/getDataUrl');
var getSuffix=require('./fileOperate/getSuffix');
var saveFile=require('./fileOperate/saveFile');

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
            var now=Date.now();
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