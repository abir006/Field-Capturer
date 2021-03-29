import { reactive } from 'vue'

export const Directions = {UP: "Up",DOWN: "Down",LEFT: "Left",RIGHT: "Right"}
const ReverseDirections = {Down: "Up",Up: "Down",Right: "Left",Left: "Right"}
export const EmptyField = " "
export const Player1 = "1"
export const Player2 = "2"
export const Player1Captured = "captured1"
export const Player2Captured = "captured2"

class Position{
    constructor(row, col) {
        this.row = row
        this.col = col
    }
    Copy(){
        return new Position(this.row, this.col)
    }
    Move(direction){
        switch(direction) {
            case Directions.UP:
                return new Position(this.row - 1, this.col)
            case Directions.DOWN:
                return new Position(this.row + 1, this.col)
            case Directions.LEFT:
                return new Position(this.row, this.col - 1)
            case Directions.RIGHT:
                return new Position(this.row, this.col + 1)
        }
    }
}
const game = reactive({
    Board: null,
    Rows: 0,
    Cols: 0,
    PlayerPositions: Array(),
    CurrentPlayer: 1,
    Players: Array(),
    CalculatingMove: false,
})
function setCalc(bool) {
    game.CalculatingMove = bool;
}
function showIllegalMoveSnackbar() {
    // Get the snackbar DIV
    let x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
const reset = () => {
    window.dispatchEvent(new KeyboardEvent('keydown',{'key':'RESET'}));
    game.Board = null
    game.Rows = 0
    game.Cols = 0
    game.PlayerPositions = Array(Array())
    game.CurrentPlayer = 1
    game.Players[1] = null
    game.Players[2] = null
}
const setPlayer= (playerNumber, playerType) => {
    game.Players[playerNumber] = playerType
}
const setBoard = (boardToSet) => {
    game.Board = JSON.parse(JSON.stringify(boardToSet.Board))
    game.Rows = boardToSet.Rows
    game.Cols = boardToSet.Cols
    for(let row=0; row < boardToSet.Rows; row++){
        for(let col=0; col < boardToSet.Cols; col++){
            //found player 1 update his position
            if(boardToSet.Board[row][col]===Player1){
                game.PlayerPositions[1] = new Position(row, col)
            }
            //found player 2 update his position
            else if(boardToSet.Board[row][col]===Player2){
                game.PlayerPositions[2] = new Position(row, col)
            }
        }
    }
}

const playerNumMovesAvailable = (player, board) => {
    let numSteps = 0
    for(let direction in Directions){
        if(isPositionLegal(game.PlayerPositions[player].Move(Directions[direction]), board)){
            numSteps++
        }
    }
    return numSteps
}
const isPositionLegal = (position, board) => {
    if(board){
        if(0 <= position.row && position.row < game.Rows && 0 <= position.col && position.col < game.Cols){
            if(board[position.row][position.col] === EmptyField){
                return true
            }
        }
    }
    return false
}
const captureCurrentPosition = (board) => {
    const currentPosition = game.PlayerPositions[game.CurrentPlayer]
    board[currentPosition.row][currentPosition.col] = "captured"+game.CurrentPlayer.toString()
}
const moveToNewPosition = (newPosition, board) => {
    captureCurrentPosition(board)
    game.PlayerPositions[game.CurrentPlayer] = newPosition
    board[newPosition.row][newPosition.col] = game.CurrentPlayer.toString()
}
const makeMove = (direction, board) => {
    const currentPosition = game.PlayerPositions[game.CurrentPlayer]
    const newPosition = currentPosition.Copy().Move(direction)
    if(isPositionLegal(newPosition, board)){
        moveToNewPosition(newPosition, board)
        swapPlayer()
    }else{
        showIllegalMoveSnackbar()
    }
}
const reverseCaptureCurrentPosition = (board) => {
    const currentPosition = game.PlayerPositions[game.CurrentPlayer]
    board[currentPosition.row][currentPosition.col] = EmptyField
}
const reverseMoveToNewPosition = (newPosition, board) => {
    reverseCaptureCurrentPosition(board)
    game.PlayerPositions[game.CurrentPlayer] = newPosition
    board[newPosition.row][newPosition.col] = game.CurrentPlayer.toString()
}
const reverseMove = (direction, board) => {
    swapPlayer()
    const currentPosition = game.PlayerPositions[game.CurrentPlayer]
    const newPosition = currentPosition.Copy().Move(ReverseDirections[direction])
    reverseMoveToNewPosition(newPosition, board)
}
/// if a player is stuck, enemy player wins, but because player 1 started, if player 2 is stuck after his turn,
/// player 1 wins only if he have another move available, otherwise we draw.
const checkWin = (board) => {
    if(board) {
        /// if player 2 is stuck, and its player 1 turn, if player 1 is stuck its a draw, if player 1 is free he wins.
        /// if player 1 is stuck, and its player 2 turn, we cannot decide score yet (player 2 move will determine it)
        //  since player 2 can move to a field where he is stuck and draw, or a field where he have another move and win.
        if ((playerNumMovesAvailable((game.CurrentPlayer % 2) + 1, board) === 0 && game.CurrentPlayer === 1)) {
            /// player 1 is free, and player 2 is stuck , player 1 win
            if (playerNumMovesAvailable(game.CurrentPlayer, board) !== 0) {
                return game.CurrentPlayer
                ///player 1 and player 2 are stuck ,its a draw
            } else {
                return 0
            }
            /// if current player is stuck enemy player wins
        } else if (playerNumMovesAvailable(game.CurrentPlayer, board) === 0) {
            return (game.CurrentPlayer % 2) + 1
            /// game is not decided yet.
        } else {
            return -1
        }
    }else {
        return -1
    }
}
const swapPlayer = () => {
    game.CurrentPlayer = (game.CurrentPlayer % 2) + 1
}

export default { game, setBoard , makeMove, reverseMove, playerNumMovesAvailable, swapPlayer, reset, isPositionLegal, setPlayer, checkWin, setCalc }