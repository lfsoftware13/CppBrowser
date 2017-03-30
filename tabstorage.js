
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
	obj["time"] = getCurrentTime();
	obj["type"] = "url";
	obj["tabId"] = tabId;
	obj["title"] = title;
	obj["url"] = url;
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