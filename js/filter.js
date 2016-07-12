/*
 * pokemon Filter - Content Script
 * 
 * This is the primary JS file that manages the detection and filtration of pokemon from the web page.
 */

// Variables
var regex = /Pokemon/i;
var search = regex.exec(document.body.innerText);


// Functions
function filterMild() {
	console.log("Filtering pokemon with Mild filter...");
	return $(":contains('POKEMON'), :contains('Pokemon'), :contains('pokemon'), :contains('Pokémon, :contains('pokémon')").filter("h1,h2,h3,h4,h5,p,span,li");
}

function filterDefault () {
	console.log("Filtering pokemon with Default filter...");
	return $(":contains('POKEMON'), :contains('Pokemon'), :contains('pokemon), :contains('Pokémon, :contains('pokémon')").filter(":only-child").closest('div');
}

function filterVindictive() {
	console.log("Filtering pokemon with Vindictive filter...");
	return $(":contains('POKEMON'), :contains('Pokemon'), :contains('pokemon'), :contains('Pokémon, :contains('pokémon')").filter(":not('body'):not('html')");
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
   console.log("pokemon found on page! - Searching for elements...");
   chrome.storage.sync.get({
     filter: 'aggro',
   }, function(items) {
	   console.log("Filter setting stored is: " + items.filter);
	   elements = getElements(items.filter);
	   filterElements(elements);
	   chrome.runtime.sendMessage({method: "saveStats", pokemons: elements.length}, function(response) {
			  console.log("Logging " + elements.length + " pokemons."); 
		 });
	 });
  chrome.runtime.sendMessage({}, function(response) {});
}
