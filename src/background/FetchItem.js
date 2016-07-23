/**
 * Created by zm on 2016/7/23.
 */
var utils=require('../utils');
var DOWNLOAD_STATUS=utils.DOWNLOAD_STATUS;
var SITES=utils.SITES;
function FetchItem(){
    this.tab_id=0;//浏览器tabid
    this.keyword="";//抓取关键词
    this.max=500;//抓取数量
    this.site=null;//抓取站点
    this.status=DOWNLOAD_STATUS.INIT;//抓取状态
    this.urls=[];//抓取结果url数组
    this.message="";//错误信息
    this.start_time=new Date();
}
FetchItem.create=function(data){
    var fetch_item=new FetchItem();
    fetch_item.tab_id=data.tab_id;
    fetch_item.keyword=data.keyword;
    fetch_item.max=data.max;
    fetch_item.site=SITES.getSite(data.site);
    fetch_item.status=DOWNLOAD_STATUS.INIT;
    return fetch_item;
}

module.exports=FetchItem;