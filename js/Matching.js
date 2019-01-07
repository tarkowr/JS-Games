// Cards array holds cards
let card = document.getElementsByClassName("card")
let cards = [...card];

// All cards in game
const deck = document.getElementById("card-deck");

let moves = 0;
let counter = document.querySelector(".moves");

let modal = document.getElementById("modal");
let stats = document.getElementById("stats");
let close = document.getElementById("close");
let restart = document.getElementById("restart");

let matchedCard = document.getElementsByClassName("match");
let openedCards = [];
let cardsRemaining = cards.length;

const complete = cards.length;


//
// Function to shuffle the cards
//
function ShuffleCards(array){
    let currentIndex = array.length, tempValue, randIndex;

    while(currentIndex != 0){
        randIndex = Math.floor(Math.random() * currentIndex); // Get random card
        currentIndex -= 1; // Decrement counter
        tempValue = array[currentIndex]; //Save known card
        array[currentIndex] = array[randIndex]; //Set known card to random card
        array[randIndex] = tempValue; //Set index of random card to known card
    }
    return array;
}

//
// Start the game on body load
//
document.body.onload = StartGame();

//
// Start a new game (Setup)
//
function StartGame(){
    if(localStorage.Matching == null){
        localStorage.Matching = 0;
    }
    
    cards = ShuffleCards(cards); // Shuffle Deck

    for(let i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });

        cards[i].classList.remove("show", "open", "match", "disabled");
    }

    moves = 0;
    counter.innerHTML = moves;

    cardsRemaining = cards.length;
    document.getElementById("cards-left").innerHTML = cardsRemaining;
}

//
// Toggles open/show classes to display cards
//
let displayCard = function(){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

//
// Add all opened cards to a list to check if they are matching
//
function CardOpen(){
    openedCards.push(this);
    let length = openedCards.length;
    if(length==2){
        MoveCounter();
        if(openedCards[0].type === openedCards[1].type){
            Matched();
        }
        else{
            Unmatched();
        }
    }
};

//
// Event for when two opened cards match
//
function Matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
    cardsRemaining -=2;
    document.getElementById("cards-left").innerHTML = cardsRemaining;
}

//
// Event for when two opened cards do not match
//
function Unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    Disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        Enable();
        openedCards = [];
    }, 1100);
}

//
// Temporarily disable cards
//
function Disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add("disabled");
    });
}

//
// Temporarily enable cards
//
function Enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(let i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

//
// Count the player's moves
//
function MoveCounter(){
    moves++;
    counter.innerHTML = moves;
}

//
// Player Wins
//
function GameWon(){
    if(matchedCard.length === complete){
        CheckForNewHighScore(Scores.Matching, moves, ScoreType.LOW);

        modal.style.display = "block";
        text = "You matched all of the cards in <strong>" + moves + "</strong> moves! <br>";
        text += "Your Best Score is: " + GetScoreByName(Scores.Matching);
        stats.innerHTML = text;

        window.onclick = function(event) {
            if (event.target == modal || event.target == close) {
                modal.style.display = "none";
            }
        }
    }
}

//
// Add event listener to each card
//
for(let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", CardOpen);
    card.addEventListener("click", GameWon);
}

//
// Add event listener to restart button
//
restart.addEventListener("click", function(){
    modal.style.display = "none";
    StartGame();
});





