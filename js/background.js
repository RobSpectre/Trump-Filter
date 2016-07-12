function onMessage(request, sender, sendResponse) {
  if (request.method == "saveStats") { 
    chrome.storage.sync.get({
      pokemons: 0,
      pages: 0
    }, function(items) {
      chrome.storage.sync.set({
        pokemons: items.pokemons + request.pokemons,
        pages: items.pages + 1
      });
    });
    sendResponse({});
  } else {
    // Show icon
    chrome.pageAction.show(sender.tab.id);
    chrome.storage.sync.get({
      filter: 'aggro'
    });
    sendResponse({});
  }
}

chrome.runtime.onMessage.addListener(onMessage);
