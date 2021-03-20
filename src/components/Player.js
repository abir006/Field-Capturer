import global, {Directions} from "@/global";
const { makeMove, game, isPositionLegal, playerNumMovesAvailable, reverseMove } = global
export class Player{
    makeTurn() {}
}
export class HumanPlayer extends Player{
    async makeTurn() {
        const pressed = await waitingKeypress();
        if(pressed.key === "w"){
            makeMove(Directions.UP, game.Board)
        }else if(pressed.key === "a"){
            makeMove(Directions.LEFT, game.Board)
        }else if(pressed.key === "s"){
            makeMove(Directions.DOWN, game.Board)
        }else if(pressed.key ==="d"){
            makeMove(Directions.RIGHT, game.Board)
        }
        function waitingKeypress() {
            return new Promise((resolve) => {
                window.addEventListener('keydown', onKeyHandler);
                function onKeyHandler(e) {
                    if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d" || e.key === "RESET") {
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