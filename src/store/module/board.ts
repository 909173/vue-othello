import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";

import store from "@/store/store";
import { turn } from "@/store/module";
import { canPutStone } from "@/Model/othelloModel";

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
  @Action({ rawError: true })
  InitBoard() {
    // ボードの初期化
    const board: number[][] = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this.SET_BOARD_FILL(board);
    // 手番の初期化
    turn.SET_INIT_TURN();
  }
  get CanPutAnyWhere(): boolean {
    return this.boardFill.some((col, colIndex) =>
      col.some((line, lineIndex) =>
        canPutStone(this.boardFill, lineIndex, colIndex, turn.whoseTurn)
      )
    );
  }
  @Mutation
  SET_BOARD_FILL(arr: number[][]) {
    this.boardFill = [...arr];
  }
}
export const board = getModule(Board);
