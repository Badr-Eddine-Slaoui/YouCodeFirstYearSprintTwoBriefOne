let mindGameButton = document.getElementById("mind-game");
let typingGameButton = document.getElementById("typing-game");

mindGameButton.addEventListener("click", function () {
    window.location.href = "./pages/mind-game-difficulty.html";
});

typingGameButton.addEventListener("click", function () {
    window.location.href = "./pages/typing-game-cooldowns.html";
});