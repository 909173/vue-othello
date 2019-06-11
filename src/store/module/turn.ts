import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";

import store from "@/store/store";

@Module({ namespaced: true, dynamic: true, store, name: "turn" })
export class Turn extends VuexModule {
  turn: number = 0;
  @Mutation
  SET_TURN(turn: number) {
    this.turn = turn;
  }
}
export const turn = getModule(Turn);
_;
