const getLastScore = () => {
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
}

const initEvents = () => {
  let againButton = document.getElementById("again");
  let difficultiesButton = document.getElementById("cooldowns");
  let mainButton = document.getElementById("main");

  againButton.addEventListener("click", () => {
    window.location.href = "./typing-game.html";
  });

  difficultiesButton.addEventListener("click", () => {
    window.location.href = "./typing-game-cooldowns.html";
  });

  mainButton.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
}

getLastScore();
initEvents();