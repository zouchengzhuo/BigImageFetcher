/**
 * Created by czzou on 2016/7/22.
 */
var ACTION ={
    SET_URL:"set_url",
    START_FETCH:"start_fetch",
    FETCH_PROGTRESS:"fetch_progress",
    FETCH_SUCCESS:"fetch_success"
}

var DOWNLOAD_STATUS={
    INIT:"准备中",
    DOWNLOADING:"抓取中",
    SUCCESS:"抓取完成",
    ERROR:"抓取出错"
}
//站点列表
var SITES=[
    {
        name:"百度图片",
        value:"baidu_image",
        createUrl:function(data){
            return "http://image.baidu.com/search/index?tn=baiduimage&word="+encodeURIComponent(data.keyword);
        }
    },
    {
        name:"谷歌图片",
        value:"google_image",
        createUrl:function(data){
            return "http://image.baidu.com/search/index?tn=baiduimage&word="+encodeURIComponent(data.keyword);
        }
    }
];
/**
 * 根据value获取site
 * @param value
 */
SITES.getSite=function(value){
    return SITES.filter(function(item){
        return item.value==value;
    })[0];
}

exports.ACTION=ACTION;
exports.DOWNLOAD_STATUS=DOWNLOAD_STATUS;
exports.SITES=SITES;