/**
 * Created by zm on 2016/7/23.
 */
var utils=require('../utils');
var ACTION=utils.ACTION;
module.exports=function(data){
    chrome.runtime.sendMessage({action:ACTION.FETCH_PROGTRESS, data:data}); //发送给background
}