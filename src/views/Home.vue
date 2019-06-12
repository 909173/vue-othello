<template>
  <div class="home">
    <othello-board></othello-board>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import BoardVue from "../components/Board.vue";

@Component({
  components: {
    "othello-board": BoardVue
  }
})
export default class Home extends Vue {}
</script>

<style scoped>
.home {
  width: 100%;
}
</style>
