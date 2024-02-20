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

// 초기화 함수 정의
function resetColors() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: function () {
        let comments = document.querySelectorAll("ytd-comment-renderer");
        // 모든 댓글의 배경색을 초기화
        comments.forEach((comment) => {
          comment.style.backgroundColor = "white";
        });
      },
    });
  });
}

// whisper-button 클릭 이벤트에 핸들러 연결
document
  .getElementById("whisper-button")
  .addEventListener("click", function () {
    // 현재 활성화된 탭 정보 가져오기
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const youtubeLink = tabs[0].url; // 현재 페이지의 URL 가져오기

      fetch("http://34.64.207.91:8080/connect/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: youtubeLink }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (Array.isArray(data.data)) {
            data.data.forEach((item) => {
              if (item.color != null) {
                handleButton([item.author], item.color);
              } else {
                console.error(
                  "Color is null or undefined for author",
                  item.author
                );
              }
            });
          } else {
            console.log("The response.data is not an array.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });

// loader-button 클릭 이벤트에 핸들러 연결
document.getElementById("loader-button").addEventListener("click", function () {
  resetColors();
});

// 페이지가 로드되면 이미지 클릭 이벤트에 핸들러 연결
window.onload = function () {
  // 클릭하면 chatbot 페이지로 이동
  document.querySelector("img").addEventListener("click", function () {
    window.location.href = chrome.runtime.getURL("../chatbot/chatbot.html");
  });
};
