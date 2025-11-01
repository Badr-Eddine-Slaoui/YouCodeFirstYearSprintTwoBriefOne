const getBestScore = () => {
  let bestScore = localStorage.getItem("MindGame_bestScore") || 0;
  document.getElementById("best-score").innerHTML =
    bestScore + " <span>pts</span>";
};

const initEvents = () => {
  let difficultyButtons = document.querySelectorAll(".btn");

  difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.setItem("MindGame_difficulty", button.id);
      window.location.href = "./mind-game.html";
    });
  });
};

getBestScore();
initEvents();
