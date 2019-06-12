import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";

import store from "@/store/store";
import { OthelloColor } from "@/Model/othelloModel";

@Module({ namespaced: true, dynamic: true, store, name: "board" })
export class Board extends VuexModule {
  boardFill: number[][] = [];
  whoseTurn: OthelloColor = "black";
  @Action({ rawError: true })
  InitBoard() {
    const board: number[][] = new Array();
    for (let i = 0; i < 8; i++) {
      board[i] = new Array();
      for (let j = 0; j < 9; j++) {
        board[i][j] = 0;
      }
    }
    board[3][3] = 1;
    board[4][4] = 1;
    board[3][4] = 2;
    board[4][3] = 2;
    this.SET_BOARD_FILL(board);
    this.SET_INIT_TURN();
  }
  @Mutation
  SET_BOARD_FILL(arr: number[][]) {
    this.boardFill = arr;
  }
  @Mutation
  SET_NEXT_TURN() {
    this.whoseTurn = this.whoseTurn === "black" ? "white" : "black";
  }
  @Mutation
  SET_INIT_TURN() {
    this.whoseTurn = "black";
  }
}
export const board = getModule(Board);
