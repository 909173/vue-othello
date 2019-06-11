import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";

import store from "@/store/store";

@Module({ namespaced: true, dynamic: true, store, name: "board" })
export class Board extends VuexModule {
  boardFill: number[][] = [];
  @Action({ rawError: true })
  InitBoard() {
    const board: number[][] = new Array();
    for (let i = 0; i < 8; i++) {
      board[i] = new Array();
      for (let j = 0; j < 9; j++) {
        board[i][j] = 0;
      }
    }
    board[3][3] = 2;
    board[4][4] = 1;
    board[3][4] = 2;
    board[4][3] = 2;
    this.SET_BOARD_FILL(board);
  }
  @Mutation
  SET_BOARD_FILL(arr: number[][]) {
    this.boardFill = arr;
  }
}
export const board = getModule(Board);
