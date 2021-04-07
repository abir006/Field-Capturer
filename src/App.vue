<template>
    <transition name="slide">
      <div v-if="mountTransition" style="padding-top: 4px;">
        <div style="display: flex;justify-content: space-between;padding-left: 2.5%">
          <div>
            <h1>Field Capture</h1>
          </div>
          <div style="margin: auto 0;padding-right: 2.5%">
            <button class="bg-transparent" @click="setSection('play')">
                <a v-bind:style="section==='play' ? 'Color: white; text-shadow: 0 0 5px white;' : 'Color: black;'">
                  Play
                </a>
            </button>
            <button class="bg-transparent" @click="setSection('about')">
              <a v-bind:style="section==='about' ? 'Color: white; text-shadow: 0 0 5px white;' : 'Color: black;'">
                About
              </a>
            </button>
            <button class="bg-transparent" @click="setSection('controls')">
              <a v-bind:style="section==='controls' ? 'Color: white; text-shadow: 0 0 5px white;' : 'Color: black;'">
                Controls
              </a>
            </button>
          </div>
        </div>
        <hr style="margin-top: 0;width: 95%;border-bottom: 3px solid white;">
      </div>
    </transition>
    <transition name="slide-reverse" mode="out-in">
      <div v-if="section==='controls'" style="margin: 10% 0">
        <h3 class="headers">PC: &nbsp;Arrows. <br>Mobile: &nbsp;Swipe.</h3>
        <h4 class="headers" >The objective is to capture more field (making more steps) than the rival.</h4>
      </div>
    <div v-else-if="section==='about'" style="margin: 10% 0">
      <div class="credits">
        <a class="created" href="https://github.com/abir006">Created by Abir Shaked</a><br><br>
      </div>
      <h3 class="headers" >
        A demo game Showcasing how i handle learning new PL's and tools:<br>
        <br>1. Learning Web from scratch: Vue js, CSS, Javascript.
        <br>2. Implementing AI(MinMax) in Javascript.
      </h3>
      <div class="credits">
        <a class="backImg" href="http://www.freepik.com">Background by upklyak / Freepik</a>
      </div>
    </div>
    <div v-else-if="section==='play'" class="hh" style="margin: 5% 0">
        <Game/>
    </div>
    </transition>
</template>

<script>
import {onMounted, ref} from 'vue'
import 'prevent-pull-refresh';
import Game from "@/components/Game";
import global from "@/global";
export default {
  name: 'App',
  components: {
   Game
  },
  setup() {
    const mountTransition = ref(false)
    onMounted(() => {
      mountTransition.value = true
      section.value = 'play'
    })
    function setSection(setTo){
      section.value = setTo
    }
    const { game } = global
    const section = ref()
    return { game, section, mountTransition, setSection }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@1,700&display=swap');
.headers{
  padding-left: 5%;
  text-align: left;
}
.bg-transparent{
  font-size: 20px;
  border: none;
  text-align: center;
  margin-left: 10px;
}
a:hover { text-shadow: 0 0 5px white; }
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
.slide-reverse-leave-active{
  transition: 0.4s;
}
.slide-reverse-enter-active {
  transition: 1.2s;
}
.slide-reverse-enter-from {
  transform: translate(-100%, 0);
}
.slide-reverse-leave-to {
  transform: translate(-100%, 0);
}
.slide-leave-active,
.slide-enter-active {
  transition: 2s;
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
  font-family: 'Alegreya', serif;
  height: 100%;
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
.credits{
  text-align: left;
  margin-left: 5%;
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
.created{
  font-size: xx-large;
}
.backImg{
 font-size: medium;
}
@media(max-width: 600px) {
  h1{
    font-size: xx-large  !important;
  }
  h3{
    font-size: large  !important;
  }
  h4{
    font-size: medium  !important;
  }
  h5{
    font-size: small  !important;
  }
  .bg-transparent{
    font-size: 16px;
    margin-left: 0px;
  }
  .created{
    font-size: x-large;
  }
  .backImg{
    font-size: small;
  }
  .lds-spinner {
    width: 25px;
    height: 25px;
  }
  .lds-spinner div {
    transform-origin: 10px 10px;
  }
  .lds-spinner div:after {
    top: 0.75px;
    left: 9.25px;
    width: 1.5px;
    height: 4.5px;
    border-radius: 10%;
  }
}
</style>
