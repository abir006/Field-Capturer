<template>
  <transition name="fade">
    <div v-if="game.Players[1] && game.Players[2]">
      <div v-if="game.Board">
        <div class="img-grid">
          <div class="row" v-for="x in game.Rows" :key="x">
            <div class="img-wrapper" v-for="y in game.Cols" :key="y">
              <!-- checking for open field first due to higher availability to reduce time -->
              <!-- empty field -->
              <img v-if="game.Board[x-1][y-1]===EmptyField" src="../assets/openField.png" alt="Field">
              <!-- player 1 -->
              <img v-else-if="game.Board[x-1][y-1]===Player1" src="../assets/penguin.png" alt="Penguin">
              <!-- player 1 captured -->
              <img v-else-if="game.Board[x-1][y-1]===Player1Captured" src="../assets/penguinCaptured.png" alt="Penguin steps">
              <!-- player 2 -->
              <img v-else-if="game.Board[x-1][y-1]===Player2" src="../assets/cow.png" alt="Cow">
              <!-- player 2 captured -->
              <img v-else-if="game.Board[x-1][y-1]===Player2Captured" src="../assets/cowCaptured.png" alt="Cow steps">
              <!-- blocked field -->
              <img v-else src="../assets/blocked.png" alt="Blocked field">
            </div>
          </div>
        </div>&nbsp;
      </div>
      <div v-else>
        <h3 style="color: black">Select a game board:</h3>
        <button class="btn btn-primary" @click="setBoard(smallMap)">Small</button>&nbsp;
        <button class="btn btn-primary" @click="setBoard(mediumMap)">Medium</button>&nbsp;
        <button class="btn btn-primary" @click="setBoard(largeMap)">Large</button>&nbsp;
        <button class="btn btn-primary" @click="setBoard(xLargeMap)">Xlarge</button>&nbsp;
        <button class="btn btn-primary" @click="setBoard(xxLargeMap)">XXlarge</button>&nbsp;
      </div>
    </div>
  </transition>
</template>

<script>
import global from "@/global";
import { Player1,Player2,Player1Captured,Player2Captured,EmptyField } from "@/global";

export default {
name: "Board",
  setup() {
    const { game, setBoard } = global
    const smallMap = ({Board : [
        ["1", " ", " "],
        [" ", "X", " "],
        [" ", " ", "2"],
      ], Rows : 3, Cols: 3})
    const mediumMap = ({Board : [
            ["1", " ", " ", " "],
            [" ", " ", " ", " "],
            [" ", " ", " ", "2"],
          ], Rows : 3, Cols: 4})
    const largeMap = ({Board : [
        ["1", " ", " "," ", " "],
        [" ", "X", " "," ", " "],
        [" ", "X", "X","X", " "],
        [" ", " ", " ","X", " "],
        [" ", " "," ", " ", "2"],
      ], Rows : 5, Cols: 5})
    const xLargeMap =
        ({Board : [
            [" ", " ", " "," ", " ", " "],
            [" ", "X", " "," ", "X", " "],
            [" ", " ", "1","2", " ", " "],
            [" ", " ", " "," ", " ", " "],
            [" ", " ","X", "X", " ", " "],
          ], Rows : 5, Cols: 6})
    const xxLargeMap =
        ({Board : [
            [" ", " ", " "," ", " ", " ", " ", " "],
            [" ", " ", "X"," ", " ", "X", " ", " "],
            [" ", " ", "1","X", "X", "2", " ", " "],
            [" ", " ", " ","X", "X", " ", " ", " "],
            [" ", " ", "X"," ", " ", "X", " ", " "],
            [" ", " ", " "," ", " ", " ", " ", " "],
          ], Rows : 6, Cols: 8})
    return { game , smallMap, mediumMap, largeMap,xLargeMap,xxLargeMap, setBoard, Player1, Player2, Player1Captured,Player2Captured, EmptyField }
  }
}
</script>

<style scoped>
.img-grid {
  /*border: 2px solid black;*/
  border-radius: 8%;
  box-shadow: 0 0 8px 4px black;
  margin: 0 auto;
  width: 70%;
  max-width: fit-content;
  background-image: url("../assets/grass.png");
}
.row {
  justify-content: center;
  width: 100%;
  display: flex;
  margin: 0;
}
img {
  width: 100%;  }
.img-wrapper
{
/*  margin: 1px;
  border-radius: 10%;*/
  border: 1px solid rgba(255, 255, 255, 0.4);
  max-width: 60px;
  flex: 1;
}
/*.row:nth-child(even) .img-wrapper:nth-child(odd){
  background-color: rgba(255, 255, 255, 0.1)
}*/
.row:first-child .img-wrapper:first-child {
  border-top-left-radius: 25px;
}
.row:first-child .img-wrapper:last-child {
  border-top-right-radius: 25px;
}
.row:last-child .img-wrapper:first-child {
  border-bottom-left-radius: 25px;
}
.row:last-child .img-wrapper:last-child {
  border-bottom-right-radius: 25px;
}
.row:nth-child(even) .img-wrapper:nth-child(even){
  background-color: rgba(0, 0, 0, 0.3)
}
.row:nth-child(odd) .img-wrapper:nth-child(odd){
  background-color: rgba(0, 0, 0, 0.3)
}
/*.row:nth-child(odd) .img-wrapper:nth-child(even){
  background-color: rgba(255, 255, 255, 0.1)
}*/
@media (max-width: 600px) {
  h3{
    font-size: large;
  }
  button{
    font-size: x-small;
  }
}
</style>