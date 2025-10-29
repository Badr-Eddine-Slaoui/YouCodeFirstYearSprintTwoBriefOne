let easyModeContainerHeight =
  Math.round(
    (parseFloat(
      window
        .getComputedStyle(document.getElementById("container"))
        .height.replace("px", "")
    ) /
      window.innerHeight) *
      100
    ) - 40;

let difficulty = localStorage.getItem("MindGame_difficulty") || "easy";
let lastScore = localStorage.getItem("MindGame_lastScore") || 0;
let score = 0;
let failuresCount = 0;
let matchesCount = 0;
let cardsArr = [
  {
    id: 1,
    front: "../images/front.png",
    back: "../images/ana.webp",
    match: 17,
  },
  {
    id: 2,
    front: "../images/front.png",
    back: "../images/ftayza.webp",
    match: 18,
  },
  {
    id: 3,
    front: "../images/front.png",
    back: "../images/maria.webp",
    match: 19,
  },
  {
    id: 4,
    front: "../images/front.png",
    back: "../images/brahim.webp",
    match: 20,
  },
  {
    id: 5,
    front: "../images/front.png",
    back: "../images/lhindi.webp",
    match: 21,
  },
  {
    id: 6,
    front: "../images/front.png",
    back: "../images/reda.webp",
    match: 22,
  },
  {
    id: 7,
    front: "../images/front.png",
    back: "../images/ilyas.webp",
    match: 23,
  },
  {
    id: 8,
    front: "../images/front.png",
    back: "../images/ilias.webp",
    match: 24,
  },
  {
    id: 9,
    front: "../images/front.png",
    back: "../images/amine.webp",
    match: 16,
  },
  {
    id: 10,
    front: "../images/front.png",
    back: "../images/bsar.webp",
    match: 15,
  },
  {
    id: 11,
    front: "../images/front.png",
    back: "../images/hamid.webp",
    match: 14,
  },
  {
    id: 12,
    front: "../images/front.png",
    back: "../images/abdelhadi.webp",
    match: 13,
  },
  {
    id: 13,
    front: "../images/front.png",
    back: "../images/abdelhadi.webp",
    match: 12,
  },
  {
    id: 14,
    front: "../images/front.png",
    back: "../images/hamid.webp",
    match: 11,
  },
  {
    id: 15,
    front: "../images/front.png",
    back: "../images/bsar.webp",
    match: 10,
  },
  {
    id: 16,
    front: "../images/front.png",
    back: "../images/amine.webp",
    match: 9,
  },
  {
    id: 17,
    front: "../images/front.png",
    back: "../images/ana.webp",
    match: 1,
  },
  {
    id: 18,
    front: "../images/front.png",
    back: "../images/ftayza.webp",
    match: 2,
  },
  {
    id: 19,
    front: "../images/front.png",
    back: "../images/maria.webp",
    match: 3,
  },
  {
    id: 20,
    front: "../images/front.png",
    back: "../images/brahim.webp",
    match: 4,
  },
  {
    id: 21,
    front: "../images/front.png",
    back: "../images/lhindi.webp",
    match: 5,
  },
  {
    id: 22,
    front: "../images/front.png",
    back: "../images/reda.webp",
    match: 6,
  },
  {
    id: 23,
    front: "../images/front.png",
    back: "../images/ilyas.webp",
    match: 7,
  },
  {
    id: 24,
    front: "../images/front.png",
    back: "../images/ilias.webp",
    match: 8,
  },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function adjustDifficulty() {
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

function initializeCards() {
    const lastScoreElement = document.getElementById("last_score");
    lastScoreElement.textContent = lastScore;
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
}

function showAllCardThenFlip() {
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

initializeCards();
showAllCardThenFlip();

let flippedCards = [];
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("click", () => {
    const inner = card.children[0];
    if (!inner.classList.contains("rotate")) {
      card.children[0].classList.add("rotate");
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        const firstCard = flippedCards[0];
        const secondCard = flippedCards[1];
        const firstCardId = firstCard.getAttribute("data-id");
        const secondCardId = secondCard.getAttribute("data-id");
        const firstCardMatch = cardsArr.find((c) => c.id == firstCardId).match;
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
          return;
        }
        setTimeout(() => {
          score -= 5;
          failuresCount++;
          firstCard.children[0].classList.remove("rotate");
          secondCard.children[0].classList.remove("rotate");
          flippedCards = [];
        }, 1000);
        return;
      }
    }
  });
});
