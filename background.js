(function() {
	var showPageAction = function(details) {
		chrome.pageAction.show(details.tabId);
	}
	var eventFilter = {url: [{hostSuffix: "beareyes.com.cn"}]};
	chrome.webNavigation.onCommitted.addListener(showPageAction, eventFilter);
	chrome.pageAction.onClicked.addListener(function(){chrome.tabs.create({url: "options.html", "active":true});});

	
	//block domain
	chrome.webRequest.onBeforeRequest.addListener(
		function(details) { return {cancel: true}; },
		{urls: ["*://ad1.beareyes.com.cn/*","*://ji.beareyes.com.cn/*"]},
		["blocking"]
	);
})();

