import global, {Directions} from "@/global";
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
    }
}


export class MinmaxPlayer extends Player {
    async makeTurn() {
        const board = JSON.parse(JSON.stringify(game.Board))
        const best_move = this.MinMax(board, game.CurrentPlayer).Move
        makeMove(best_move, game.Board)
    }
    MinMaxScore(board) {
        const currentScore = checkWin(board)
        if (currentScore === -1) {
            return null;
        } else if (currentScore === game.CurrentPlayer) {
            return 1;
        } else if (currentScore === (game.CurrentPlayer % 2) + 1) {
            return -1;
        } else {
            return 0;
        }
    }
    MinMax(board) {
        const currentScore = this.MinMaxScore(board)
        if (currentScore === null) {
            let best_move = null
            let best_score = -Infinity
            for (const direction in Directions) {
                if (isPositionLegal(game.PlayerPositions[game.CurrentPlayer].Move(Directions[direction]), board)) {
                    makeMove(Directions[direction], board)
                    const temp_score = this.MinMax(board).Score
                    if(temp_score > best_score){
                        best_score = temp_score
                        best_move = Directions[direction]
                    }
                    reverseMove(Directions[direction], board)
                }
            }
            return { Move: best_move, Score: -best_score }
        } else {
            return {Move: null, Score: -currentScore}
        }
    }
}