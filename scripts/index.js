const calculateTotalScore = () => {
  let wpm_score = parseInt(localStorage.getItem("TypingGame_bestWPM")) || 0;
  let best_score = parseInt(localStorage.getItem("MindGame_bestScore")) || 0;
  let accuracy_score = parseInt(localStorage.getItem("TypingGame_bestAccuracy")) || 0;

  let total_score = best_score + (wpm_score !== 0 && accuracy_score !== 0 ? ((accuracy_score * (wpm_score * 5)) / 100) : 0);
  document.getElementById("total-score").innerHTML = total_score + " <span>pts</span>";
};

const initEvents = () => {
  let typingGameButton = document.getElementById("typing-game");
  let mindGameButton = document.getElementById("mind-game");
  let connectFourButton = document.getElementById("connect-four");
  mindGameButton.addEventListener("click", function () {
    window.location.href = "./pages/mind-game-difficulty.html";
  });

  typingGameButton.addEventListener("click", function () {
    window.location.href = "./pages/typing-game-cooldowns.html";
  });

  connectFourButton.addEventListener("click", function () {
    window.location.href = "./connectFourGame/index.html";
  });
};

calculateTotalScore();
initEvents();