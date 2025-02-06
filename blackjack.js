class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    getValue() {
        if (['J', 'Q', 'K'].includes(this.rank)) return 10;
        if (this.rank === 'A') return 11;
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
        this.cards = [];
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
    constructor(displayMessage) {
    	this.displayMessage = displayMessage;
    	this.resetGame();
    }

    resetGame() {
        this.deck = new Deck();
        this.playerHand = [];
        this.dealerHand = [];
        this.gameOver = false;
        this.clearMessages();
        this.startGame();
    }

    clearMessages() {
        document.getElementById('game-output').innerHTML = '';
    }

    startGame() {
        document.getElementById("start-button").disabled = true;
        document.getElementById("hit-button").style.display = "inline";
        document.getElementById("stand-button").style.display = "inline";
        document.getElementById("hit-button").disabled = true;
        document.getElementById("stand-button").disabled = true;
        let delay = 0;

        setTimeout(() => {
            document.getElementById("hit-button").disabled = false;
            document.getElementById("stand-button").disabled = false;
        }, 2400);
        
        setTimeout(() => {
            this.playerHand.push(this.deck.deal());
            this.showHands(false);
        }, delay);
        delay += 800;
    
        setTimeout(() => {
            this.playerHand.push(this.deck.deal());
            this.showHands(false);
        }, delay);
        delay += 800;
    
        setTimeout(() => {
            this.dealerHand.push(this.deck.deal());
            this.showHands(true);
        }, delay);
        delay += 800;
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
    let playerImages = this.playerHand.map(card => {
        let img = document.createElement('img');
        img.src = `cards/${card.getImagePath()}`;
        img.alt = card.toString();
        img.style.width = '90px'; // Set the size as needed
        img.style.marginBottom = '10px';
        img.classList.add('player-card'); // Add a unique class for player cards
        return img;
    });

    let dealerImages = hideDealer
        ? [this.dealerHand[0]].map(card => {
            let img = document.createElement('img');
            img.src = 'cards/back.jpeg';
            img.alt = 'Hidden Card';
            img.style.width = '90px'; // Set the size as needed
            img.style.marginBottom = '10px';
            img.classList.add('dealer-card'); // Add class for dealer cards
            return img;
        })
        : this.dealerHand.map((card, index) => {
            let img = document.createElement('img');
            img.src = `cards/${card.getImagePath()}`;
            img.alt = card.toString();
            img.style.width = '90px'; // Set the size as needed
            img.style.marginBottom = '10px';
            img.classList.add('dealer-card'); // Add class for dealer cards
            if (index > 1) {
                img.classList.add('dealing-animation'); // Add animation class only for dealer's additional cards
            }
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

    gameOutput.innerHTML += `<br>`;

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
        this.dealerTurn();
    }

    dealerTurn() {
    this.showHands(false); // Initially show one card and hide the other

    let dealerCardsRevealed = 1; // Start with the first card revealed
    let dealerTotal = this.calculateHand(this.dealerHand);
    let playerTotal = this.calculateHand(this.playerHand);
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stand-button").disabled = true;

    // Function to reveal the next dealer card with a delay
    const revealDealerCard = () => {
        dealerTotal = this.calculateHand(this.dealerHand);
        // Dealer busts
        if (dealerTotal > 21) {
            this.determineWinner();
            this.endGame();
            return;
        }
        // Dealer continues to hit if they are losing and their total is less than 21
        if (dealerTotal < playerTotal) {
            this.dealerHand.push(this.deck.deal());
            this.showHands(false);
            dealerCardsRevealed++;
            setTimeout(revealDealerCard, 1000);
        } else {
            this.determineWinner();
        }
    };
    setTimeout(() => {
        this.showHands(false);
        revealDealerCard();
    }, 1000);

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
            console.log("Tie")
            this.displayMessage("It's a tie!");
        }
        this.endGame();
    }

    endGame() {
        this.gameOver = true;
        document.getElementById("hit-button").style.display = "none";
        document.getElementById("stand-button").style.display = "none";
        document.getElementById("start-button").disabled = false;
    }
}

let blackjackGame = null;

document.getElementById("start-button").addEventListener("click", function () {
    if (!blackjackGame) {
        blackjackGame = new Blackjack(message => {
            let messageElement = document.createElement('div');
            messageElement.innerText = message;
            messageElement.classList.add('game-message');
            document.getElementById('game-output').appendChild(messageElement);
        });
    }
});