document
  .getElementById("whisper-button")
  .addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: changeColor,
      });
    });
  });

document.getElementById("loader-button").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: resetColor,
    });
  });
});

function changeColor() {
  let comments = document.querySelectorAll("ytd-comment-renderer");

  comments.forEach((comment) => {
    comment.style.backgroundColor = "#FFD600";
  });
}

function resetColor() {
  let comments = document.querySelectorAll("ytd-comment-renderer");

  comments.forEach((comment) => {
    comment.style.backgroundColor = "";
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeColor") {
    changeColor();
  }
});
