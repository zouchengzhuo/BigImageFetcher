/**
 * Created by zm on 2016/7/24.
 */
function saveFile2(data, filename){
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
};
function saveFile(blob, filename,callback){
    //var type = blob.type;
    //var force_saveable_type = 'application/octet-stream';
    ////var force_saveable_type = 'application/zip';
    //if (type && type != force_saveable_type) { // 强制下载，而非在浏览器中打开
    //    var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
    //    blob = slice.call(blob, 0, blob.size, force_saveable_type);
    //}
    //var url = URL.createObjectURL(blob);
    //var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    //save_link.href = url;
    //save_link.download = filename;
    //var event = document.createEvent('MouseEvents');
    //event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    //save_link.dispatchEvent(event);
    //URL.revokeObjectURL(url);
    //if(callback) callback();
    var type = blob.type;
    var force_saveable_type = 'application/octet-stream';
    if (type && type != force_saveable_type) { // 强制下载，而非在浏览器中打开
        var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
        blob = slice.call(blob, 0, blob.size, force_saveable_type);
    }
    var url = URL.createObjectURL(blob);
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = url;
    save_link.download = filename;
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
    URL.revokeObjectURL(url);
    if(callback) setTimeout(callback,2000);

};
module.exports=saveFile;