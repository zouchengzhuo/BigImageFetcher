function getDomainFromUrl(url){
	var host = "null";
	if(typeof url == "undefined" || null == url)
		url = window.location.href;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if(typeof match != "undefined" && null != match)
		host = match[1];
	return host;
}

function checkForValidUrl(tabId, changeInfo, tab) {
	if(getDomainFromUrl(tab.url).toLowerCase()=="www.cnblogs.com"){
		chrome.pageAction.show(tabId);
	}
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

var articleData = {};
articleData.error = "加载中...";
chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
	if(request.type!=="cnblog-article-information")
		return;
	articleData = request;
	articleData.firstAccess = "获取中...";
	if(!articleData.error){
		$.ajax({
			url: "http://localhost/first_access.php",
			cache: false,
			type: "POST",
			data: JSON.stringify({url:articleData.url}),
			dataType: "json"
		}).done(function(msg) {
			if(msg.error){
				articleData.firstAccess = msg.error;
			} else {
				articleData.firstAccess = msg.firstAccess;
			}
		}).fail(function(jqXHR, textStatus) {
			articleData.firstAccess = textStatus;
		});
	}
});
