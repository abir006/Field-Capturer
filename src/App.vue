<template>
  <Header/>
  &nbsp;
  <Game/>
  &nbsp;
  <Board/>
</template>

<script>
import Header from './components/Header.vue'
import Board from './components/Board.vue'
import Game from "@/components/Game";
export default {
  name: 'App',
  components: {
    Header, Board, Game
  }
}
</script>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
