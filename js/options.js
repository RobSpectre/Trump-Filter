function saveOptions() {
  var selectedFilter = document.getElementById('selectedFilter').value;

  chrome.storage.sync.set({
    filter: selectedFilter
  }, function(items) {
    var status = document.getElementById('saveMessage');
    status.textContent = 'Filter selected - ' + items.filter; 
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function getOptions(callback) {
  chrome.storage.sync.get({
    filter: 'aggro',
    sanders: 0,
    pages: 0
  }, function(items) {
    document.getElementById('selectedFilter').value = items.filter;
    document.getElementById('sanderscount').textContent = items.sanders;
    document.getElementById('pagecount').textContent = items.pages;
    callback(items.filter);
    return items.filter;
  });
}

function restoreOptions() {
  getOptions(function(filter) {
    document.getElementById('selectedFilter').value = filter;
  });
  document.getElementById('selectedFilter').addEventListener('click', saveOptions);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
