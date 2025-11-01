const getLastScore = () => {
    let lastScore = localStorage.getItem("MindGame_lastScore") || 0;
    document.getElementById("last-score").innerHTML = lastScore + " <span>pts</span>";
}

const initEvents = () => {
    let againButton = document.getElementById("again");
    let difficultiesButton = document.getElementById("difficulties");
    let mainButton = document.getElementById("main");

    againButton.addEventListener("click", () => {
      window.location.href = "./mind-game.html";
    });

    difficultiesButton.addEventListener("click", () => {
      window.location.href = "./mind-game-difficulty.html";
    });

    mainButton.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
}

getLastScore();
initEvents();