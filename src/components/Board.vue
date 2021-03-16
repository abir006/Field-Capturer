<template>
  <div v-for="x in rows" :key="x" style="border: none">
    <span v-for="y in cols" :key="y">
      <img src="../assets/openField.png" alt="" style="vertical-align: bottom">
    </span>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
name: "Board",
  setup() {
    const rows = ref(6)
    const cols = ref(6)
    return { rows, cols }
  }
}
</script>
