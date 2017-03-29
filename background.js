
registerTabListener();

function registerTabListener(){
	chrome.tabs.onUpdated.addListener(onUpdatedCallback)
}

function onUpdatedCallback(tabId, changeInfo, tab){
	if(changeInfo.status == "complete"){
  		logURL(tabId, tab.url, tab.title, changeInfo.status);
	}
}

function logURL(tabId, url, title, status){
	var obj = {};
	obj["tabId"] = tabId;
	obj["url"] = url;
	obj["title"] = title;
	var json_str = JSON.stringify(obj)
	if(isNaN(localStorage["count"])){
		localStorage["count"]=0;
	}
	localStorage["count"]++;
	localStorage[localStorage["count"].toString()] = json_str
}