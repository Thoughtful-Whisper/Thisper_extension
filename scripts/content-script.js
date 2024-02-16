chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeColor") {
    let comments = document.querySelectorAll("ytd-comment-renderer");

    comments.forEach((comment) => {
      comment.style.backgroundColor = "#FFD600";
    });
  }
});
