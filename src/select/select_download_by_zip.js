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
        download:function(){
            vm.downloading=true;
            zip.useWebWorkers = true;
            zip.workerScriptsPath = './lib/zip/';
            var zipFs = new zip.fs.FS();

            var queue=[];
            //获取dataurl
            fetch.urls.forEach(function(url){
                if(!url.selected) return;
                queue.push(getDataUrl(url));
            });
            //存入zi


            Q.all(queue).then(function(data){
                data.forEach(function(item,index){
                    if(item==-1) return;
                    zipFs.root.addData64URI(index+getSuffix(item),item);
                });
            }).done(function(){
                //下载
                //zipFs.exportData64URI
                zipFs.exportBlob(function(zippedDataURI){
                    saveFile(zippedDataURI,fetch.keyword+"_"+fetch.site.name+"_"+new Date().getTime()+".zip",function(){
                        vm.downloading=false;
                    });
                    //saveFile(zippedDataURI,new Date().getTime()+".zip");
                },function(){},function(){
                    alert("下载出错")
                })
            });
            //var queue=Q(-1);
            //var index=1;
            //fetch.urls.forEach(function(url){
            //    if(!url.selected) return;
            //    queue=queue.then(function(){
            //        return getDataUrl(url)
            //    }).then(function(data){
            //        if(data==-1) return;
            //        zipFs.root.addData64URI((index++)+getSuffix(data),data);
            //    })
            //});
            //queue.then(function(){
            //    //下载
            //    zipFs.exportBlob(function(zippedBlob){
            //        saveFile(zippedBlob,fetch.keyword+"_"+fetch.site.name+"_"+new Date().getTime()+".zip",function(){
            //            vm.downloading=false;
            //        });
            //        //saveFile(zippedDataURI,new Date().getTime()+".zip");
            //    },function(){},function(){
            //        alert("下载出错")
            //    })
            //}).done();
        }
    }
});
function updateNum(){
    var num=fetch.urls.filter(function(item){return item.selected}).length;
    vm.selectedNum=num;
}