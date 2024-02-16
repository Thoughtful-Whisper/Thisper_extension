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

function changeColor() {
  let comments = document.querySelectorAll("ytd-comment-renderer");

  comments.forEach((comment) => {
    comment.style.backgroundColor = "#FFD600";
  });
}
