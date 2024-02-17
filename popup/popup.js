document
  .getElementById("whisper-button")
  .addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: function () {
          let comments = document.querySelectorAll("ytd-comment-renderer");

          comments.forEach((comment) => {
            let userNameElement = comment.querySelector("a#author-text");

            if (userNameElement) {
              let userName = userNameElement.textContent.trim();

              if (userName === "@svt-jo4df") {
                comment.style.backgroundColor = "#FFD600";
              }
            }
          });
        },
      });
    });
  });

document.getElementById("loader-button").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: function () {
        let comments = document.querySelectorAll("ytd-comment-renderer");

        comments.forEach((comment) => {
          let userNameElement = comment.querySelector("a#author-text");

          if (userNameElement) {
            let userName = userNameElement.textContent.trim();

            if (userName === "@svt-jo4df") {
              comment.style.backgroundColor = "";
            }
          }
        });
      },
    });
  });
});
