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
import SquareVue from "../components/Square.vue";
import { board } from "@/store/module";
@Component({
  name: "Board",
  components: {
    square: SquareVue
  }
})
export default class extends Vue {
  get fill() {
    return (row: number, col: number) => {
      const even = (row + col) % 2 == 0;
      return `background-color: ${even ? "black" : "white"}`;
    };
  }
  mounted() {
    board.InitBoard();
  }
}
</script>
