<template>
  <div>
    <h1>オセロ</h1>
    <whose-turn />
    <othello-result v-if="gameEnd" />
    <div class="board-area">
      <othello-board class="board"></othello-board>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import BoardVue from "../components/Board.vue";
import WhoseTurnVue from "../components/WhoseTurn.vue";
import OthelloResultVue from "../components/OthelloResult.vue";
import { isGameContinue } from "../Model/othelloModel";
import { board } from "../store/module";

@Component({
  components: {
    "othello-board": BoardVue,
    "whose-turn": WhoseTurnVue,
    "othello-result": OthelloResultVue
  }
})
export default class Home extends Vue {
  get gameEnd(): boolean {
    return !isGameContinue(board.boardFill);
  }
}
</script>

<style scoped>
.home {
  width: 100%;
}
.board-area {
  width: 100%;
}
.board {
  margin: auto;
}
</style>
