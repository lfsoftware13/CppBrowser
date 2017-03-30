registerMessageListener();

function registerMessageListener(){
	chrome.runtime.onMessage.addListener(onMessageCallback);
}

function onMessageCallback(request, sender, sendResponse) {
	if (request.event == "copy" || request.event == "paste" || request.event == "cut") {
		var type=request.event;
		var text=getClipText();

		var queryInfo = {
			active: true,
			currentWindow: true
		};
		chrome.tabs.query(queryInfo, function(tabs){
			var tab = tabs[0]

			var obj = {}
			obj["time"] = getCurrentTime();
			obj["type"] = type;
			obj["content"] = text;
			obj["tabId"] = tabs[0].tabId;
			obj["title"] = tabs[0].title;
			obj["url"] = tabs[0].url;

			if(isNaN(localStorage["count"])){
				localStorage["count"]=0;
			}
			localStorage["count"]++;
			localStorage[localStorage["count"].toString()] = JSON.stringify(obj);
		});

	}
	sendResponse({});
}

function getClipText(){
	$("#inp").focus();
	$("#inp").val("");
	document.execCommand('paste');
	var text=$("#inp").val();
	$("#inp").val("");
	return text;
}