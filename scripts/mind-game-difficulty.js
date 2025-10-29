let lastScore = localStorage.getItem('MindGame_lastScore') || 0;

document.getElementById('last-score').textContent = lastScore;

let difficultyButtons = document.querySelectorAll('.btn');

difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        localStorage.setItem('MindGame_difficulty', button.id);
        window.location.href = './mind-game.html';
    });
});