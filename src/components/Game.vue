<template>
<div>
  <h3 v-if="game.Board" style="color: #2c3e50">Current player turn: {{ game.CurrentPlayer===1 ? "Penguin" : "Cow" }}</h3>
  <h1 style="color: darkblue;" v-if="win === 1 || win === 2">Winner is: {{ win===1 ? "Penguin" : "Cow" }}</h1>
  <h1 style="color: darkblue;" v-else-if="win === 0">It's a draw !</h1>
  <button v-if="game.Board" class="btn btn-primary" @click="resetGame()">RESET</button>
</div>
</template>

<script>
import { ref } from 'vue'
import global from "@/global";
import { Directions } from "@/global";
export default {
  name: "Game",
  setup() {
    const win = ref(-1)
    async function keyPressed() {
      const pressed = await waitingKeypress();
      if(pressed.key === "w"){
        console.log("w")
        makeMove(Directions.UP)
      }else if(pressed.key === "a"){
        makeMove(Directions.LEFT)
      }else if(pressed.key === "s"){
        makeMove(Directions.DOWN)
      }else if(pressed.key ==="d"){
        makeMove(Directions.RIGHT)
      }
    }
    function waitingKeypress() {
      return new Promise((resolve) => {
        document.addEventListener('keydown', onKeyHandler);
        function onKeyHandler(e) {
          if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") {
            document.removeEventListener('keydown', onKeyHandler);
            resolve(e);
          }
          /// add else to handle illegal button
        }
      });
    }
    // this is the game loop.
    async function nextTurn() {
      //check if game didnt end
      if(win.value === -1) {
        // check if game board is set
        if (game.Board !== null) {
          if (playerNumMovesAvailable(game.CurrentPlayer) !== 0) {
            await keyPressed()
            requestAnimationFrame(nextTurn)
          } else if (playerNumMovesAvailable((game.CurrentPlayer % 2) + 1) !== 0) {
            swapPlayer()
            await keyPressed()
            requestAnimationFrame(nextTurn)
          } else {
            win.value = winner()
          }
        } else {
          requestAnimationFrame(nextTurn)
        }
      }
    }
    const resetGame = () => {
      reset()
      if(win.value !== -1) {
        win.value = -1
        nextTurn()
      }
    }
    const { game, makeMove , playerNumMovesAvailable, swapPlayer , winner, reset} = global
    return { game, nextTurn, win, resetGame }
  },
  // this run when game is first created, which will start the game loop.
  async created() {
    await this.nextTurn()
  }
}
</script>

<style scoped>

</style>