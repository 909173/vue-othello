<template>
  <table>
    <tr v-for="row in 8" :key="`row ${row}`">
      <td v-for="col in 8" :key="`col ${col} ${row}`">
        <square :col="col - 1" :row="row - 1" />
      </td>
    </tr>
  </table>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { board } from "@/store/module";
import SquareVue from "./Square.vue";
@Component({
  name: "Board",
  components: {
    square: SquareVue
  }
})
export default class extends Vue {
  // mounted() {
  //   board.InitBoard();
  // }
}
</script>
