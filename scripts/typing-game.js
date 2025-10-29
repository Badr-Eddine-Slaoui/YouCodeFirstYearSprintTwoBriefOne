let lastScore = {
  wpm: localStorage.getItem("TypingGame_lastWPM") || 0,
  accuracy: localStorage.getItem("TypingGame_lastAccuracy") || 0,
};

document.getElementById("last_score").textContent = lastScore.wpm;

let failuresCount = 0;
let matchesCount = 0;
let wordAVG = 5;
let initialCooldown = (cooldown = 60);
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let typingParagraphArr = [
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem mollitia, dolore velit doloribus aliquid debitis voluptatibus minima culpa, distinctio voluptatum earum enim alias iste quam molestiae ut commodi rerum eveniet! Facere ipsum voluptatem, neque dicta in delectus eius. Maxime animi doloribus minus a nihil odio provident at consequuntur similique! Odio libero ipsam dolore officia sed dicta quo! Unde repellendus deserunt suscipit illum doloribus. Provident, repudiandae veritatis quaerat perferendis natus, nobis debitis nam facere cumque perspiciatis ipsum ab? Non nostrum incidunt, asperiores pariatur esse laboriosam possimus reprehenderit repellendus corporis odio. Distinctio placeat cum neque corporis ratione molestias quisquam eaque recusandae necessitatibus!",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima accusamus ipsam quibusdam necessitatibus iusto officia, nam corporis enim molestias? Possimus voluptatibus fuga mollitia! Consequuntur et sit corporis quibusdam qui? Ullam dolores illum animi, voluptatum aut veniam tenetur beatae aliquid nesciunt inventore rerum ut nihil! Rem quo, ad consequatur quasi distinctio repellat consectetur ipsa facere ipsam mollitia cupiditate harum officia impedit temporibus adipisci tempora nobis hic recusandae aut eum laboriosam minima consequuntur ex? Cum soluta temporibus repudiandae tempore quo qui adipisci ad consequuntur cumque iusto fugit eligendi magni, omnis, quaerat, eos necessitatibus. Impedit optio dolores velit facilis, similique laborum repudiandae iste exercitationem necessitatibus delectus eveniet iusto ab nulla quibusdam sed minus eaque sit. Nesciunt provident dolor deserunt optio inventore quo, architecto error vel tempore ipsum ducimus, repellat fuga perferendis quisquam autem consectetur accusamus quidem magni blanditiis fugiat ratione. Eveniet, ipsa non sequi, vel commodi quidem fuga ipsam itaque numquam necessitatibus incidunt?",
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos quaerat, ipsa labore vitae autem obcaecati culpa eum quae voluptatibus enim ipsam non quam tenetur quisquam provident fugit explicabo ut repudiandae error nulla ad neque dolores exercitationem. Iste alias delectus error, numquam dolor eaque, laudantium, illum voluptatibus id quia pariatur! Sed maxime perferendis officiis itaque minus adipisci nesciunt veritatis optio ea repellendus assumenda rem quisquam magnam, quae voluptatibus, minima fugiat? Illo sapiente veniam nisi veritatis animi odit ducimus dicta, at debitis optio accusamus non sint, unde maxime? Atque harum placeat mollitia? Illo cumque quaerat eos sint, unde odit. Quidem quaerat aliquam ex accusantium architecto delectus eius maxime voluptatem provident debitis deserunt facilis amet libero nulla obcaecati cum ducimus, sit adipisci nam magni. Modi hic sapiente cumque praesentium repudiandae! Velit, earum minima! Sit qui unde doloremque optio cupiditate officia in debitis laboriosam, minima aliquid necessitatibus, ipsam impedit amet saepe, harum id doloribus laborum sunt labore hic? Suscipit mollitia et dolores minima tempora nulla deserunt accusamus consequatur sequi asperiores eveniet itaque cupiditate dolorem, deleniti natus error velit consequuntur autem tempore totam doloremque, expedita commodi iusto a. Eligendi accusamus, quisquam natus doloribus consectetur quas? Incidunt quis asperiores eos pariatur cumque repudiandae vitae doloribus dignissimos.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, saepe! Velit molestias in nostrum. Saepe necessitatibus sint voluptatum dolorum nobis. Fugit possimus sed nihil exercitationem soluta tempore, minus deleniti quidem dolores? Iusto magni laboriosam quae molestiae sed non omnis itaque beatae nostrum atque blanditiis ipsam fuga architecto, eveniet ipsa libero perspiciatis ex a. Earum veritatis fugiat libero magnam ratione, quia, dolore ducimus dicta quae velit repellendus expedita ab officiis vitae tenetur. Officia nobis quisquam odit numquam fuga sint quas nulla debitis cum. Animi earum natus asperiores voluptate unde iusto fugiat, placeat distinctio doloribus necessitatibus, quisquam atque omnis sint accusantium accusamus tempore ad optio blanditiis expedita corrupti eligendi autem? Tempore accusantium facilis est. Ad, atque! Soluta ratione ex dolorem laborum aliquid a officia quam commodi dolore cupiditate libero sit hic et nisi optio, possimus deserunt nostrum itaque, culpa unde. Dicta, accusamus alias. Dicta tenetur suscipit autem sed laborum? Id maxime nesciunt, excepturi quam totam unde dignissimos tenetur non corporis ea quos officia porro ullam distinctio, qui nam beatae neque assumenda sunt dolorem earum saepe voluptatum repellendus commodi. Sit, sed excepturi eligendi maiores in tempora dignissimos amet debitis distinctio vel itaque facere sint necessitatibus doloribus libero harum. Voluptatem labore veniam eligendi quaerat est minima, quos perferendis repudiandae amet fugit ipsum possimus sapiente eveniet nihil dicta quis pariatur quod. Hic optio pariatur animi deleniti ut omnis beatae, eos, assumenda perspiciatis alias consequatur nostrum quaerat dolorem unde. Ipsum sapiente, cum dicta modi accusamus esse at. Reiciendis ad mollitia est magnam voluptas laborum, molestiae error cum laboriosam, consectetur commodi suscipit dolore. Atque officiis accusantium ea quaerat a laudantium fugiat consequuntur assumenda, inventore repellendus incidunt vel, sint amet aliquam iste dolorum facere recusandae magni maiores molestias repellat sequi dolor commodi. Illum, ipsa, quod maiores ea tempora eligendi quisquam doloribus accusamus rerum fuga nostrum labore laudantium cum?",
];

function randomParagraph() {
  let randomParagraph = Math.floor(Math.random() * typingParagraphArr.length);
  return typingParagraphArr[randomParagraph];
}

let paragraph = randomParagraph();

let letterIndex = 0;

document.addEventListener("keydown", function (event) {
  let key = event.key;
  if (key === "Shift") {
    return;
  }

  event.preventDefault();
  if (key === "Backspace") {
    if (letterIndex > 0) {
      letterIndex--;
      document
        .querySelector(`#letter-${letterIndex}`)
        .classList.remove("correct");
      document
        .querySelector(`#letter-${letterIndex}`)
        .classList.remove("wrong");
    }
  } else {
    console.log(key);
    console.log(paragraph.charAt(letterIndex));
    if (key === paragraph.charAt(letterIndex)) {
      document.querySelector(`#letter-${letterIndex}`).classList.add("correct");
      letterIndex++;
      matchesCount++;
    } else {
      document
        .querySelector(`#letter-${letterIndex}`)
        .classList.remove("correct");
      document.querySelector(`#letter-${letterIndex}`).classList.add("wrong");
      failuresCount++;
      letterIndex++;
    }
  }
});

function initializeParagraphWithSpans() {
  let paragraphWithSpans = "";
  for (let i = 0; i < paragraph.length; i++) {
    paragraphWithSpans += `<span id="letter-${i}">${paragraph[i]}</span>`;
  }
  document.querySelector(".typing-paragraph").innerHTML = paragraphWithSpans;
}

function startCooldown() {
  let minutes = Math.floor(cooldown / 60);
  let seconds = cooldown % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  document.querySelector(".minutes").textContent = minutes;
  document.querySelector(".seconds").textContent = seconds;
  cooldown--;
  if (cooldown == 0) {
    let wpm = Math.round(matchesCount / 5 / (initialCooldown / 60));
    let accuracy = Math.round((matchesCount / letterIndex) * 100);
    localStorage.setItem("TypingGame_lastWPM", wpm);
    localStorage.setItem("TypingGame_lastAccuracy", accuracy);
    window.location.href = "./typing-game-win.html";
  }
}

initializeParagraphWithSpans();

setInterval(startCooldown, 1000);
