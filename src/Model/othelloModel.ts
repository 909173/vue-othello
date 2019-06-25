import { board } from "@/store/module";

export type OthelloColor = "black" | "white"; // 白黒
// 升目のあり得る目
export type OthelloSquare = OthelloColor | "empty"; // 白黒空
// マスのひっくり返り回数から白黒、空の判断。
export const fillSquare = (turnNum: number): OthelloSquare =>
  turnNum === 0 ? "empty" : turnNum % 2 === 0 ? "black" : "white";
export const isBlack = (num: number): boolean => num > 0 && num % 2 === 0;
export const isWhite = (num: number): boolean => num > 0 && num % 2 === 1;
export const isEmpty = (num: number): boolean => num === 0;
export const isOnBoard = (line: number, col: number) =>
  0 <= line && line <= 7 && 0 <= col && col <= 7;

// 直線方向に石が置けるか判定するためのモデル
export type TurnOverModel = {
  whoseTurn: OthelloColor; // 白黒どちらのターンか
  lineMove: -1 | 0 | 1; // 行方向ベクトル
  colMove: -1 | 0 | 1; // 列方向ベクトル
  board: number[][]; // 盤面
  coordinate: {
    // 判定座標
    line: number;
    col: number;
  };
};
// ゲームが続行できるかどうかを判定する。
export const isGameContinue = (board: number[][]): boolean =>
  canPutStoneAnyWhere(board, "black") || canPutStoneAnyWhere(board, "white");
// どこかにマスが置けるかどうか判定
export const canPutStoneAnyWhere = (
  board: number[][],
  whoseTurn: OthelloColor
): boolean =>
  board.some((col, colIndex) =>
    col.some((_, lineIndex) =>
      canPutStone(board, lineIndex, colIndex, whoseTurn)
    )
  );
// 特定の盤面で入力されたマスに石が置けるかどうかを判定する
export const canPutStone = (
  board: number[][], // 盤面
  line: number,
  col: number,
  whoseTurn: OthelloColor // どちらのターンか
): boolean => {
  // 空の場所以外は置けない。
  if (!isEmpty(board[line][col])) return false;
  const model: TurnOverModel = {
    board,
    coordinate: {
      col,
      line
    },
    whoseTurn,
    colMove: 0,
    lineMove: 0
  };
  /**
   * Eを中心としたとき、8方向に置けないかどうかを判定
   * colMoveとlineMoveでベクトルを管理。
   * 1 2 3
   * 4 E 5
   * 6 7 8
   */

  // 上
  model.colMove = 0;
  model.lineMove = -1;
  if (CanTurnOverStraightLine(model)) return true;
  // 下
  model.colMove = 0;
  model.lineMove = 1;
  if (CanTurnOverStraightLine(model)) return true;
  // 左
  model.colMove = -1;
  model.lineMove = 0;
  if (CanTurnOverStraightLine(model)) return true;
  // 右
  model.colMove = 1;
  model.lineMove = 0;
  if (CanTurnOverStraightLine(model)) return true;
  // 左下
  model.colMove = -1;
  model.lineMove = -1;
  if (CanTurnOverStraightLine(model)) return true;
  // 左上
  model.colMove = -1;
  model.lineMove = 1;
  if (CanTurnOverStraightLine(model)) return true;
  // 右下
  model.colMove = 1;
  model.lineMove = -1;
  if (CanTurnOverStraightLine(model)) return true;
  // 右上
  model.colMove = 1;
  model.lineMove = 1;
  if (CanTurnOverStraightLine(model)) return true;
  return false;
};
// 実際にひっくり返す
export const TurnOver = (
  board: number[][],
  line: number,
  col: number,
  whoseTurn: OthelloColor
): number[][] => {
  const model: TurnOverModel = {
    board,
    coordinate: {
      col,
      line
    },
    whoseTurn,
    colMove: 0,
    lineMove: 0
  };

  model.colMove = 0;
  model.lineMove = -1;
  model.board = TurnOverStraightLine(model);
  // 下
  model.colMove = 0;
  model.lineMove = 1;
  model.board = TurnOverStraightLine(model);
  // 左
  model.colMove = -1;
  model.lineMove = 0;
  model.board = TurnOverStraightLine(model);
  // 右
  model.colMove = 1;
  model.lineMove = 0;
  model.board = TurnOverStraightLine(model);
  // 左下
  model.colMove = -1;
  model.lineMove = -1;
  model.board = TurnOverStraightLine(model);
  // 左上
  model.colMove = -1;
  model.lineMove = 1;
  model.board = TurnOverStraightLine(model);
  // 右下
  model.colMove = 1;
  model.lineMove = -1;
  model.board = TurnOverStraightLine(model);
  // 右上
  model.colMove = 1;
  model.lineMove = 1;
  model.board = TurnOverStraightLine(model);
  return model.board;
};
// 指定の座標から、直線方向に石を置けるかどうかを判定する。
export const CanTurnOverStraightLine = (model: TurnOverModel): boolean => {
  const edgeJudge = model.whoseTurn === "black" ? isWhite : isBlack;
  const nodeJudge = model.whoseTurn === "black" ? isBlack : isWhite;
  let counter = 0;
  let i = 1;
  while (
    isOnBoard(
      model.coordinate.line + i * model.lineMove,
      model.coordinate.col + i * model.colMove
    ) &&
    !isEmpty(
      model.board[model.coordinate.line + i * model.lineMove][
        model.coordinate.col + i * model.colMove
      ]
    )
  ) {
    if (
      edgeJudge(
        model.board[model.coordinate.line + i * model.lineMove][
          model.coordinate.col + i * model.colMove
        ]
      )
    )
      counter++;
    if (
      nodeJudge(
        model.board[model.coordinate.line + i * model.lineMove][
          model.coordinate.col + i * model.colMove
        ]
      ) &&
      counter > 0
    )
      return true;
    if (
      nodeJudge(
        model.board[model.coordinate.line + i * model.lineMove][
          model.coordinate.col + i * model.colMove
        ]
      )
    )
      break;
    i++;
  }
  return false;
};
// 直線上をひっくり返す
export const TurnOverStraightLine = (model: TurnOverModel): number[][] => {
  if (!CanTurnOverStraightLine(model)) return model.board;
  const edgeJudge = model.whoseTurn === "black" ? isWhite : isBlack;
  const returnBoard = [...model.board];
  let i = 1;
  while (
    isOnBoard(
      model.coordinate.line + i * model.lineMove,
      model.coordinate.col + i * model.colMove
    ) &&
    edgeJudge(
      model.board[model.coordinate.line + i * model.lineMove][
        model.coordinate.col + i * model.colMove
      ]
    )
  ) {
    returnBoard[model.coordinate.line + i * model.lineMove][
      model.coordinate.col + i * model.colMove
    ]++;
    i++;
  }
  return returnBoard;
};
