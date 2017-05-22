registerMessageListener();

function registerMessageListener(){
	chrome.runtime.onMessage.addListener(onMessageCallback);
}

function store(request, sender, sendResponse) {
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
			obj["tabId"] = tabs[0].id;
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

function onMessageCallback(request, sender, sendResponse){

	if(request.event == "copy" || request.event == "cut"){
		a = 0
		for(i=0;i<10000;i++){
			for(j=0;j<10000;j++){
				a++;
			}
		} 
	}

	store(request, sender, sendResponse);
}

function getClipText(){
	$("#inp").focus();
	$("#inp").val("");
	document.execCommand('paste');
	var text=$("#inp").val();
	$("#inp").val("");
	return text;
}