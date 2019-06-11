<template>
  <div class="square" :style="`background-color: ${backgroundColor}`"></div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { OthelloSquare } from "@/Model/othelloModel";
import { Prop } from "vue-property-decorator";
import { board } from "../store/module";
@Component({
  name: "square"
})
export default class extends Vue {
  @Prop() col!: number;
  @Prop() row!: number;
  get boardFill() {
    return board.boardFill;
  }
  get SquareFill(): OthelloSquare {
    if (this.boardFill.length === 0) return "empty";
    const panelFill = this.boardFill[this.row][this.col];
    if (panelFill === 0) return "empty";
    return panelFill % 2 === 0 ? "white" : "black";
  }
  get backgroundColor() {
    if (this.SquareFill === "empty") return "green";
    return this.SquareFill;
  }
}
</script>
<style scoped>
.square {
  width: 50px;
  height: 50px;
}
</style>
