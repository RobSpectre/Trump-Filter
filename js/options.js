var values = ["Mild", "Aggressive", "Vindictive"];
var defaultFilter = "Aggressive";

function loadOptions() {
	var selectedFilter = localStorage["selectedFilter"];

	if (selectedFilter == undefined || (selectedFilter != "Mild" && selectedFilter != "default" && selectedFilter != "Vindictive")) {
		selectedFilter = defaultFilter;
	}
	
	$('#' + selectedFilter).addClass('selected');

	// Populate stats
	var pageCount = localStorage["pages"];
	var jeterCount = localStorage["jeters"];		
	if (isNaN(parseInt(pageCount)) || isNaN(parseInt(jeterCount))) {
		pageCount = 0;
		jeterCount = 0;
		localStorage["pages"] = 0;
		localStorage["jeters"] = 0;
	}
	$('#pagecount').text(pageCount);
	$('#jetercount').text(jeterCount);
}