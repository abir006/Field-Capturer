<template>
<div>
  <h3 style="color: #2c3e50">Current player turn: {{ game.CurrentPlayer===1 ? "Penguin" : "Cow" }}</h3>
  <h1 style="color: darkblue;" v-if="win === 1 || win === 2">Winner is: {{ win }}</h1>
  <h1 style="color: darkblue;" v-else-if="win === 0">Draw !</h1>
  <button v-if="game.Board" class="btn btn-primary" @click="resetGame()">
    RESET
  </button>
</div>
</template>

<script>
import { ref } from 'vue'
import global from "@/global";
export default {
  name: "Game",
  setup() {
    const win = ref(-1)
    async function keyPressed() {
      const pressed = await waitingKeypress();
      if(pressed.key === "w"){
        console.log("w")
        makeMove(-1, 0)
      }else if(pressed.key === "a"){
        makeMove(0, -1)
      }else if(pressed.key === "s"){
        makeMove(1, 0)
      }else if(pressed.key ==="d"){
        makeMove(0, 1)
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
      console.log("next")
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