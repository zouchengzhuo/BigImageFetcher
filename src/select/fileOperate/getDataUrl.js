/**
 * Created by zm on 2016/7/24.
 */
var Q=require('q');

function getImgDom(url){
    var dfd= Q.defer();
    if(url.img){
        setTimeout(function(){
            dfd.resolve(url.img);
        })
    }
    else{
        var img=new Image();
        img.crossOrigin = "*";
        img.src=url.url;
        img.onload=function(){
            dfd.resolve(img);
        }
        img.onerror=function(){
            dfd.resolve(-1);
        }
    }
    return dfd.promise;
}

module.exports=function(url){
    var dfd= Q.defer();
    getImgDom(url).then(function(img){
        if(img==-1){
            dfd.resolve(img);
            reutrn;
        }
        var canvas= document.createElement("canvas");
        var context=canvas.getContext("2d");
        canvas.height=img.naturalHeight;
        canvas.width=img.naturalWidth;
        context.drawImage(img,0,0);
        imgData = canvas.toDataURL();
        dfd.resolve(imgData);
    });
    return dfd.promise;
}