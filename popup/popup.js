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

//말풍선 이미지 변경
let image0 = document.getElementById("image0");
let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");
let image3 = document.getElementById("image3");
let image4 = document.getElementById("image4");
let image5 = document.getElementById("image5");
let image6 = document.getElementById("image6");
let image7 = document.getElementById("image7");

let images = [
  null,

  image1,
  image0,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
];
let index = 0;
let isError = false;
let isWaiting = false;
let intervalId;

function rotateImages() {
  // 모든 이미지를 none
  image0.style.display = "none";
  image1.style.display = "none";
  image2.style.display = "none";
  image3.style.display = "none";
  image4.style.display = "none";
  image5.style.display = "none";
  image6.style.display = "none";
  image7.style.display = "none";

  if (isError) {
    if (index === 3) {
      image3.style.display = "block";
    } else if (index === 4) {
      image4.style.display = "block";
    }
    isError = false;
    index = 0;
  } else if (isWaiting) {
    image5.style.display = "block";
  } else if (index === 6) {
    image6.style.display = "block";
    index = 0;
  } else if (index === 7) {
    image7.style.display = "block";
    index = 0;
  } else {
    if (images[index]) images[index].style.display = "block";
    index = (index + 1) % 4;
  }
}
intervalId = setInterval(rotateImages, 3000);

document
  .getElementById("whisper-button")
  .addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const youtubeLink = tabs[0].url;

      document.getElementById("whisper-button").innerHTML =
        "Waiting for response<div class='loader'></div>";
      document.querySelector(".loader").style.display = "block";
      isWaiting = true;

      fetch("http://34.64.207.91:8080/connect/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: youtubeLink }),
      })
        .then((response) => {
          document.getElementById("whisper-button").innerHTML =
            "Do whisper<div class='loader'></div>";
          document.querySelector(".loader").style.display = "none";
          isWaiting = false; // 'Waiting for response' 상태가 끝난 후에 isWaiting을 false로 설정
          index = 6; // 'Waiting for response' 상태가 끝난 후에 index를 6으로 설정
          rotateImages();

          setTimeout(() => {
            // 일정 시간 후에 index를 0으로 설정
            index = 0;
            rotateImages();
          }, 5000);

          if (
            !response.ok ||
            response.headers.get("Content-Type") !== "application/json"
          ) {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }

          return response.json();
        })
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
            isError = true;
            index = 3;
            rotateImages();
          }
        })
        .catch((error) => {
          document.getElementById("whisper-button").innerHTML =
            "Do whisper<div class='loader'></div>";
          document.querySelector(".loader").style.display = "none";
          console.error("Error:", error);

          if (error.message.includes("Field required")) {
            isError = true;
            index = 4;
            rotateImages();
          }
        });
    });
  });

// reset-button 클릭 이벤트에 핸들러 연결
document.getElementById("reset-button").addEventListener("click", function () {
  resetColors();
  index = 7;
  rotateImages();
});

// 페이지가 로드되면 이미지 클릭 이벤트에 핸들러 연결
window.onload = function () {
  // 클릭하면 chatbot 페이지로 이동
  document.querySelector("img").addEventListener("click", function () {
    window.location.href = chrome.runtime.getURL("../chatbot/chatbot.html");
  });
};
