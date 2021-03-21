<template>
  <Header/>
  &nbsp;
  <Board/>
  &nbsp;
  <Game/>
  <h5 class="creator">Creator: Abir Shaked</h5>
</template>

<script>
import 'prevent-pull-refresh';
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
  background-color: #FBEEC1;
}
.creator{
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 20px;
}
</style>
