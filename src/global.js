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
    Players: Array()
})
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
    if(0 <= position.row && position.row < game.Rows && 0 <= position.col && position.col < game.Cols){
        if(board[position.row][position.col] === EmptyField){
            return true
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
const winner = () => {
    let player1Captured = 0
    let player2Captured = 0
    for(let row=0; row < game.Rows; row++){
        for(let col=0; col < game.Cols; col++){
            if(game.Board[row][col] === Player1Captured){
                player1Captured++
            }
            else if(game.Board[row][col] === Player2Captured){
                player2Captured++
            }
        }
    }
    return player1Captured > player2Captured ? 1 : player2Captured > player1Captured ? 2 : 0
}
const swapPlayer = () => {
    game.CurrentPlayer = (game.CurrentPlayer % 2) + 1
}

export default { game, setBoard , makeMove, reverseMove, playerNumMovesAvailable, winner, swapPlayer, reset, isPositionLegal, setPlayer }