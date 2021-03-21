<template>
  <div class="jumbotron">
    <h1>Field Capture</h1>
    <h4 style="color: #2c3e50">A demo game showcasing AI and basic web programing</h4>
    <h5 style="color: #2c3e50">The objective is to capture more field (making more steps) than the rival</h5>
    <h4>Controls: PC-W,A,S,D. Mobile-Swipe.</h4>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.jumbotron, * {
  background-color: #659DBD; /* Orange */
  font-weight: bold;
}
h1{
  color: whitesmoke
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

