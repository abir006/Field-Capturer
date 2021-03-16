import { reactive, readonly } from 'vue'

const game = reactive({
    Board: null,
    Rows: 0,
    Cols: 0,
    PlayerPositions: Array(Array()),
    CurrentPlayer: 1,
})
const reset = () => {
    game.Board = null
    game.Rows = 0
    game.Cols = 0
    game.PlayerPositions = Array(Array())
    game.CurrentPlayer = 1
}
const setBoard = (boardToSet) => {
    game.Board = JSON.parse(JSON.stringify(boardToSet.Board))
    game.Rows = boardToSet.Rows
    game.Cols = boardToSet.Cols
    for(let row=0; row < boardToSet.Rows; row++){
        for(let col=0; col < boardToSet.Cols; col++){
            if(boardToSet.Board[row][col]==="1"){
                game.PlayerPositions[1] = [row, col]
            }
            else if(boardToSet.Board[row][col]==="2"){
                game.PlayerPositions[2] = [row, col]
            }
        }
    }
}
const playerNumMovesAvailable = (player) => {
    let numSteps = 0
    //up
    if(game.PlayerPositions[player][0] > 0 && game.Board[game.PlayerPositions[player][0]-1][game.PlayerPositions[player][1]] === " "){
        numSteps++
    }
    //down
    if(game.PlayerPositions[player][0] < game.Rows-1 && game.Board[game.PlayerPositions[player][0]+1][game.PlayerPositions[player][1]] === " "){
        numSteps++
    }
    //left
    if(game.PlayerPositions[player][1] > 0 && game.Board[game.PlayerPositions[player][0]][game.PlayerPositions[player][1]-1] === " "){
        numSteps++
    }
    //right
    if(game.PlayerPositions[player][1] < game.Cols - 1 && game.Board[game.PlayerPositions[player][0]][game.PlayerPositions[player][1] + 1] === " "){
        numSteps++
    }
    return numSteps
}

const makeMove = (x, y) => {
        const currentRow = game.PlayerPositions[game.CurrentPlayer][0]
        const currentCol = game.PlayerPositions[game.CurrentPlayer][1]
        const newRow = currentRow+x
        const newCol = currentCol+y
        if(0 <= newRow && newRow < game.Rows && 0 <= newCol && newCol < game.Cols){
            if(game.Board[newRow][newCol]===" "){
                game.Board[currentRow][currentCol] = "captured"+game.CurrentPlayer.toString()
                game.PlayerPositions[game.CurrentPlayer] = [newRow, newCol]
                game.Board[newRow][newCol] = game.CurrentPlayer.toString()
                swapPlayer()
            }
        }
}

const winner = () => {
    let player1Captured = 0
    let player2Captured = 0
    for(let row=0; row < game.Rows; row++){
        for(let col=0; col < game.Cols; col++){
            if(game.Board[row][col]==="1" || game.Board[row][col]==="captured1"){
                player1Captured++
            }
            else if(game.Board[row][col]==="2" || game.Board[row][col]==="captured2"){
                player2Captured++
            }
        }
    }
    if(player1Captured > player2Captured) return 1
    if(player2Captured > player1Captured) return 2
    return 0
}

const swapPlayer = () => {
    game.CurrentPlayer = (game.CurrentPlayer % 2) + 1
}

export default { game: readonly(game), setBoard , makeMove, playerNumMovesAvailable, winner, swapPlayer, reset }