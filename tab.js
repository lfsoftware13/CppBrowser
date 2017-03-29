
$(document).ready(function(){
	getCurrentUrl()
});

function getCurrentUrl(){
	var queryInfo = {
			active: true,
			currentWindow: true
		};
		chrome.tabs.query(queryInfo, function(tabs){
			var tab = tabs[0]
			$("#url_div").text(tab.url);
			$("#title_div").text(tab.title);
		});
}