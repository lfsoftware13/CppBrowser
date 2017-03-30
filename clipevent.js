registerClip();

function registerClip(){
	document.addEventListener('copy',onClipCallback,true);
	document.addEventListener('paste',onClipCallback,true);
	document.addEventListener('cut',onClipCallback,true);
}

function onClipCallback(e){
	chrome.runtime.sendMessage({event:e.type});
}