const userNames = ["@svt-jo4df", "@user-fn6lq5qs6z"];

document
  .getElementById("whisper-button")
  .addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: function (userNames) {
          let comments = document.querySelectorAll("ytd-comment-renderer");

          comments.forEach((comment) => {
            let userNameElement = comment.querySelector("a#author-text");

            if (userNameElement) {
              let userName = userNameElement.textContent.trim();

              if (userNames.includes(userName)) {
                comment.style.backgroundColor = "#FFD600";
              }
            }
          });
        },
        args: [userNames],
      });
    });
  });

document.getElementById("loader-button").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: function (userNames) {
        let comments = document.querySelectorAll("ytd-comment-renderer");

        comments.forEach((comment) => {
          let userNameElement = comment.querySelector("a#author-text");

          if (userNameElement) {
            let userName = userNameElement.textContent.trim();

            if (userNames.includes(userName)) {
              comment.style.backgroundColor = "";
            }
          }
        });
      },
      args: [userNames],
    });
  });
});
