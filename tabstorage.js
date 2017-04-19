
registerTabListener();

function registerTabListener(){
	chrome.tabs.onUpdated.addListener(onUpdatedCallback)
	chrome.tabs.onRemoved.addListener(onRemovedCallback)
}

function onUpdatedCallback(tabId, changeInfo, tab){
	if(changeInfo.status == "complete"){
  		logURL(tabId, tab, changeInfo.status);
	}
}

function onRemovedCallback(tabId, removeInfo){
	logCloseTab(tabId, removeInfo['windowId'], removeInfo['isWindowClosing'])
}

function logURL(tabId, tab, status){
	var obj = {};
	obj["time"] = getCurrentTime();
	obj["type"] = "url";
	obj["tabId"] = tabId;
	obj["title"] = tab.title;
	obj["url"] = tab.url;
	openerTabId = -1;
	if(typeof(tab.openerTabId) != "undefined"){
		openerTabId = tab.openerTabId;
	}
	obj["openerTabId"] = openerTabId;
	var json_str = JSON.stringify(obj)
	if(isNaN(localStorage["count"])){
		localStorage["count"]=0;
	}
	localStorage["count"]++;
	localStorage[localStorage["count"].toString()] = json_str
}

function logCloseTab(tabId, windowId, isWindowClosing){
	var obj = {};
	obj["time"] = getCurrentTime();
	obj["type"] = "url_close";
	obj["tabId"] = tabId;
	obj["windowId"] = windowId;
	obj["isWindowClosing"] = isWindowClosing;

	var json_str = JSON.stringify(obj)
	if(isNaN(localStorage["count"])){
		localStorage["count"]=0;
	}
	localStorage["count"]++;
	localStorage[localStorage["count"].toString()] = json_str
}

function getCurrentTime(){
	var curr = new Date();
	var date = curr.toLocaleDateString();
	var hour = curr.getHours();
	var minute = curr.getMinutes();
	var sec = curr.getSeconds();
	if(hour<10){
		hour = "0"+hour;
	}
	if(minute<10){
		minute = "0"+minute;
	}
	if(sec<10){
		sec = "0"+sec;
	}
	var time = hour+":"+minute+":"+sec;
	return date+" "+time;
}