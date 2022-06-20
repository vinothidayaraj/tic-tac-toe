const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById("board")
const messageContainer = document.querySelector('[data-winning-message-text]')
const winningContainer = document.getElementById('winningMessage');
const resetButton = document.getElementById('restartButton');
let circleTurn;
const init_var = Math.floor(Math.random() * 2)
const WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
resetButton.addEventListener("click", startGame)
startGame(init_var)

function startGame(init_var){
    if(init_var==0){
        circleTurn = true;
    }else{
        circleTurn = false;
    }
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.addEventListener("click", handleClick, {once: true})
    });
    setBoardHoverClass()
    winningContainer.classList.remove('show')
}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurns()
        setBoardHoverClass()
    }
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    });
}

function endGame(draw){
    if(draw){
        messageContainer.innerText = 'Draw!!'
    }else{
        messageContainer.innerText = `${circleTurn ? "0's" : "X's"} Wins!`
    }
    winningContainer.classList.add('show')
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        });
    });
}