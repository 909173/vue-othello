import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";

import store from "@/store/store";
import { OthelloColor } from "@/Model/othelloModel";

@Module({ namespaced: true, dynamic: true, store, name: "turn" })
export class Turn extends VuexModule {
  whoseTurn: OthelloColor = "black";
  turn: number = 0;
  @Mutation
  SET_TURN(turn: number) {
    this.turn = turn;
  }
  @Action({ rawError: true })
  ADD_TURN() {
    this.SET_TURN(this.turn + 1);
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
export const turn = getModule(Turn);
