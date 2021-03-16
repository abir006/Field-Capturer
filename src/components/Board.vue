<template>
  <div v-if="game.Board">
    <div v-for="x in game.Rows" :key="x">
    <span v-for="y in game.Cols" :key="y">
      <!-- checking for open field first due to higher availability to reduce time -->
      <!-- empty field -->
      <img v-if="game.Board[x-1][y-1]===' '" src="../assets/openField.png" alt="">
      <!-- player 1 -->
      <img v-else-if="game.Board[x-1][y-1]==='1'" src="../assets/penguin.png" alt="">
      <!-- player 1 captured -->
      <img v-else-if="game.Board[x-1][y-1]==='captured1'" src="../assets/penguinCaptured.png" alt="">
      <!-- player 2 -->
      <img v-else-if="game.Board[x-1][y-1]==='2'" src="../assets/cow.png" alt="">
      <!-- player 2 captured -->
      <img v-else src="../assets/cowCaptured.png" alt="">
    </span>
    </div>
  </div>
  <div v-else>
    <button class="btn btn-primary" @click="setBoard(smallMap)">Small</button>&nbsp;
    <button class="btn btn-primary" @click="setBoard(mediumMap)">Medium</button>&nbsp;
    <button class="btn btn-primary" @click="setBoard(largeMap)">Large</button>&nbsp;
    <button class="btn btn-primary" @click="setBoard(extraLargeMap)">Extra Large</button>
  </div>
</template>

<script>
import global from "@/global";

export default {
name: "Board",
  setup() {
    const { game, setBoard } = global
    const smallMap = ({Board : [
        ["1", " ", " "],
        [" ", " ", " "],
        [" ", " ", "2"],
      ], Rows : 3, Cols: 3})
    const mediumMap =
        ({Board : [
            ["1", " ", " ", " "],
            [" ", " ", " ", " "],
            [" ", " ", " ", "2"],
          ], Rows : 3, Cols: 4})
    const largeMap =
        ({Board : [
            ["1", " ", " "," ", " "],
            [" ", " ", " "," ", " "],
            [" ", " ", " "," ", " "],
            [" ", " ", " "," ", " "],
            [" ", " "," ", " ", "2"],
          ], Rows : 5, Cols: 5})
    const extraLargeMap =
        ({Board : [
            ["1", " ", " "," ", " ", " ", " "," ", " ", " "],
            [" ", " ", " "," ", " ", " ", " "," ", " ", " "],
            [" ", " ", " "," ", " ", " ", " "," ", " ", " "],
            [" ", " ", " "," ", " ", " ", " "," ", " ", " "],
            [" ", " ", " "," ", " ", " ", " "," ", " ", " "],
            [" ", " ", " "," ", " ", " ", " "," ", " ", " "],
            [" ", " ", " "," ", " ", " ", " "," ", " ", " "],
            [" ", " ", " "," ", " ", " ", " "," ", " ", " "],
            [" ", " ", " "," ", " ", " ", " "," ", " ", " "],
            [" ", " ", " "," ", " ", " ", " "," ", " ", "2"],
          ], Rows : 10, Cols: 10})
    return { game , smallMap, mediumMap, largeMap, extraLargeMap, setBoard}
  }
}
</script>
