var values = ["Mild", "Aggressive", "Vindictive"];
var defaultFilter = "Aggressive";

function loadOptions(values) {
	var selectedFilter = localStorage["selectedFilter"];

	if (selectedFilter == undefined || (selectedFilter != "Mild" && selectedFilter != "default" && selectedFilter != "Vindictive")) {
		selectedFilter = defaultFilter;
	}

	$('#' + selectedFilter).addClass("selected");
}

function saveOptions(value) {
	_gaq.push(['_trackEvent', 'ChangeFilter', value]);
	localStorage["selectedFilter"] = value;
}