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
            return "https://www.google.com.hk/search?tbm=isch&q="+encodeURIComponent(data.keyword);
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
function formatDate(timestamp, fmt,utc) {

    if(!timestamp)
    {
        return "";
    }
    var date = timestamp;
    if (typeof timestamp == "number") {
        date = new Date(timestamp);
    }

    if (!fmt)
        fmt = "yyyy-MM-dd hh:mm";


    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;


}
exports.ACTION=ACTION;
exports.DOWNLOAD_STATUS=DOWNLOAD_STATUS;
exports.SITES=SITES;
exports.formatDate=formatDate;