const userNames = ["@svt-jo4df", "@user-fn6lq5qs6z"];

function changeColor() {
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
}

function resetColor() {
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
}
