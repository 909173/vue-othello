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

export const canPutStone = (
  board: number[][],
  line: number,
  col: number,
  whoseTurn: OthelloColor
): boolean => {
  console.log(board, line, col, whoseTurn);
  if (!isEmpty(board[line][col])) return false;
  const edgeJudge = whoseTurn === "black" ? isWhite : isBlack;
  const nodeJudge = whoseTurn === "black" ? isBlack : isWhite;
  if (isOnBoard(line - 2, col)) {
    let counter = 0;
    for (
      let i = 1;
      i++;
      isOnBoard(line - i, col) && !isEmpty(board[line - i][col])
    ) {
      console.log(line - i, col);
      if (edgeJudge(board[line - i][col])) counter++;
      if (nodeJudge(board[line - i][col]) && counter > 0) return true;
    }
  }
  if (isOnBoard(line + 2, col)) {
    let counter = 0;
    for (
      let i = 1;
      i++;
      isOnBoard(line + i, col) && !isEmpty(board[line + i][col])
    ) {
      if (edgeJudge(board[line + i][col])) counter++;
      if (nodeJudge(board[line + i][col]) && counter > 0) return true;
    }
  }
  if (isOnBoard(line, col - 2)) {
    let counter = 0;
    for (
      let i = 1;
      i++;
      isOnBoard(line, col - i) && !isEmpty(board[line][col - i])
    ) {
      if (edgeJudge(board[line][col - i])) counter++;
      if (nodeJudge(board[line][col - i]) && counter > 0) return true;
    }
  }
  if (isOnBoard(line, col + 2)) {
    let counter = 0;
    for (
      let i = 1;
      i++;
      isOnBoard(line, col + i) && !isEmpty(board[line][col + i])
    ) {
      if (edgeJudge(board[line][col + i])) counter++;
      if (nodeJudge(board[line][col + i]) && counter > 0) return true;
    }
  }
  if (isOnBoard(line - 2, col - 2)) {
    let counter = 0;
    for (
      let i = 1;
      i++;
      isOnBoard(line - i, col - i) && !isEmpty(board[line - i][col - i])
    ) {
      if (edgeJudge(board[line - i][col - i])) counter++;
      if (nodeJudge(board[line - i][col - i]) && counter > 0) return true;
    }
  }

  if (isOnBoard(line + 2, col - 2)) {
    let counter = 0;
    for (
      let i = 1;
      i++;
      isOnBoard(line + i, col - i) && !isEmpty(board[line + i][col - i])
    ) {
      if (edgeJudge(board[line + i][col - i])) counter++;
      if (nodeJudge(board[line + i][col - i]) && counter > 0) return true;
    }
  }

  if (isOnBoard(line - 2, col + 2)) {
    let counter = 0;
    for (
      let i = 1;
      i++;
      isOnBoard(line - i, col + i) && !isEmpty(board[line - i][col + i])
    ) {
      if (edgeJudge(board[line - i][col + i])) counter++;
      if (nodeJudge(board[line - i][col + i]) && counter > 0) return true;
    }
  }

  if (isOnBoard(line + 2, col + 2)) {
    let counter = 0;
    for (
      let i = 1;
      i++;
      isOnBoard(line + i, col + i) && !isEmpty(board[line + i][col + i])
    ) {
      if (edgeJudge(board[line + i][col + i])) counter++;
      if (nodeJudge(board[line + i][col + i]) && counter > 0) return true;
    }
  }
  return false;
};
