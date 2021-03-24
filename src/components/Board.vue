<template>
  <transition name="fade">
    <div v-if="game.Players[1] && game.Players[2]">
      <div v-if="game.Board">
        <div class="img-grid">
          <div class="row" v-for="x in game.Rows" :key="x">
            <div class="img-wrapper" v-for="y in game.Cols" :key="y">
              <!-- checking for open field first due to higher availability to reduce time -->
              <!-- empty field -->
              <img v-if="game.Board[x-1][y-1]===EmptyField" src="../assets/openField2.png" alt="Field">
              <!-- player 1 -->
              <img v-else-if="game.Board[x-1][y-1]===Player1" src="../assets/penguin2.png" alt="Penguin">
              <!-- player 1 captured -->
              <img v-else-if="game.Board[x-1][y-1]===Player1Captured" src="../assets/penguinCaptured2.png" alt="Penguin steps">
              <!-- player 2 -->
              <img v-else-if="game.Board[x-1][y-1]===Player2" src="../assets/cow2.png" alt="Cow">
              <!-- player 2 captured -->
              <img v-else src="../assets/cowCaptured2.png" alt="Cow steps">
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h3 style="color: #00C040">Select a game board:</h3>
        <button class="btn btn-primary" @click="setBoard(smallMap)">Small</button>&nbsp;
        <button class="btn btn-primary" @click="setBoard(mediumMap)">Medium</button>&nbsp;
        <button class="btn btn-primary" @click="setBoard(largeMap)">Large</button>&nbsp;
      </div>
    </div>
  </transition>
</template>

<script>
import global from "@/global";
import { Player1,Player2,Player1Captured,EmptyField } from "@/global";

export default {
name: "Board",
  setup() {
    const { game, setBoard } = global
    const smallMap = ({Board : [
        ["1", " ", " "],
        [" ", " ", " "],
        [" ", " ", "2"],
      ], Rows : 3, Cols: 3})
    const mediumMap = ({Board : [
            ["1", " ", " ", " "],
            [" ", " ", " ", " "],
            [" ", " ", " ", "2"],
          ], Rows : 3, Cols: 4})
    const largeMap = ({Board : [
            ["1", " ", " "," ", " "],
            [" ", " ", " "," ", " "],
            [" ", " ", " "," ", " "],
            [" ", " ", " "," ", " "],
            [" ", " "," ", " ", "2"],
          ], Rows : 5, Cols: 5})
    return { game , smallMap, mediumMap, largeMap, setBoard, Player1, Player2, Player1Captured, EmptyField }
  }
}
</script>

<style scoped>
.btn{
  font-weight: bold;
}
.img-grid {
  margin: 0 auto;
  width: 70%;
}
.row {
  justify-content: center;
  width: 100%;
  display: flex;
  margin: 0;
}
img {
  border-radius: 30%;
  width: 100%;  }
.img-wrapper
{
  max-width: 60px;
  flex: 1;
}

@media (max-width: 600px) {
  h3{
    font-size: large;
  }
  button{
    font-size: x-small;
  }
}
</style>