<template>
  <div
    class="square"
    :style="`background-color: ${backgroundColor}`"
    @click="putStone"
  ></div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { OthelloSquare, fillSquare } from "@/Model/othelloModel";
import { Prop } from "vue-property-decorator";
import { board } from "../store/module";
@Component({
  name: "square"
})
export default class extends Vue {
  @Prop() col!: number;
  @Prop() row!: number;
  get boardFill() {
    return [...board.boardFill];
  }
  // 何色で埋めるか
  /**
   * 偶数→黒
   * 奇数→白
   */
  get SquareFill(): OthelloSquare {
    if (this.boardFill.length === 0) return "empty";
    const panelFill = this.boardFill[this.row][this.col];
    return fillSquare(panelFill);
  }
  get backgroundColor() {
    if (this.SquareFill === "empty") return "green";
    return this.SquareFill;
  }
  // 石を置く
  putStone() {
    const boardFill = [...this.boardFill];
    boardFill[this.row][this.col] = board.whoseTurn === "black" ? 2 : 1;
    board.SET_BOARD_FILL(boardFill);
    board.SET_NEXT_TURN();
  }
}
</script>
<style scoped>
.square {
  width: 50px;
  height: 50px;
}
</style>
