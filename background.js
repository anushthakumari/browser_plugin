chrome.webNavigation.onCompleted.addListener(function (details) {
	chrome.tabs.sendMessage(
		details.tabId,
		{ action: "getLinks" },
		function (response) {
			chrome.runtime.sendMessage({
				action: "updateApiResponse",
				apiResponse: response,
			});
		}
	);
});
