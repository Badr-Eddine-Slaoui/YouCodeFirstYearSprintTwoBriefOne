let cooldowns = {
  easy: 1,
  medium: 2,
  hard: 5,
};

const initBestScores = () => {
  let bestScore = {
    wpm: localStorage.getItem("TypingGame_bestWPM") || 0,
    accuracy: localStorage.getItem("TypingGame_bestAccuracy") || 0,
  };

  document.getElementById(
    "wpm"
  ).innerHTML = `${bestScore.wpm} <span>wpm</span>`;
  document.getElementById(
    "accuracy"
  ).innerHTML = `${bestScore.accuracy} <span>%</span>`;
};

const initEvents = () => {
    let cooldownButtons = document.querySelectorAll(".btn");

    cooldownButtons.forEach((button) => {
      button.addEventListener("click", () => {
        localStorage.setItem("TypingGame_cooldown", cooldowns[button.id]);
        window.location.href = "./typing-game.html";
      });
    });
}

initBestScores();
initEvents();