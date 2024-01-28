// content.js

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === "extractLinks") {
		const links = [];

		// Find the email body element, adjust the selector based on Gmail's current structure
		const emailBody = document.querySelector(".a3s"); // Example selector, might need adjustment

		if (emailBody) {
			// Find all links within the email body
			const bodyLinks = emailBody.querySelectorAll("a");

			// Extract href attribute from each link and add to the links array
			bodyLinks.forEach((link) => {
				links.push(link.href);
			});
		}

		// Send the extracted links back to the popup
		sendResponse({ links });
	}
});
