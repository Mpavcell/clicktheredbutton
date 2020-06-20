alert(`Hi! The objective is to click away as many red squares as possible. Begin!`)
let score = 0;
let numberOfDivs = 36;
let gridItem = []
for(i = 0; i < numberOfDivs; i++){
    gridItem[i] = document.querySelector(`#item${i}`); 
}
let exclusionArray = [];


function gamePlay(timeInterval, maxScore, level){
    let levelDisplay = document.querySelector(`#level`);
    levelDisplay.textContent = level;
        
    let randomNumber;
    randomNumber = Math.floor(Math.random() * 35);
    let lastRandomNumber;
    lastRandomNumber = randomNumber;

    //FUNCTION THAT GENERATES RANDOM NUMBER AND ADDS EVENT LISTENERS TO DIV
    //this never generates the same two random numbers in a row
    function whackMole(){
        function getRandomNumber(){    
            while(randomNumber === lastRandomNumber){
                randomNumber = Math.floor(Math.random() * 36);
            }
            lastRandomNumber = randomNumber;
            
            return randomNumber;
        }
        getRandomNumber();

        //REMOVE NUMBER FROM EXCLUSIONARRAY AND MAKE NUMBER AVAILABLE AGAIN 
        //FOR GETRANDOMNUMBER. function called on click event.
        function removeNumberFromExclusionArray(){
            exclusionArray.splice(randomNumber, 1);
        }
        
        gridItem[randomNumber].classList.add('red');
        gridItem[randomNumber].addEventListener('click', playAudio);
        gridItem[randomNumber].addEventListener('click', scoreCount);
        gridItem[randomNumber].addEventListener('click', whackMole);
        gridItem[randomNumber].addEventListener('click', removeNumberFromExclusionArray);
        gridItem[randomNumber].addEventListener('click', removeIdandEventListeners);

        /* the exclude function (below) makes sure that a number is not returned by 
        getRandomNumber whilst that number is 
        stored in the exclusionArray. This makes it possible for the computer to only 
        affect white divs (not in exclusionarray), and never the red ones. 
        Once the red div is clicked and it is white again, the number is removed from 
        exclusionarray and the number is available again for getRandomNumber to select.*/
        exclusionArray[randomNumber] = randomNumber;

        while(exclusionArray.includes(randomNumber)){
            getRandomNumber();
        }

        //CHECK IF EXCLUSIONARRAY CONTAINS EMPTY SLOTS. IF FALSE, THEN GAME OVER
        //(because that means the entire board is red) 
        if(exclusionArray.includes(undefined) === false){
            return alert(`Game over! Your score is ${score}! Press f5 on keyboard to retry.`)              
        }
        return randomNumber;
    }
    whackMole();

    setInterval(whackMole, timeInterval);

    //FUNCTION THAT PLAYS AUDIO
    function playAudio(){
        let audio = document.querySelector(`#audio`);
        audio.currentTime = 0;
        audio.play();
    }
    
    //FUNCTION THAT COUNTS SCORE
    function scoreCount(){
        let scoreDisplay = document.querySelector(`#score`);
        score += 10;
        scoreDisplay.textContent = score;
        if(score >= maxScore){
            gameCycles();
        }
        console.log(score)
        return score
    }

    //FUNCTION THAT REMOVES EVENT LISTENERS FROM ELEMENT
    function removeIdandEventListeners(){
        this.classList.remove('red');
        this.removeEventListener('click', playAudio);
        this.removeEventListener('click', scoreCount);
        this.removeEventListener('click', whackMole);
        this.removeEventListener('click', removeIdandEventListeners);
    }

return score;
}

function gameCycles(){
    if(score < 500){
        gamePlay(1000, 500, 'First level');
    }
    if(score >= 500 && score < 1000){
        gamePlay(800, 1000, 'Second level');
    }
    if(score >= 1000){
        gamePlay(600, 1000000, 'Third level');
    }
}
gameCycles();

































/*
// this function sets the event listeners for each grid item
function setEventListenerToDivs(){
    for (i = 0; i < numberOfDivs; i++){
        gridItem[i] = document.querySelector(`#item${i}`);
        gridItem[i].addEventListener('mouseover', changeBackGroundColor); 
    }
}
setEventListenerToDivs();

//this function is called on buttonclick, it toggles to either an even or uneven number 
let toggle = 0;
function toggleRandomColor(){
    toggle = toggle + 1;
    return toggle;
}

// this function is called on mouseover and changes backgroundcolor of grid item.
//if toggle is even it gives black, else it gives random color
function changeBackGroundColor(){
    if(toggle % 2 == 0){
    this.style.backgroundColor = "black";
    } else {
        let rgb
        function randomColorGenerator(){
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            rgb = `${r}, ${g}, ${b}`
            return rgb;
        }
        randomColorGenerator();
        this.style.backgroundColor = `rgb(${rgb})`;
        }
}    

//this function is called on click and deletes all formerly created grid items to clear the grid.
function removeAllGridItems(){
    for(i = 0; i < numberOfDivs; i++){
    gridItem[i] = document.querySelector(`#item${i}`);
    gridContainer.removeChild(gridItem[i]);
    }
}

// this function is called on click and changes button text and style 
function toggleButtonText(){
    if(toggle % 2 == 0){
        randomButton.textContent = 'use random color';
        randomButton.style.cssText = `background: #19b490`;
    } else {
        randomButton.textContent = 'GO BACK TO BLACK!';
        randomButton.style.cssText = `background: black`;
    }
}

let resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', removeAllGridItems);
resetButton.addEventListener('click', createSketchPad);
resetButton.addEventListener('click', setEventListenerToDivs);

let randomButton = document.querySelector('#random');
randomButton.addEventListener('click', toggleRandomColor);
randomButton.addEventListener('click', toggleButtonText)


*/