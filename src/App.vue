<template>
  <transition name="slide">
    <Header/>
  </transition>
  &nbsp;
  <Board/>
  &nbsp;
  <transition name="slide-reverse">
      <Game/>
  </transition>
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
.slide-reverse-leave-active,
.slide-reverse-enter-active {
  transition: 1s;
}
.slide-reverse-enter-from {
  transform: translate(100%, 0);
}
.slide-reverse-leave-to {
  transform: translate(-100%, 0);
}
.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter-from {
  transform: translate(-100%, 0);
}
.slide-leave-to {
  transform: translate(100%, 0);
}
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease-in-out;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
</style>
