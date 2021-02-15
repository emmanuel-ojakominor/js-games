document.addEventListener('DOMContentLoaded', () => {

    // card options
    const cardArray = [
        /**
         * We need two of each card type to play the game, hence we create duplicates for each card type.
         */

        // red
        { name: 'red', img: 'images/red.png'},
        { name: 'red', img: 'images/red.png'},

        // green
        { name: 'green', img: 'images/green.png'},
        { name: 'green', img: 'images/green.png'},
        

        // blue
        { name: 'blue', img: 'images/blue.png'},
        { name: 'blue', img: 'images/blue.png'},

        // orange
        { name: 'orange', img: 'images/orange.png'},        
        { name: 'orange', img: 'images/orange.png'},

        // purple
        { name: 'purple', img: 'images/purple.png'},        
        { name: 'purple', img: 'images/purple.png'},

        // yellow
        { name: 'yellow', img: 'images/yellow.png'},
        { name: 'yellow', img: 'images/yellow.png'}
    ]

    /**
     *  The thing that will allow us to refresh the game with new card positions is to randomize our cards array.
     *  We can do this using sort() and math.random() */
    cardArray.sort(() => {
        return (0.5 - Math.random());
    })

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    // Create board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {

            // For each card, create image element, set several attributes and add click event listener
            let card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }   


    // flip your card
    function flipCard() {
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);

        // We only want to put cards in our cardsChosen array
        if(cardsChosen.length === 2) {
            // This setTimeout will give us some buffer time so that the whole thing doesnt happen to quickly
            setTimeout(checkForMatch, 500)
        }
    }


    // Check for matches
    function checkForMatch() {
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0]; // Get the first value in cardsChosenId array and assign to optionOneId variable
        const optionTwoId = cardsChosenId[1]; // Get the second value in cardsChosenId array and assign to optionTwoId variable

        if(cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match');
            cards[optionOneId].setAttribute('src', 'images/white.png');
            cards[optionTwoId].setAttribute('src', 'images/white.png');
            cardsWon.push(cardsChosen)
        } else {
            // If the cards dont match, flip the card back over to play again, by basically assigning the blank png img
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
            alert('Sorry, try again');
        }

        // Either way (i.e., if found match or not), clear the cardsChosen and cardsChosenId arrays, ready to start flipping again
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;

        if(cardsWon === cardArray.length/2) {
            // if cardsWon === cardArray.length/2, then we know we have collected all the possible cards in our cards array
            resultDisplay.textContent = 'Congratulations! You found them all!'
        }
    }

    createBoard();
});