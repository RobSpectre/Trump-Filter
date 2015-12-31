/*
 * Sanders Filter - Content Script
 * 
 * This is the primary JS file that manages the detection and filtration of Bernie Sanders from the web page.
 */

// Variables
var regex = /Sanders/i;
var search = regex.exec(document.body.innerText);


// Functions
function filterMild() {
	console.log("Filtering Sadners with Mild filter...");
	return $(":contains('Sanders'), :contains('SANDERS'), :contains('sanders')").filter("h1,h2,h3,h4,h5,p,span,li");
}

function filterDefault () {
	console.log("Filtering Sanders with Default filter...");
	return $(":contains('Sanders'), :contains('SANDERS'), :contains('sanders')").filter(":only-child").closest('div');
}

function filterVindictive() {
	console.log("Filtering Sanders with Vindictive filter...");
	return $(":contains('Sanders'), :contains('SANDERS'), :contains('sanders')").filter(":not('body'):not('html')");
}

function getElements(filter) {
   if (filter == "mild") {
	   return filterMild();
   } else if (filter == "vindictive") {
	   return filterVindictive();
   } else {
	   return filterDefault();
   }
}

function filterElements(elements) {
	console.log("Elements to filter: ", elements);
	elements.fadeOut("fast");
}


// Implementation
if (search) {
   console.log("Bernie Sanders found on page! - Searching for elements...");
   chrome.storage.sync.get({
     filter: 'aggro',
   }, function(items) {
	   console.log("Filter setting stored is: " + items.filter);
	   elements = getElements(items.filter);
	   filterElements(elements);
	   chrome.runtime.sendMessage({method: "saveStats", sanders: elements.length}, function(response) {
			  console.log("Logging " + elements.length + " sanders."); 
		 });
	 });
  chrome.runtime.sendMessage({}, function(response) {});
}
