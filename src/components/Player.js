import global, {Directions, WIN, LOSE, DRAW, NOT_FINISHED} from "@/global";
const { makeMove, game, isPositionLegal, playerNumMovesAvailable, reverseMove, checkWin } = global

export class Player{
    makeTurn() {}
}
export class HumanPlayer extends Player{
    async makeTurn() {
        const pressed = await waitingKeypress();
        if(pressed.keyCode === 	38){
            makeMove(Directions.UP, game.Board)
        }else if(pressed.keyCode === 37){
            makeMove(Directions.LEFT, game.Board)
        }else if(pressed.keyCode === 40){
            makeMove(Directions.DOWN, game.Board)
        }else if(pressed.keyCode === 39){
            makeMove(Directions.RIGHT, game.Board)
        } else if (pressed.key === "RESET"){
            return false;
        }
        function waitingKeypress() {
            return new Promise((resolve) => {
                window.addEventListener('keydown', onKeyHandler);
                function onKeyHandler(e) {
                    if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.key === "RESET") {
                        window.removeEventListener('keydown', onKeyHandler);
                        resolve(e);
                    }
                }
            });
        }
        return true;
    }
}

export class SimpleAiPlayer extends Player{
    async makeTurn() {
        const board = JSON.parse(JSON.stringify(game.Board))
        let best_move = null
        let best_move_score = -Infinity
        let prev_loc = game.PlayerPositions[game.CurrentPlayer]
        for(let direction in Directions){
            if(isPositionLegal(prev_loc.Move(Directions[direction]), board)){
                makeMove(Directions[direction], board)
                let tempScore = playerNumMovesAvailable(game.CurrentPlayer, board)
                if (tempScore > best_move_score) {
                    best_move_score = tempScore
                    best_move = Directions[direction]
                }
                reverseMove(Directions[direction], board)
            }
        }
        makeMove(best_move, game.Board)
        return true
    }
}


export class MinmaxPlayer extends Player {
    async makeTurn() {
        const board = JSON.parse(JSON.stringify(game.Board))
        const best_move = this.MinMax(board, 0).Move
        makeMove(best_move, game.Board)
        return true
    }
    MinMaxScore(board) {
        const currentScore = checkWin(board)
        if (currentScore === NOT_FINISHED) {
            return null;
        } else if (currentScore === game.CurrentPlayer) {
            return WIN;
        } else if (currentScore === (game.CurrentPlayer % 2) + 1) {
            return LOSE;
        } else {
            return DRAW;
        }
    }
    MinMax(board, depth) {
        const currentScore = this.MinMaxScore(board)
        if (currentScore === null) {
            let best_move = null
            let best_score = -Infinity
            let best_move_length = Infinity
            for (const direction in Directions) {
                if (isPositionLegal(game.PlayerPositions[game.CurrentPlayer].Move(Directions[direction]), board)) {
                    makeMove(Directions[direction], board)
                    const temp_score = this.MinMax(board, depth+1)
                    if(temp_score.Score > best_score){
                        //if found a path to secure WIN, stop searching the MinMax tree.
                        if(temp_score.Score === WIN){
                            reverseMove(Directions[direction], board)
                            return {Move: Directions[direction], Score: -temp_score.Score,Length: temp_score.Length }
                        }
                        best_score = temp_score.Score
                        best_move = Directions[direction]
                        best_move_length = temp_score.Length
                    }
                    reverseMove(Directions[direction], board)
                }
            }
            return {Move: best_move, Score: -best_score,Length: best_move_length }
        } else {
            return {Move: null, Score: -currentScore,Length: depth}
        }
    }
}