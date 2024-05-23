//colors array, representing the colors for the cards in the memory match game
const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'red', 'blue', 'green', 'purple', 'orange', 'pink'];

//array that holds color values for the random cards
let cards = shuffle(colors.concat(colors));

//temporary storage for the currently selected cards during the game
let selectedCards = [];

//tracks the player's score throughout the game, incremented whenever the player matches a pair of cards successfully
let score = 0;

//represents the time remaining for the player to complete the game.
let timeLeft = 30;

//manages the game timer
let gameInterval;

const startbtn = document.getElementById("startbtn");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const gameContainer = document.getElementById("game-container");

function generateCards() {
    for(const color of cards) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.textContent = "?";
        gameContainer.appendChild(card);
    }
}

function shuffle(array) {
    for (let i = array.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i],array[j]] = [array[j], array[i]];
    }
    return array;
}

function handleCardClick(evenet) {
    const card = evenet.target;
    if(!card.classList.contains('card') || card.classList.contains('matched')){
        return;
    }

    card.textContent = card.dataset.color;
    cards.style.backgroundColor = card.dataset.color;
    selectedCards.push(card);
    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = selectedCards;
    
    if(card1.dataset.color === card2.dataset.color) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        score += 2;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        card1.textContent = '?';
        card2.textContent = '?';
        card1.style.backgroundColor = "#ddd";
        card2.style.backgroundColor = '#ddd';
    }

    selectedCards = []
}

function startGame() {
    let timeLeft = 30;
    startbtn.disabled = true
    score = 0; // Reset score to zero
    scoreElement.textContent = `Score: ${score}`;
    startGameTimer(timeLeft);
    cards = shuffle(colors.concat(colors));
    selectedCards = [];
    gameContainer.innerHTML = '';
    generateCards();
    gameContainer.addEventListener('click', handleCardClick);
}

function startGameTimer(timeLeft) {
    timerElement.textContent = `Time Left: ${timeLeft}`;
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}`;

        if{
            clearInterval(gameInterval);
            let timeLeft = 30;
            alert('Game Over !');
            startbtn.disabled = false;
        }

    }, 1000);
}

startbtn.addEventListener('click', startGame);