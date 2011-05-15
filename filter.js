var regex = /Jeter/;

var search = regex.exec(document.body.innerText);

if (search) {
   console.log("No. 2 found on page! - Searching for elements...");
   divs = $(":contains('Jeter'):not('body'):not('html'):not('div')").closest('div');
   console.log("Divs found: ", divs);
   divs.fadeOut("fast");
  chrome.extension.sendRequest({}, function(response) {});
}