<template>
  <div v-if="show">
    &nbsp;
    <h1>Field Capture</h1>
    <h4 style="color: black">A demo game showcasing AI and basic web programing</h4>
    <h5 style="color: black">The objective is to capture more field (making more steps) than the rival</h5>
    <h4 style="color: black">Controls: PC-Arrows. Mobile-Swipe.</h4>
    <hr>
    &nbsp;
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  name: "Header",
  setup() {
    const show = ref(false)
    onMounted(() => {
      show.value = true
    })
    return { show }
  }
}

</script>

<style scoped>
*{
  font-family: Palatino,serif;
}
hr{
  width: 80%;
  border-bottom: 3px solid white;
}
h1{
  color: black;
  font-weight: bolder;
}
@media (max-width: 600px) {
  h1{
    font-size: x-large;
  }
  h4{
    font-size: medium;
  }
  h5{
    font-size: small;
  }
}
</style>

