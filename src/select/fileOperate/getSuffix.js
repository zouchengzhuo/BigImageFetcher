/**
 * Created by zm on 2016/7/24.
 */
function getSuffix(dataUrl){
    var head=dataUrl.slice(0,16).match(/png|jpeg|bmp|gif/)[0];
    return "."+head;
}
module.exports=getSuffix;