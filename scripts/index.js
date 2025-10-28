let mindGameButton = document.getElementById("mind-game");
let typingGameButton = document.getElementById("typing-game");

mindGameButton.addEventListener("click", function () {
    window.location.href = "./mind-game.html";
});

typingGameButton.addEventListener("click", function () {
    window.location.href = "./typing-game.html";
});