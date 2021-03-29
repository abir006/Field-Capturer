<template>
    <transition name="slide">
      <Header/>
    </transition>
  <div class="hh">
    <transition name="slide-reverse">
      <Game/>
    </transition>
  </div>
  <a href="http://www.freepik.com">Designed by upklyak / Freepik</a>
  <h5 class="creator">Created by Abir Shaked</h5>
</template>

<script>
import 'prevent-pull-refresh';
import Header from './components/Header.vue'
import Game from "@/components/Game";
import global from "@/global";
export default {
  name: 'App',
  components: {
    Header, Game
  },
  setup() {
    const { game } = global
    return { game }
  }
}
</script>

<style>
.lds-spinner {
  color: #ffffff;
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
}
.lds-spinner div {
  transform-origin: 20px 20px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 1.5px;
  left: 18.5px;
  width: 3px;
  height: 9px;
  border-radius: 20%;
  background: #fff;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
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
  background-image: url("assets/FieldCapture-Background.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
/*
  background-image: linear-gradient(to right bottom, #434343, #333333, #242424, #161616, #000000);
*/
  text-align: center;
}
.btn{
  font-weight: bold;
  box-shadow: 2px 2px 4px black;
}
.creator{
  position: absolute;
  bottom: 10px;
  right: 0;
  margin-right: 20px;
}
 a {
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
