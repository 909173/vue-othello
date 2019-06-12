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
  boardFill: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ];
  whoseTurn: OthelloColor = "black";
  @Action({ rawError: true })
  InitBoard() {
    const board: number[][] = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this.SET_BOARD_FILL(board);
    this.SET_INIT_TURN();
  }
  @Mutation
  SET_BOARD_FILL(arr: number[][]) {
    this.boardFill = [...arr];
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
