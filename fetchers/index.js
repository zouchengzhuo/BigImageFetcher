/**
 * Created by czzou on 2016/7/22.
 */

var Q=require('q');
var fetcher;

if(location.host.indexOf("google.com")>-1){
    fetcher=require('./../src/inject/fetchors/google_image.js');
}
else{
    console.error("未实现此站点抓取！")
}
fetcher(500).then(function(data){
    console.log(data)
}).done()