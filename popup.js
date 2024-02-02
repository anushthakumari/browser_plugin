document.addEventListener("DOMContentLoaded", function () {
	// Retrieve API response from local storage
	chrome.storage.local.get(["apiResponse"], function (result) {
		alert(result.apiResponse.prediction);
		const responseContainer = document.getElementById("responseContainer");

		if (typeof result?.apiResponse?.prediction === "number") {
			responseContainer.textContent = `API Response: ${result.apiResponse.prediction}`;
		} else {
			responseContainer.textContent = "No response yet.";
		}
	});
});
