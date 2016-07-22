/**
 * Created by czzou on 2016/7/22.
 */
var ACTION=require('../utils').ACTION;
//function image(){
//    this.url="";
//    this.valid=false;
//}
//function images(){
//    this.keyword="";
//    this.site="";
//    this.images=[];
//}
chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
    if(request.action!==ACTION.START_FETCH) return;
    var data=request.data;
    alert(JSON.stringify(data))

});