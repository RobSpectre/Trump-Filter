var values = ["Mild", "Aggressive", "Vindictive"];
var defaultFilter = "Aggressive";

function sliderToFilter(value) {
	if (value < 100) {
		return values[0];
	} else if (value > 400) {
		return values[2];
	}
	return values[1];
}

function filterToSlider(filter) {
	if (filter == values[0]) {
		return 50;
	} else if (filter == values[2]) {
		return 450;
	}
	return 250;
}

function loadOptions(values) {
	var selectedFilter = localStorage["selectedFilter"];

	if (selectedFilter == undefined || (selectedFilter != "Mild" && selectedFilter != "default" && selectedFilter != "Vindictive")) {
		selectedFilter = defaultFilter;
	}
	
	var i = 0;
	for (value in values) {
		if (values[value] === selectedFilter) {
			break;
		}
		i = i + 1;
	}
	//alert(values[i]);
	$('#setting').text(values[i]);
	$('#slider').slider("value", filterToSlider(values[i]));
}

function saveOptions() {
	var selectedFilter = $('#setting').text();
	_gaq.push(['_trackEvent', 'ChangeFilter', selectedFilter]);
	localStorage["selectedFilter"] = selectedFilter;
}