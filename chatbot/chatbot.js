/*초기 화면으로 이동*/
window.onload = function () {
  document.getElementById("back-button").addEventListener("click", function () {
    window.location.href = chrome.runtime.getURL("../popup/popup.html");
  });
};
