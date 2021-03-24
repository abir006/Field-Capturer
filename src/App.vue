<template>
    <transition name="slide">
      <Header/>
    </transition>
  <div class="hh">
    &nbsp;
    <Board/>
    &nbsp;
    <transition name="slide-reverse">
      <Game/>
    </transition>
    <h5 class="creator">Creator: Abir Shaked</h5>
  </div>
</template>

<script>
import 'prevent-pull-refresh';
import Header from './components/Header.vue'
import Board from './components/Board.vue'
import Game from "@/components/Game";
import global from "@/global";
export default {
  name: 'App',
  components: {
    Header, Board, Game
  },
  setup() {
    const { game } = global
    return { game }
  }
}
</script>

<style>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

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
  transform: translate(0, -100%);
}
.slide-leave-to {
  transform: translate(0, 100%);
}
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-image: linear-gradient(to right bottom, #434343, #333333, #242424, #161616, #000000);
  text-align: center;
}

.creator{
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 20px;
}
.fade-leave-active {
  transition: opacity 0.35s ease-in-out;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
.fade-enter-active{
  transition: opacity 0.6s cubic-bezier(1, 0.01, 1, 0.01);
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
