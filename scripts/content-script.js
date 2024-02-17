const userNames = ["@sup_622", "@codec1012"];

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

document.addEventListener("keydown", function (e) {
  // R키를 눌렀을 때 댓글 요소 모두 선택
  if (e.key === "r" || e.key === "R") {
    let comments = Array.from(
      document.querySelectorAll("ytd-comment-thread-renderer")
    );

    // 댓글 요소를 좋아요 수를 기준으로 정렬
    comments.sort(function (a, b) {
      let likesA =
        parseInt(a.querySelector("#vote-count-middle").textContent.trim()) || 0;
      let likesB =
        parseInt(b.querySelector("#vote-count-middle").textContent.trim()) || 0;

      return likesB - likesA;
    });

    // 댓글 목록의 부모 요소를 찾기
    let parent = comments[0].parentNode;

    // 댓글 목록의 부모 요소의 모든 자식 노드를 삭제
    while (parent.firstChild) {
      parent.firstChild.remove();
    }

    // 정렬된 댓글 요소를 부모 요소에 다시 추가
    comments.forEach(function (comment) {
      parent.appendChild(comment);
    });
  }
});
