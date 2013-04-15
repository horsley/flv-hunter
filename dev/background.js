
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

function url_match(url) {
	var sina_video = /iask.com\/\d+\.hlv/; //http://112.90.246.22/edge.v.iask.com/101670330.hlv?KID=sina,viask&Expires=1366128000&ssig=NtXvmOsn%2F0&wsiphost=ipdbm
	sina_video.test(url) && return true;

	//var iqiyi_video = /qiyi.com\/.*?\.f4v/ //http://183.61.178.204/videos2/amusement/20130415/7366d8ada8b6c2e25accbfc6ad4499cc.f4v?key=4be87aaf130a91b4&su=83390d2774fb79348a2cbca909e117d4&client=&z=&mi=7_392382_464738_766934c4d8d04c9c83a0b5df5220691f&bt=&ct=1&e=&tn=17288&range=0-1023&ran=0.6169338403269649
	//qiyi_video.test(url) && return true;

	var yinyuetai_video = /yinyuetai.com\/.*?\.flv/; //http://113.106.98.226/hc.yinyuetai.com/uploads/videos/common/737B013D62D10C916F8E267063AD26CD.flv?sc=68b4e3f0e14afbe0&br=786&ptp=mv&rd=yinyuetai.com
	yinyuetai_video.test(url) && return true;

	//var qq_video = /qq.com\/.*?\.mp4/; //http://112.90.14.24/vlive.qqvideo.tc.qq.com/h0012l8zwwn.p203.1.mp4?sdtfrom=v10&type=mp4&vkey=6F4662A7A57B4F7080C64E93FDF7CD7870C0013D897F14A7F5DE91119965A047A4EA4DED22721C8A&level=3&platform=1&br=31&fmt=sd&sp=0
	//qq_video.test(url) && return true;

	var common = /.*\.f4v/;
	common.test(url) && return true;

	return false;
}

//log flv response
chrome.webRequest.onHeadersReceived.addListener(function(details) {
	var is_mime_hit = false;

	//content-type matcher
	if (typeof details.responseHeaders !== undefined) {
		for (var i = 0; i < details.responseHeaders.length; i++) {
			if (details.responseHeaders[i].name.toLowerCase() === 'content-type') {
				if(details.responseHeaders[i].value.toLowerCase() === 'video/x-flv' ||
				   details.responseHeaders[i].value.toLowerCase() === 'video/f4v'	||
				   details.responseHeaders[i].value.toLowerCase() === 'video/mp4'
				) {
					is_mime_hit = true
					break;
				}
			}				
	    }
	}
	if (is_mime_hit || url_match(details.url)) {
		save_flv_url(details.url);
	}
	
}, {urls:['http://*/*', 'https://*/*']}, ["responseHeaders"]);

//show log
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({'url': chrome.extension.getURL('log.html')}, function(tab) {
	});
});