var values = ["Mild", "Aggressive", "Vindictive"];
var defaultFilter = "Aggressive";

function sliderToFilter(value) {
	if (value < 125) {
		return values[0];
	} else if (value > 375) {
		return values[2];
	}
	return values[1];
}


function loadOptions(values) {
	var selectedFilter = localStorage["selectedFilter"];
	var sliderValue = localStorage["sliderValue"];

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
	$('#slider').slider("value", sliderValue);
	setDescriptions(values, selectedFilter);
}

function saveOptions() {
	var selectedFilter = $('#setting').text();
	var sliderValue = $('#slider').slider("value");
	_gaq.push(['_trackEvent', 'ChangeFilter', selectedFilter]);
	localStorage["selectedFilter"] = selectedFilter;
	localStorage["sliderValue"] = sliderValue;
}

function setDescriptions(values, selected) {
	for (key in values) {
		$('#' + values[key]).removeClass("descriptionShow").addClass("description");
	}
	$('#' + selected).removeClass("description").addClass("descriptionShow");
}