let cooldowns = {
  easy: 1,
  medium: 2,
  hard: 5,
};

const initLastScores = () => {
  let lastScore = {
    wpm: localStorage.getItem("TypingGame_lastWPM") || 0,
    accuracy: localStorage.getItem("TypingGame_lastAccuracy") || 0,
  };

  document.getElementById(
    "wpm"
  ).innerHTML = `${lastScore.wpm} <span>wpm</span>`;
  document.getElementById(
    "accuracy"
  ).innerHTML = `${lastScore.accuracy} <span>%</span>`;
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

initLastScores();
initEvents();