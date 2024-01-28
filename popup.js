// popup.js

document
	.getElementById("extractLinksButton")
	.addEventListener("click", function () {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(
				tabs[0].id,
				{ action: "extractLinks" },
				function (response) {
					// Handle or display the links received from the content script
					alert(response.links);
				}
			);
		});
	});
