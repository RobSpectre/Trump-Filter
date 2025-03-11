function onMessage(request, sender, sendResponse) {
  if (request.method == "saveStats") { 
    console.log("Storing stats...");
    console.log ("Adding " + request.trumps + " Trumps to stats.");
    chrome.storage.sync.get({
      trumps: 0,
      pages: 0
    }, function(items) {
      chrome.storage.sync.set({
        trumps: items.trumps + request.trumps,
        pages: items.pages + 1
      });
    });
    sendResponse({});
  } else {
    // Show icon
    console.log("Putting badge on address bar.");
    chrome.pageAction.show(sender.tab.id);
  }
}

chrome.runtime.onMessage.addListener(onMessage);
