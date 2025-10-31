const calculateGlobalScore = () => {
    let wpm_score = localStorage.getItem("TypingGame_lastWPM") || 0;
    let accuracy_score = localStorage.getItem("TypingGame_lastAccuracy") || 0;
    let last_score = localStorage.getItem("MindGame_lastScore") || 0;

    let global_score = parseFloat(
      (accuracy_score * 100) / wpm_score + last_score + wpm_score
    ).toFixed(2);
    document.getElementById("global-score").textContent = global_score + " pts";
}

const initEvents = () =>  {
    let typingGameButton = document.getElementById("typing-game");
    let mindGameButton = document.getElementById("mind-game");
    mindGameButton.addEventListener("click", function () {
      window.location.href = "./pages/mind-game-difficulty.html";
    });

    typingGameButton.addEventListener("click", function () {
      window.location.href = "./pages/typing-game-cooldowns.html";
    });
}

calculateGlobalScore();
initEvents();