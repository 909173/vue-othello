<template>
  <div>
    <h1>ゲーム終了</h1>
    <h2 v-if="whiteCount !== blackCount">{{ winner }}の勝利</h2>
    <h2 v-else>引き分け</h2>
    <h2>{{ blackCount }} VS {{ whiteCount }}</h2>
    <button @click="resetGame">reset</button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { board, turn } from "../store/module";
import { isWhite, isBlack } from "../Model/othelloModel";
@Component({
  name: "othello-result"
})
export default class extends Vue {
  get blackCount(): number {
    let blackCount = 0;
    board.boardFill.forEach(col =>
      col.forEach(
        line => (blackCount = isBlack(line) ? blackCount + 1 : blackCount)
      )
    );
    return blackCount;
  }

  get whiteCount(): number {
    let whiteCount = 0;
    board.boardFill.forEach(col =>
      col.forEach(
        line => (whiteCount = isWhite(line) ? whiteCount + 1 : whiteCount)
      )
    );
    return whiteCount;
  }
  get winner(): string {
    return this.whiteCount > this.blackCount ? "白" : "黒";
  }
  resetGame() {
    board.InitBoard();
  }
}
</script>
