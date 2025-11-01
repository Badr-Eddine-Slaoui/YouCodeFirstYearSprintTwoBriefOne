let initialCooldown = (cooldown = 60 * localStorage.getItem("TypingGame_cooldown") || 60);
let failuresCount = 0;
let matchesCount = 0;
let wordAVG = 5;
let letterIndex = 0;
let typingParagraphArr;

const getLastScore = () => {
  let bestScore = {
    wpm: localStorage.getItem("TypingGame_bestWPM") || 0,
    accuracy: localStorage.getItem("TypingGame_bestAccuracy") || 0,
  };

  document.getElementById("best_wpm").innerHTML = bestScore.wpm + " <span>wpm</span>";
  document.getElementById("best_accuracy").innerHTML = bestScore.accuracy + " <span>%</span>";
};

const randomParagraph = () => {
  let randomParagraph = Math.floor(Math.random() * typingParagraphArr.length);
  return typingParagraphArr[randomParagraph];
};

const initEvents = (paragraph) => {
  document.addEventListener("keydown", function (event) {
    let key = event.key;
    if (key === "Shift" || key === "CapsLock" || key === "Control" || key === "Alt" || key === "Escape" || key === "Tab" || key === "Enter") {
      return;
    }

    event.preventDefault();
    if (key === "Backspace") {
      if (letterIndex > 0) {
        if (document.querySelector(`#letter-${letterIndex}`).classList.contains("correct")) matchesCount--;
        letterIndex--;
        document
          .querySelector(`#letter-${letterIndex}`)
          .classList.remove("correct");
        document
          .querySelector(`#letter-${letterIndex}`)
          .classList.remove("wrong");
      }
    } else {
      if (key === paragraph.charAt(letterIndex)) {
        document
          .querySelector(`#letter-${letterIndex}`)
          .classList.add("correct");
        letterIndex++;
        matchesCount++;
      } else {
        document
          .querySelector(`#letter-${letterIndex}`)
          .classList.remove("correct");
        document.querySelector(`#letter-${letterIndex}`).classList.add("wrong");
        failuresCount++;
        document.getElementById("mistakes").textContent = failuresCount;
        letterIndex++;
      }
    }
  });
};

const initializeParagraphWithSpans = (paragraph) => {
  let paragraphWithSpans = "";
  for (let i = 0; i < paragraph.length; i++) {
    paragraphWithSpans += `<span id="letter-${i}">${paragraph[i]}</span>`;
  }
  document.querySelector(".typing-paragraph").innerHTML = paragraphWithSpans;
};

const startCooldown = () => {
  let minutesContainer = document.querySelector(".minutes");
  let secondsContainer = document.querySelector(".seconds");
  let minutes = Math.floor(cooldown / 60);
  let seconds = cooldown % 60;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutesContainer.textContent = minutes;
  secondsContainer.textContent = seconds;

  cooldown--;
  if (cooldown == 0) {
    let wpm = matchesCount !== 0 ? Math.round((matchesCount / 5) / (initialCooldown / 60)) : 0;
    let accuracy = matchesCount !== 0 && letterIndex !== 0 ? Math.floor((( matchesCount - failuresCount) / letterIndex) * 100).toFixed(1) : 0;
    localStorage.setItem("TypingGame_lastWPM", wpm);
    localStorage.setItem("TypingGame_lastAccuracy", accuracy);
    if (wpm > localStorage.getItem("TypingGame_bestWPM")) {
      localStorage.setItem("TypingGame_bestWPM", wpm);
    }
    if (accuracy > localStorage.getItem("TypingGame_bestAccuracy")) {
      localStorage.setItem("TypingGame_bestAccuracy", accuracy);
    }
    window.location.href = "./typing-game-win.html";
  }
};

const loadParagraphs = async () => {
  const res = await fetch("../data/typingParagraphs.json");
  const data = await res.json();
  getLastScore();

  typingParagraphArr = data.paragraphs;
  let paragraph = randomParagraph();

  initializeParagraphWithSpans(paragraph);
  initEvents(paragraph);
  setInterval(startCooldown, 1000);
};

loadParagraphs();
