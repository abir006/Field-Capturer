<template>
<div v-if="show">
  <h3 v-if="!game.CalculatingMove &&game.Board && win ===-1" style="color: black; font-weight: bold">Current player turn: {{ game.CurrentPlayer===1 ? "Penguin" : "Cow" }}</h3>
  <div v-if="game.CalculatingMove">
    <div class="box">
      <h3 style="color: black; font-weight: bold">Calculating next move for {{ game.CurrentPlayer===1 ? "Penguin" : "Cow"  }}</h3>
      <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>    </div>
  </div>
  <h1 style="color: black; font-weight: bold" v-if="win === 1 || win === 2">Winner is: {{ win === 1 ? "Penguin" : "Cow" }}</h1>
  <h1 style="color: black; font-weight: bold" v-else-if="win === 0">It's a draw !</h1>
  <Board/>
  <button v-if="game.Board" class="btn btn-primary" @click="resetGame()">RESET</button>
  <transition name="fade">
    <div v-if="!game.Players[1]">
      <h3 style="color: black">Select player for penguin:</h3>
      <button class="btn btn-primary" @click="setPlayer(1, new HumanPlayer() )">Human</button>&nbsp;
      <button class="btn btn-primary" @click="setPlayer(1, new SimpleAiPlayer() )">Simple AI</button>&nbsp;
      <button class="btn btn-primary" @click="setPlayer(1, new MinmaxPlayer() )">Minmax AI</button>
    </div>
    <div v-else-if="!game.Players[2]">
      <h3 style="color: black">Select player for cow:</h3>
      <button class="btn btn-primary" @click="setPlayer(2, new HumanPlayer() )">Human</button>&nbsp;
      <button class="btn btn-primary" @click="setPlayer(2, new SimpleAiPlayer() )">Simple AI</button>&nbsp;
      <button class="btn btn-primary" @click="setPlayer(2, new MinmaxPlayer() )">Minmax AI</button>
    </div>
  </transition>
  <div id="snackbar">Illegal move, please try again.</div>
</div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import global from "@/global";
import { HumanPlayer, SimpleAiPlayer, MinmaxPlayer } from './Player';
import Board from '@/components/Board.vue'
export default {
  name: "Game",
  components: { Board },
  setup() {
    const show = ref(false)
    onMounted(() => {
      show.value = true
    })
    /// to minimize calls for checkWin.
    const win = ref(-1)
    onMounted(() => {
      window.addEventListener('touchstart', handleTouchStart)
      window.addEventListener('touchmove', handleTouchMove)
    })
    onUnmounted(() => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    })
    let xDown = null;
    let yDown = null;
    function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    }
    function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
        return;
      }

      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;

      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
          window.dispatchEvent(new KeyboardEvent('keydown',{'keyCode': 37}));
        } else {
          window.dispatchEvent(new KeyboardEvent('keydown',{'keyCode': 39}));
        }
      } else {
        if ( yDiff > 0 ) {
          window.dispatchEvent(new KeyboardEvent('keydown',{'keyCode': 38}));
        } else {
          window.dispatchEvent(new KeyboardEvent('keydown',{'keyCode': 40}));
        }
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }
    // this is the game loop.
    async function nextTurn() {
      /// check if game started (board is set).
      if (game.Board) {
        win.value = checkWin(game.Board)
        /// if game is not over, make next turn.
        if (win.value === -1) {
          if (!(game.Players[game.CurrentPlayer] instanceof HumanPlayer)) {
            game.CalculatingMove = true
            ///delay AI players for 500ms, to allow player to see the AI move.
            await new Promise(r => setTimeout(r, 500));
          }
          if(game.Board){
            await game.Players[game.CurrentPlayer].makeTurn()
          }
          game.CalculatingMove = false
          requestAnimationFrame(nextTurn)
        }
      } else {
        requestAnimationFrame(nextTurn)
      }
    }
    function resetGame() {
      game.CalculatingMove = false
      reset()
      if(win.value !== -1) {
        win.value = -1
        nextTurn()
      }
    }
    const { game  , reset, setPlayer, checkWin } = global
    return { game, nextTurn, resetGame, setPlayer , HumanPlayer, SimpleAiPlayer, MinmaxPlayer, win, show }
  },
  // this run when game is first created, which will start the game loop.
  async created() {
    await this.nextTurn()
  }
}
</script>

<style scoped>
.box{
  display: flex;
  align-items: center;
  justify-content: center;
}
#snackbar {
  visibility: hidden; /* Hidden by default. Visible on click */
  min-width: 250px; /* Set a default minimum width */
  margin-left: -125px; /* Divide value of min-width by 2 */
  background-color: #333; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 2px; /* Rounded borders */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  left: 50%; /* Center the snackbar */
  bottom: 30px; /* 30px from the bottom */
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
  visibility: visible; /* Show the snackbar */
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

@media (max-width: 600px) {
  h1{
    font-size: x-large;
  }
  h3{
    font-size: large;
  }
  button{
    font-size: x-small;
  }
}
</style>