/**
 * Created by czzou on 2016/7/22.
 */
var Q=require('q');
var progress=require('../progress');
function fetch(data){
    var dfd= Q.defer();
    var max=data.max;
    var num=0;
    var try_time=0;
    var try_time_limit=60;
    var timer=setInterval(function(){
        num=$("a[href*='/imgres']").length;
        if(num<max && try_time<try_time_limit){
            //滚屏到最下方，若有moreBtn，则点击
            document.body.scrollTop=9999999;
            var moreBtn=$("#smb");
            if(moreBtn.length>0){
                moreBtn.click();
            }
            try_time++;
        }
        else {
            clearInterval(timer);
            dfd.resolve(getImageUrls());
            return;
        }
        data.urls=getImageUrls();
        //更新进度
        progress(data);
    },2000);
    function getImageUrls(){
        var urls=[];
        $("a[href*='/imgres']").each(function(_index,item){
            if(urls.length<max){
                var href=$(item).attr("href");
                href=href.match(/imgurl=(http[^&]+?)&/);
                if(!href || !href[1]){
                    return;
                }
                href= unescape(href[1]);
                urls.push({
                    url:href,
                    selected:true
                });
            }
        });
        return urls;
    }
    return dfd.promise;
}

module.exports=fetch;