function saveOptions() {
  var selectedFilter = document.getElementById('selectedFilter').value;

  chrome.storage.sync.set({
    filter: selectedFilter
  }, function() {
    var status = document.getElementById('saveMessage');
    status.textContent = 'Filter selected - ' + selectedFilter;
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function getOptions(callback) {
  chrome.storage.sync.get({
    filter: 'aggro',
    pokemons: 0,
    pages: 0
  }, function(items) {
    document.getElementById('selectedFilter').value = items.filter;
    document.getElementById('pokemoncount').textContent = items.pokemons;
    document.getElementById('pagecount').textContent = items.pages;
    callback(items.filter);
    return items.filter;
  });
}

function restoreOptions() {
  getOptions(function(filter) {
    document.getElementById('selectedFilter').value = filter;
  });
  document.getElementById('selectedFilter').addEventListener('change', saveOptions);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
