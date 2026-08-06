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


const gameboardObj = (() => {
    let gameboardArray = [];

    const initialize = () => {
        for (let i = 0; i < 9; i++){
            const gameboardTile = document.createElement("button");
            gameboardTile.id = "gameboard-tile-" + i + 1;
            gameboardArray.push(gameboardTile);

            gameboardEle.appendChild(gameboardTile);
        }
    }
    //func newRound()
    //func resetAll()

    //func checkIfGameWon() {check if any straights or diagonals inside gameboardArray}

})();


let playerScore = 0;
let comScore = 0;
let tieScore = 0;

const playerScoreElm = document.getElementById("player-score");
const comScoreElm = document.getElementById("com-score");
const tieScoreElm = document.getElementById("tie-score");

gameboardObj.initialize();
