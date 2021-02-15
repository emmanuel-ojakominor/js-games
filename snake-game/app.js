
document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('.score span');
    const startBtn = document.querySelector('.start')

    const width = 10;

    let currentIndex = 0; 
    let appleIndex = 0; 

    /* All divs with value of 2 will be the head of the snake
    All divs with value of 0 will be the tail of the snake. 
    All divs with value of 1 will be the body of the snake. */
    let currentSnake = [2, 1, 0];     

    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    // Start/restart the game
    function startGame() {
        // Reset everything
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;

        // Randomly generate apple
        randomApple()

        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime)
    }

    // Function that deals with ALL the move outcomes of the snake
    function moveOutcomes() {
    
        // Deals with snake hitting border and snake hitting self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || // if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') // if snake goes into itself
        ) {
            return clearInterval(interval) // this will clear the interval if any of the above happens
        }

        // Define the tail
        const tail = currentSnake.pop(); // removes last item of the array and shows that last item
        squares[tail].classList.remove('snake'); // removes class of snake from the TAIL
        currentSnake.unshift(currentSnake[0] + direction); // gives direction to the head of the array

        // Deals with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            currentSnake.push(tail)
            randomApple()
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime)
        }

        squares[currentSnake[0]].classList.add('snake')
    }

    
    // Generate new apple once apple is eaten
    function randomApple() {
        // Generate random number.. this means apple can pop up anywhere on out grid.
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }

 
    // Assign functions to keycodes - Make snake move across the board using keycodes
    function controlSnake(e) {
        squares[currentIndex].classList.remove('snake'); // remove snake class

        if(e.keyCode === 39) {
            direction = 1; // If we press the right arrow on keyboard, the snake will go right one div
        } else if (e.keyCode === 38) {
            direction = -width; // If we press the up arrow, the snake will go back ten divs, appearing to move up one row. 
        } else if (e.keyCode === 37) {
            direction = -1; // If we press the left arrow, the snake should go left one div
        } else if (e.keyCode === 40) {
            direction = +width; // If we press the down arrow, the snake head will instantly appear in the div ten divs from current position 
        }
    }

    // Add event listener for every time a key is pressed, to execute the controlSnake function
    document.addEventListener('keyup', controlSnake);
    startBtn.addEventListener('click', startGame);
}) 