const userNames = ["@sup_622", "@codec1012"];

function handleComment(color) {
  let comments = document.querySelectorAll("ytd-comment-renderer");

  comments.forEach((comment) => {
    let userNameElement = comment.querySelector("a#author-text");

    if (userNameElement) {
      let userName = userNameElement.textContent.trim();

      if (userNames.includes(userName)) {
        comment.style.backgroundColor = color;
      }
    }
  });
}

/*
// 댓글을 좋아요 수에 따라 정렬하는 함수
function sortComments() {
  // 모든 댓글 요소를 배열로 가져옴
  let comments = Array.from(
    document.querySelectorAll("ytd-comment-thread-renderer")
  );

  // 댓글을 좋아요 수에 따라 정렬
  comments.sort(function (a, b) {
    let likesA = parseInt(a.querySelector("#vote-count-middle").textContent.trim()) || 0;
    let likesB = parseInt(b.querySelector("#vote-count-middle").textContent.trim()) || 0;

    return likesB - likesA;
  });

  // 댓글 목록의 부모 요소를 찾음
  let parent = comments[0].parentNode;

  // 각 댓글에 대해
  comments.forEach(function (comment) {
    // 댓글을 숨김
    comment.style.display = "none";
    // 댓글을 부모 요소에 다시 추가
    parent.appendChild(comment);
    // 댓글을 보이게 함
    comment.style.display = "";
  });
}

// 키보드 이벤트 리스너를 추가
document.addEventListener("keydown", function (e) {
  // R키를 눌렀을 때
  if (e.key === "r" || e.key === "R") {
    // 댓글을 좋아요 수에 따라 정렬
    sortComments();
  }
});
*/

// 페이지 로드시 배경색을 변경
