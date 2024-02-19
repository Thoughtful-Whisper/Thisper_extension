let youtubeLink = "https://www.youtube.com/watch?v=75kySTFaBQQ&list=TLPQMTgwMjIwMjSvOLiFe6iI7Q&index=1";

fetch("http://34.64.207.91:8080/youtube/link/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ link: youtubeLink }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => {
    console.error("Error:", error);
  });
