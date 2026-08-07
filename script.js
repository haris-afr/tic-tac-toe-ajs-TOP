"use strict";


const gameboardEle = document.querySelector(".gameboard");
const resetAllButtonEle = document.querySelector("#reset-all-button");

const gameboardObj = (() => {
    let gameboardArray = [];
    let emptyArray = [];
    let circleArray = [];
    let crossArray = [];

    const diagonal_one = ["gameboard-tile-1", "gameboard-tile-5", "gameboard-tile-9"];
    const diagonal_two = ["gameboard-tile-3", "gameboard-tile-5", "gameboard-tile-7"];
    const horizontal_one = ["gameboard-tile-1", "gameboard-tile-2", "gameboard-tile-3"];
    const horizontal_two= ["gameboard-tile-4", "gameboard-tile-5", "gameboard-tile-6"];
    const horizontal_three = ["gameboard-tile-7", "gameboard-tile-8", "gameboard-tile-9"];
    const vertical_one = ["gameboard-tile-1", "gameboard-tile-4", "gameboard-tile-7"];
    const vertical_two = ["gameboard-tile-2", "gameboard-tile-5", "gameboard-tile-8"];
    const vertical_three = ["gameboard-tile-3", "gameboard-tile-6", "gameboard-tile-9"];
    const winConditions = [diagonal_one, diagonal_two, horizontal_one, horizontal_two, horizontal_three, vertical_one, vertical_two, vertical_three];

    function setTileEmpty(element){
        element.classList = "empty";
        element.textContent = "";
    }

    function setTileCross(element){
        element.classList = "cross";
        element.textContent = "X";

        crossArray.push(element.id);
        
        let emptyArrayIndex = emptyArray.indexOf(element);
        emptyArray.splice(emptyArrayIndex, 1);
    }

    function setTileCircle(element){
        element.classList = "circle";
        element.textContent = "O";

        circleArray.push(element.id);

        let emptyArrayIndex = emptyArray.indexOf(element);
        emptyArray.splice(emptyArrayIndex, 1);
    }

    function doPlayerTurn(elementClicked){
        if (elementClicked.classList.contains("cross") || elementClicked.classList.contains("circle")){
            return;
        }
        setTileCross(elementClicked);

        let gameWon = checkIfGameFinished();
        
        if (gameWon == false){
            doComTurn();
        }
    }

    function doComTurn(){
        if (emptyArray.length == 0){
            return;
        }
        
        const randInt =  Math.floor(Math.random() * emptyArray.length);
        let randomTile = emptyArray[randInt];
        setTileCircle(randomTile);
        checkIfGameFinished();
    }

    function updatePlayerScore(updateBy = 1, reset = 0){
        playerScore += updateBy;
        playerScoreElm.textContent = playerScore;
    }

    function updateComScore(updateBy = 1, reset = 0){
        comScore += updateBy;
    }

    function updateTieScore(updateBy = 1, reset = 0){
        tieScore += updateBy;
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

    function checkIfGameFinished() {
        if (emptyArray.length == 0){
            updateTieScore(+1);
            newRound();
            return true;

        }

        winConditions.forEach((element, index, array) =>{
            if (element.every(item => crossArray.includes(item))){
                updatePlayerScore(+1);
                newRound(); //TODO change this to a button click
                return true;
            }
        });

        winConditions.forEach((element, index, array) =>{
            if (element.every(item => circleArray.includes(item))){
                updateComScore(+1);
                newRound(); //TODO change this to a button click
                return true;
            }
        });

        return false;
    }

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
