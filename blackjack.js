class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    getValue() {
        if (['J', 'Q', 'K'].includes(this.rank)) return 10;
        if (this.rank === 'A') return 11; // Ace handling done later
        return parseInt(this.rank);
    }

    toString() {
        return `${this.rank} of ${this.suit}`;
    }

    getImagePath() {
        return `${this.suit.toLowerCase()}_${this.rank}.png`;
    }
}

class Deck {
    constructor() {
        this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.cards = [];
        this.initializeDeck();
    }

    initializeDeck() {
        this.suits.forEach(suit => {
            this.ranks.forEach(rank => {
                this.cards.push(new Card(rank, suit));
            });
        });
        this.shuffle();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    deal() {
        return this.cards.pop();
    }
}

class Blackjack {
    constructor() {
        this.deck = new Deck();
        this.playerHand = [];
        this.dealerHand = [];
        this.gameOver = false;
        this.startGame();
    }

    startGame() {
        this.displayMessage("Welcome to Blackjack!");
        this.playerHand.push(this.deck.deal(), this.deck.deal());
        this.dealerHand.push(this.deck.deal(), this.deck.deal());

        this.showHands(true);
        document.getElementById("hit-button").style.display = "inline";
        document.getElementById("stand-button").style.display = "inline";
    }

    calculateHand(hand) {
        let total = 0;
        let aces = 0;

        hand.forEach(card => {
            total += card.getValue();
            if (card.rank === 'A') aces++;
        });

        while (total > 21 && aces > 0) {
            total -= 10;
            aces--;
        }

        return total;
    }

    showHands(hideDealer = false) {

    const delayCard = (images, delayTime, gameOutput) => {
        images.forEach((img, index) => {
            setTimeout(() => {
                gameOutput.appendChild(img); // Add the card image to the game output
            }, delayTime * index); // Delay each card by 'delayTime' * index
        });
    };

    let playerImages = this.playerHand.map(card => {
        let img = document.createElement('img');
        img.src = `cards/${card.getImagePath()}`;
        img.alt = card.toString();
        img.style.width = '50px'; // Set the size as needed
        img.style.marginBottom = '10px';
        return img;
    });

    let dealerImages = hideDealer
        ? [this.dealerHand[0]].map(card => {
            let img = document.createElement('img');
            img.src = 'cards/back.jpeg';
            img.alt = 'Hidden Card';
            img.style.width = '50px'; // Set the size as needed
            img.style.marginBottom = '10px';
            return img;
        })
        : this.dealerHand.map(card => {
            let img = document.createElement('img');
            img.src = `cards/${card.getImagePath()}`;
            img.alt = card.toString();
            img.style.width = '50px'; // Set the size as needed
            img.style.marginBottom = '10px';
            return img;
        });

        // Clear the previous content
        const gameOutput = document.getElementById('game-output');
        gameOutput.innerHTML = '';
	gameOutput.innerHTML += `<br>`; 

        // Add labels and images for player and dealer to the output container
        let playerLabel = document.createElement('div');
        playerLabel.innerText = 'Your Hand:';
	playerLabel.classList.add('hand-title');
        gameOutput.appendChild(playerLabel);

        playerImages.forEach(img => gameOutput.appendChild(img));

        gameOutput.innerHTML += `<br>`; //

        let dealerLabel = document.createElement('div');
        dealerLabel.innerText = 'Dealer\'s Hand:';
	dealerLabel.classList.add('hand-title');
        gameOutput.appendChild(dealerLabel);

        dealerImages.forEach(img => gameOutput.appendChild(img));
	gameOutput.innerHTML += `<br>`;
    }

    playerHit() {
        if (this.gameOver) return;
        this.playerHand.push(this.deck.deal());
        this.showHands(true);

        if (this.calculateHand(this.playerHand) > 21) {
            this.displayMessage("Bust! You lose.");
            this.endGame();
        }
    }

    playerStand() {
        if (this.gameOver) return;
        this.displayMessage("You chose to stand.");
        this.dealerTurn();
    }

    dealerTurn() {
        this.displayMessage("Dealer reveals hand...");
        this.showHands(false);

        while (this.calculateHand(this.dealerHand) < this.calculateHand(this.playerHand) && this.calculateHand(this.dealerHand) < 21) {
            this.displayMessage("Dealer hits...");
            this.dealerHand.push(this.deck.deal());
            this.showHands(false);
        }

        this.determineWinner();
    }

    determineWinner() {
        let playerTotal = this.calculateHand(this.playerHand);
        let dealerTotal = this.calculateHand(this.dealerHand);

        if (dealerTotal > 21) {
            this.displayMessage("Dealer busts! You win!");
        } else if (playerTotal > dealerTotal) {
            this.displayMessage("You win!");
        } else if (playerTotal < dealerTotal) {
            this.displayMessage("Dealer wins!");
        } else {
            this.displayMessage("It's a tie!");
        }
        this.endGame();
    }

    endGame() {
        this.gameOver = true;
        document.getElementById("hit-button").style.display = "none";
        document.getElementById("stand-button").style.display = "none";
    }

    displayMessage(message) {
    let messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('game-message'); // Add the new class for styling
    document.getElementById('game-output').appendChild(messageElement);
    }
}

let blackjackGame = null;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("hit-button").addEventListener("click", function () {
        if (blackjackGame) {
            blackjackGame.playerHit();
        } else {
            console.error("Blackjack game not started.");
        }
    });

    document.getElementById("stand-button").addEventListener("click", function () {
        if (blackjackGame) {
            blackjackGame.playerStand();
        } else {
            console.error("Blackjack game not started.");
        }
    });

    document.getElementById("start-button").addEventListener("click", function () {
        document.getElementById('game-output').innerHTML = ""; // Clear output
        blackjackGame = new Blackjack();
    });
});