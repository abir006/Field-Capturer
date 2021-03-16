<template>
  <div v-if="board">
    <div v-for="x in rows" :key="x">
    <span v-for="y in cols" :key="y">
      <img src="../assets/openField.png" alt="">
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
import { ref } from 'vue'
export default {
name: "Board",
  setup() {
    const board = ref(null)
    const rows = ref(0)
    const cols = ref(0)
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

    const setBoard = (boardToSet) => {
      board.value = JSON.parse(JSON.stringify(boardToSet.Board))
      rows.value = boardToSet.Rows
      cols.value = boardToSet.Cols
    }
    return { board, rows, cols , smallMap, mediumMap, largeMap, extraLargeMap, setBoard}
  }
}
</script>
