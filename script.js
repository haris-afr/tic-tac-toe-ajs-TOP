"use strict";

// You’re going to store the gameboard as an array inside of a Gameboard object, so start there! 
// Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.

// Your main goal here is to have as little global code as possible. Try tucking as much as you can inside factories. 
// If you only need a single instance of something (e.g. the gameboard, the displayController etc.) then wrap the factory inside an IIFE (module pattern) 
// so it cannot be reused to create additional instances.

// In this project, think carefully about where each bit of logic should reside. 
// Each little piece of functionality should be able to fit in the game, player or gameboard objects. Take care to put them in “logical” places. 
// Spending a little time brainstorming here can make your life much easier later!

// If you’re having trouble, Building a house from the inside out is a great article that lays out a highly applicable example 
// both of how you might approach tackling this project as well as how you might organize and structure your code.
const gameboardEle = document.querySelector(".gameboard");
const resetAllButtonEle = document.querySelector("#reset-all-button");

const gameboardObj = (() => {
    let gameboardArray = [];
    let emptyArray = []; //finish this part of the code

    function setTileEmpty(element){
        element.classList = "empty";
        element.textContent = "";
    }

    function setTileCross(element){
        element.classList = "cross";
        element.textContent = "X";

        let emptyArrayIndex = emptyArray.indexOf(element);
        emptyArray.splice(emptyArrayIndex, 1);
    }

    function setTileCircle(element){
        element.classList = "circle";
        element.textContent = "O";

        let emptyArrayIndex = emptyArray.indexOf(element);
        emptyArray.splice(emptyArrayIndex, 1);
    }

    function doPlayerTurn(elementClicked){
        if (elementClicked.classList.contains("cross") || elementClicked.classList.contains("circle")){
            return;
        }
        setTileCross(elementClicked);
        doComTurn();
    }

    function doComTurn(){
        if (emptyArray.length == 0){
            return;
        }
        
        const randInt =  Math.floor(Math.random() * emptyArray.length);
        let randomTile = emptyArray[randInt];
        console.log(randInt);
        console.log(emptyArray);
        setTileCircle(randomTile);
    }

    const initialize = () => {
        for (let i = 0; i < 9; i++){
            const gameboardTile = document.createElement("button");
            gameboardTile.id = "gameboard-tile-" + (i + 1);
            gameboardArray.push(gameboardTile);
            setTileEmpty(gameboardTile);

            gameboardEle.appendChild(gameboardTile);
        }

        emptyArray = Array.from(gameboardArray);

        gameboardArray.forEach((element, index, array) => {
            element.addEventListener("click", e => {doPlayerTurn(element);})
        });

        return;
    }

    function newRound(){
        gameboardArray.forEach((element, index, array) => {
            setTileEmpty(element);
        });
        emptyArray = Array.from(gameboardArray);
    }

    const resetAll = () => {
        newRound();
        playerScore = 0;
        comScore = 0;
        tieScore = 0;
    }

    //func checkIfGameWon() {check if any straights or diagonals inside gameboardArray}

    return {initialize, resetAll};
})();


let playerScore = 0;
let comScore = 0;
let tieScore = 0;

const playerScoreElm = document.getElementById("player-score");
const comScoreElm = document.getElementById("com-score");
const tieScoreElm = document.getElementById("tie-score");

resetAllButtonEle.addEventListener("click", e => {gameboardObj.resetAll()});

gameboardObj.initialize();
