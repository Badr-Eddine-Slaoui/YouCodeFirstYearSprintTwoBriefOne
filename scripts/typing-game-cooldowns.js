let lastScore = {
    wpm: localStorage.getItem('TypingGame_lastWPM') || 0,
    accuracy: localStorage.getItem('TypingGame_lastAccuracy') || 0
};

let cooldowns = {
    "easy": 1,
    "medium": 2,
    "hard": 5
};

document.getElementById('wpm').textContent = lastScore.wpm;
document.getElementById('accuracy').textContent = lastScore.accuracy;

let cooldownButtons = document.querySelectorAll('.btn');

cooldownButtons.forEach(button => {
    button.addEventListener('click', () => {
        localStorage.setItem('TypingGame_cooldown', cooldowns[button.id]);
        window.location.href = './typing-game.html';
    });
});