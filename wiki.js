
function saveData(type) {
  if (type.url.includes('wikipedia')) {
    sessionStorage[Date.now()] = type.url;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.windows.onRemoved.addListener(function (result) {
    const length = Object.keys(localStorage).length;
    localStorage[length] = JSON.stringify(JSON.stringify(sessionStorage)); // lazy k/v -> parsable string
  });

  chrome.history.onVisited.addListener(function (result) {
    saveData(result);
  });
});
