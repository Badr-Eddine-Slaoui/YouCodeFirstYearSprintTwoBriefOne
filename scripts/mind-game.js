let easyModeContainerHeight = Math.round((parseFloat(window.getComputedStyle(document.getElementById("container")).height.replace("px", "")) / window.innerHeight) * 100) - 40;

let difficulty = localStorage.getItem("MindGame_difficulty") || "easy";
let lastScore = localStorage.getItem("MindGame_lastScore") || 0;
let score = 0;
let failuresCount = 0;
let matchesCount = 0;

let cardsArr;

let container = document.querySelector(".cards");
let loadingText = document.createElement("h1");

const initLoadingText = () => {
  loadingText.textContent = "Loading...";
  loadingText.style.gridColumn = "1 / 5";
  loadingText.style.height = "100%";
  loadingText.style.display = "flex";
  loadingText.style.justifyContent = "center";
  loadingText.style.alignItems = "center";
  loadingText.style.fontSize = "5rem";
  container.append(loadingText);
}

const loadCards = async () => {
  try {
    const res = await fetch("../data/cards.json");
    cardsArr = await res.json();
    loadingText.remove();
    initializeCards();
    showAllCardThenFlip();
    initEvents();
  } catch (err) {
    console.error("Error loading cards.json:", err);
  }
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const adjustDifficulty = () => {
  let newArr = [];
  let i = 0;
    if (difficulty === "easy") {
        document.getElementById("container").style.height = `${easyModeContainerHeight}vh`;
        if(window.innerWidth > 1200) {
            document.body.style.height = "100vh";
        }
    cardsArr.forEach((card) => {
      if (i < 6) {
        matchCard = cardsArr.find((c) => c.id === card.match);
        newArr.push(card);
        newArr.push(matchCard);
        i++;
      }
    });
    return shuffleArray(newArr);
  } else if (difficulty === "medium") {
    cardsArr.forEach((card) => {
      if (i < 10) {
        matchCard = cardsArr.find((c) => c.id === card.match);
        newArr.push(card);
        newArr.push(matchCard);
        i++;
      }
    });
    return shuffleArray(newArr);
  } else {
    return shuffleArray(cardsArr);
  }
}

const initializeCards = () => {
    const lastScoreElement = document.getElementById("last_score");
    lastScoreElement.textContent = lastScore + " pts";
    cardsArr = adjustDifficulty();
    const cardsContainer = document.querySelector(".cards");
    cardsArr.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      const innerElement = document.createElement("div");
      innerElement.classList.add("inner");
      cardElement.appendChild(innerElement);
      const frontImage = document.createElement("img");
      frontImage.src = card.front;
      frontImage.classList.add("front");
      const backImage = document.createElement("img");
      backImage.src = card.back;
      backImage.classList.add("back");
      cardElement.setAttribute("data-id", card.id);
      innerElement.appendChild(frontImage);
      innerElement.appendChild(backImage);
      cardsContainer.appendChild(cardElement);
    });
  const logicProtector = document.createElement("div");
  logicProtector.id = "logic-protector";
  logicProtector.style.display = "none";
  logicProtector.style.width = "100vw";
  logicProtector.style.height = "100vh";
  logicProtector.style.position = "absolute";
  logicProtector.style.top = "0";
  logicProtector.style.left = "0";
  logicProtector.style.zIndex = "10";
  document.body.insertAdjacentElement('afterbegin',logicProtector);
}

const showAllCardThenFlip = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.children[0].classList.add("rotate");
  });
  setTimeout(() => {
    cards.forEach((card) => {
      card.children[0].classList.remove("rotate");
    });
  }, 3000);
}

const initEvents = () => {
  let flippedCards = [];
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const logicProtector = document.getElementById("logic-protector");
      const inner = card.children[0];
      if (!inner.classList.contains("rotate")) {
        logicProtector.style.display = "block";
        card.children[0].classList.add("rotate");
        flippedCards.push(card);
        if (flippedCards.length === 2) {
          const firstCard = flippedCards[0];
          const secondCard = flippedCards[1];
          const firstCardId = firstCard.getAttribute("data-id");
          const secondCardId = secondCard.getAttribute("data-id");
          const firstCardMatch = cardsArr.find(
            (c) => c.id == firstCardId
          ).match;
          const secondCardMatch = cardsArr.find(
            (c) => c.id == secondCardId
          ).match;
          if (
            firstCardMatch === parseInt(secondCardId) &&
            secondCardMatch === parseInt(firstCardId)
          ) {
            score += 100;
            matchesCount++;
            flippedCards = [];
            if (matchesCount === cardsArr.length / 2) {
              setTimeout(() => {
                localStorage.setItem("MindGame_lastScore", score);
                window.location.href = "./mind-game-win.html";
              }, 1000);
            }
            logicProtector.style.display = "none";
            return;
          }
          setTimeout(() => {
            score -= 5;
            failuresCount++;
            firstCard.children[0].classList.remove("rotate");
            secondCard.children[0].classList.remove("rotate");
            flippedCards = [];
            logicProtector.style.display = "none";
          }, 500);
          return;
        } else {
          logicProtector.style.display = "none";
        }
      }
    });
  });
}

initLoadingText();
loadCards();
