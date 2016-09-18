(function() {
  var showPageAction = function(details) {
    chrome.pageAction.show(details.tabId);
  }
  var eventFilter = {url: [{hostSuffix: "beareyes.com.cn"}]};
  chrome.webNavigation.onCommitted.addListener(showPageAction, eventFilter);
  chrome.pageAction.onClicked.addListener(function(){chrome.tabs.create({url: "options.html", "active":true});});

  
  //block domain
  chrome.storage.sync.get(init_options(), function(items) {
    if (items.urlBlock && items.urlBlockList!="") {      
      var urlList = items.urlBlockList.split(",");
      for(key in urlList) { 
        urlList[key]="*://"+urlList[key]+"/*"; 
      };       
      chrome.webRequest.onBeforeRequest.addListener(
        function(details) { return {cancel: true}; },
        {urls: urlList},
        ["blocking"]
      );
     }
  });
})();

