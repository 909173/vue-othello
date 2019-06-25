<template>
  <div>
    <h2>{{ turnPlayer }}のターンです</h2>
    <button v-if="!canPutAnyWhere" @click="skipTurn">スキップ</button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { turn, board } from "../store/module";
import { canPutStoneAnyWhere, isGameContinue } from "../Model/othelloModel";
@Component({
  name: "whose-turn"
})
export default class extends Vue {
  get turnPlayer(): string {
    return turn.whoseTurn === "black" ? "黒" : "白";
  }
  get canPutAnyWhere(): boolean {
    if (isGameContinue(board.boardFill)) return false;
    return canPutStoneAnyWhere(board.boardFill, turn.whoseTurn);
  }
  skipTurn() {
    turn.SET_NEXT_TURN();
  }
}
</script>
