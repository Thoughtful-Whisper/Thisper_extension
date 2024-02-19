// 버튼 클릭 이벤트 핸들러 함수 정의
function handleButton(userNames, color) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: function (userNames, color) {
        let comments = document.querySelectorAll("ytd-comment-renderer");

        // 변경할 사용자 아이디에 따라 사용자 아이디 요소 탐색
        comments.forEach((comment) => {
          let userNameElement = comment.querySelector("a#author-text");

          if (userNameElement) {
            let userName = userNameElement.textContent.trim();

            // 사용자 이름이 변경 대상 사용자 이름 배열에 포함되어 있는지 확인
            if (userNames.includes(userName)) {
              comment.style.backgroundColor = color;
            }
          }
        });
      },
      // 스크립트에 매개변수로 사용자 이름 목록과 color를 전달
      args: [userNames, color],
    });
  });
}

// whisper-button 클릭 이벤트에 핸들러 연결
// 사용자가 'do whisper' 버튼을 클릭하면, 크롤링을 요청하고, 크롤링 결과를 바탕으로 댓글의 온도(?)를 판단하여 색상을 결정
document
  .getElementById("whisper-button")
  .addEventListener("click", function () {
    // 현재 활성화된 탭 정보 가져오기
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = tabs[0].url; // 현재 페이지의 URL 가져오기

      const apiUrl = "http://localhost:3000/comments";

      // 크롤링을 시작하라는 요청을 API에 전송
      // 요청 본문에 현재 페이지의 URL 추가
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startCrawling: true, url: currentUrl }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          data.users.forEach((item) => {
            const userNames = [item.id];
            const color = item.color;
            handleButton(userNames, color);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });

// loader-button 클릭 이벤트에 핸들러 연결
// 클릭하면 배경색을 초기화
document.getElementById("loader-button").addEventListener("click", function () {
  handleButton("red");
});

// 페이지가 로드되면 이미지 클릭 이벤트에 핸들러 연결
window.onload = function () {
  // 클릭하면 chatbot 페이지로 이동
  document.querySelector("img").addEventListener("click", function () {
    window.location.href = chrome.runtime.getURL("../chatbot/chatbot.html");
  });
};
