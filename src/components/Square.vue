<template>
  <div class="square" :class="squareClass" @click="putStone">
    <stone :color="SquareFill" v-if="SquareFill !== 'empty'" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {
  OthelloSquare,
  fillSquare,
  canPutStone,
  TurnOver
} from "@/Model/othelloModel";
import { Prop } from "vue-property-decorator";
import { board, turn } from "../store/module";
import StoneVue from "./Stone.vue";

@Component({
  name: "square",
  components: {
    stone: StoneVue
  }
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
    const panelFill = this.boardFill[this.row][this.col];
    return fillSquare(panelFill);
  }

  get canPutStone(): boolean {
    return canPutStone(this.boardFill, this.row, this.col, turn.whoseTurn);
  }
  get squareClass(): string {
    const classes: any = {
      "can-put": this.canPutStone,
      "square-empty": true
    };
    // classes[`square-${this.SquareFill}`] = true;
    return classes;
  }
  // 石を置く
  putStone() {
    if (!this.canPutStone) return;
    let boardFill = [...this.boardFill];
    boardFill[this.row][this.col] = turn.whoseTurn === "black" ? 2 : 1;
    boardFill = TurnOver(boardFill, this.row, this.col, turn.whoseTurn);
    board.SET_BOARD_FILL(boardFill);
    turn.SET_NEXT_TURN();
  }
}
</script>
<style scoped>
.square {
  width: 50px;
  height: 50px;
  border: solid 2px;
  box-shadow: inset 0 0 5px 5px rgba(0, 0, 0, 0.25);
}
.square-empty {
  background-color: green;
}
.can-put {
  border: solid 2px red;
  cursor: pointer;
}
</style>
