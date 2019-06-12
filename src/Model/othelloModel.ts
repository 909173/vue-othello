export type OthelloColor = "black" | "white"; // 白黒
// 升目のあり得る目
export type OthelloSquare = OthelloColor | "empty"; // 白黒空
// マスのひっくり返り回数から白黒、空の判断。
export const fillSquare = (turnNum: number): OthelloSquare =>
  turnNum === 0 ? "empty" : turnNum % 2 === 0 ? "black" : "white";
