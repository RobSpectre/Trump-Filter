var defaultFilter = "default";

function loadOptions() {
	var selectedFilter = localStorage["selectedFilter"];

	if (selectedFilter == undefined || (selectedFilter != "mild" && selectedFilter != "default" && selectedFilter != "vindictive")) {
		selectedFilter = defaultFilter;
	}

	var select = document.getElementById("filter");
	for (var i = 0; i < select.children.length; i++) {
		var child = select.children[i];
			if (child.value == selectedFilter) {
			child.selected = "true";
			break;
		}
	}
}

function saveOptions() {
	var select = document.getElementById("filter");
	var selectedFilter = select.children[select.selectedIndex].value;
	_gaq.push(['_trackEvent', 'ChangeFilter', selectedFilter]);
	localStorage["selectedFilter"] = selectedFilter;
}

function eraseOptions() {
	localStorage.removeItem("selectedFilter");
	location.reload();
}