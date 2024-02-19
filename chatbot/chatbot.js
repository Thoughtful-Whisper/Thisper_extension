/*초기 화면으로 이동*/
window.onload = function () {
  document.getElementById("back-button").addEventListener("click", function () {
    window.location.href = chrome.runtime.getURL("../popup/popup.html");
  });
};
var inputText = document.getElementById("input-text");

inputText.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});

inputText.addEventListener("keydown", function (event) {
  if (event.key == "Enter" && !event.shiftKey) {
    event.preventDefault();
    document.getElementById("send-button").click();
  }
});

document.getElementById("send-button").addEventListener("click", function () {
  var chatSpace = document.getElementById("chat-space");

  if (inputText.value.trim() !== "") {
    var userContainer = document.createElement("div");
    userContainer.className = "user-container";

    var userMessage = document.createElement("p");
    userMessage.textContent = inputText.value;
    userMessage.className = "user-message";
    userContainer.appendChild(userMessage);

    chatSpace.appendChild(userContainer);

    setTimeout(function () {
      var botContainer = document.createElement("div");
      botContainer.className = "bot-container";

      var botMessage = document.createElement("p");
      botMessage.textContent = "Thoughtful Whisper for you, Thisper";
      botMessage.className = "bot-message";
      botContainer.appendChild(botMessage);

      chatSpace.appendChild(botContainer);

      chatSpace.scrollTop = chatSpace.scrollHeight;
    }, 500);

    inputText.value = "";
    inputText.style.height = "auto";
  }
});
