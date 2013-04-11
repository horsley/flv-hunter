
// Init
var flvUrlList = typeof(localStorage.flvUrlList)=='undefined' ? [] : JSON.parse(localStorage.flvUrlList);

// Functions
function in_array(needle, haystack) {
	for(key in haystack) if(haystack[key]==needle) return true;
	return false;
}

function save_flv_url(flv_url) {
	var time = new Date();
	var item = {
		url: flv_url,
		time: time.toLocaleString()
	}
	flvUrlList.push(item);
	localStorage.flvUrlList = JSON.stringify(flvUrlList);

}

//log flv response
chrome.webRequest.onHeadersReceived.addListener(function(details) {
	if (typeof details.responseHeaders !== undefined) {
		for (var i = 0; i < details.responseHeaders.length; i++) {
			if (details.responseHeaders[i].name.toLowerCase() === 'content-type') {
				if(details.responseHeaders[i].value.toLowerCase() === 'video/x-flv') {
					save_flv_url(details.url);
					break;
				}
			}				
	    }
	}
	
}, {urls:['http://*/*', 'https://*/*']}, ["responseHeaders"]);

//show log
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({'url': chrome.extension.getURL('log.html')}, function(tab) {
	});
});