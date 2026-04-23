"use client";

import Link from "next/link";
import { useEffect, useReducer } from "react";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BASE_SPEED = 720;
const SPEED_STEP = 60;
const MIN_SPEED = 130;

type PieceType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";
type BoardCell = PieceType | null;
type GameStatus = "playing" | "paused" | "over";

type Piece = {
  type: PieceType;
  rotation: number;
  x: number;
  y: number;
};

type GameState = {
  board: BoardCell[];
  piece: Piece;
  nextType: PieceType;
  score: number;
  lines: number;
  level: number;
  status: GameStatus;
};

const PIECE_TYPES: PieceType[] = ["I", "O", "T", "S", "Z", "J", "L"];

const COLORS: Record<PieceType, string> = {
  I: "#6dd3ff",
  O: "#ffd56a",
  T: "#b98cff",
  S: "#6ff0a6",
  Z: "#ff7e7e",
  J: "#7aa7ff",
  L: "#ffb35c",
};

const SHAPE_BASES: Record<PieceType, number[][]> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  T: [
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  S: [
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  Z: [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  L: [
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};

const ROTATIONS: Record<PieceType, number[][][]> = Object.fromEntries(
  PIECE_TYPES.map((type) => {
    const base = SHAPE_BASES[type];
    const rot1 = rotateMatrix(base);
    const rot2 = rotateMatrix(rot1);
    const rot3 = rotateMatrix(rot2);
    return [type, [base, rot1, rot2, rot3]];
  })
) as Record<PieceType, number[][][]>;

const SCORE_TABLE: Record<number, number> = {
  1: 100,
  2: 300,
  3: 500,
  4: 800,
};

function createBoard() {
  return Array.from({ length: BOARD_WIDTH * BOARD_HEIGHT }, () => null as BoardCell);
}

function randomPieceType() {
  return PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
}

function createPiece(type: PieceType): Piece {
  return {
    type,
    rotation: 0,
    x: 3,
    y: 0,
  };
}

function rotateMatrix(matrix: number[][]) {
  return Array.from({ length: 4 }, (_, x) => Array.from({ length: 4 }, (_, y) => matrix[3 - y][x]));
}

function getBlocks(piece: Piece) {
  const matrix = ROTATIONS[piece.type][piece.rotation % 4];
  const blocks: Array<{ x: number; y: number }> = [];

  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      if (matrix[row][col]) {
        blocks.push({ x: piece.x + col, y: piece.y + row });
      }
    }
  }

  return blocks;
}

function canPlace(board: BoardCell[], piece: Piece) {
  return getBlocks(piece).every(({ x, y }) => {
    if (x < 0 || x >= BOARD_WIDTH || y < 0 || y >= BOARD_HEIGHT) {
      return false;
    }

    return board[y * BOARD_WIDTH + x] === null;
  });
}

function mergePiece(board: BoardCell[], piece: Piece) {
  const nextBoard = board.slice();
  getBlocks(piece).forEach(({ x, y }) => {
    if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
      nextBoard[y * BOARD_WIDTH + x] = piece.type;
    }
  });
  return nextBoard;
}

function clearLines(board: BoardCell[]) {
  const rows: BoardCell[][] = [];
  let cleared = 0;

  for (let row = 0; row < BOARD_HEIGHT; row += 1) {
    const slice = board.slice(row * BOARD_WIDTH, row * BOARD_WIDTH + BOARD_WIDTH);
    if (slice.every(Boolean)) {
      cleared += 1;
      continue;
    }

    rows.push(slice);
  }

  while (rows.length < BOARD_HEIGHT) {
    rows.unshift(Array.from({ length: BOARD_WIDTH }, () => null));
  }

  return {
    board: rows.flat(),
    cleared,
  };
}

function spawnNextPiece(state: GameState, lockedPiece: Piece) {
  const merged = mergePiece(state.board, lockedPiece);
  const clearedResult = clearLines(merged);
  const cleared = clearedResult.cleared;
  const scoreGain = SCORE_TABLE[cleared] ?? cleared * 200;
  const lines = state.lines + cleared;
  const level = Math.floor(lines / 10) + 1;
  const nextPiece = createPiece(state.nextType);
  const nextType = randomPieceType();

  if (!canPlace(clearedResult.board, nextPiece)) {
    return {
      ...state,
      board: clearedResult.board,
      piece: nextPiece,
      nextType,
      score: state.score + scoreGain,
      lines,
      level,
      status: "over" as const,
    };
  }

  return {
    ...state,
    board: clearedResult.board,
    piece: nextPiece,
    nextType,
    score: state.score + scoreGain,
    lines,
    level,
  };
}

function createInitialState(): GameState {
  const firstType = randomPieceType();
  const nextType = randomPieceType();
  const piece = createPiece(firstType);
  const initialBoard = createBoard();

  if (!canPlace(initialBoard, piece)) {
    return {
      board: initialBoard,
      piece,
      nextType,
      score: 0,
      lines: 0,
      level: 1,
      status: "over",
    };
  }

  return {
    board: initialBoard,
    piece,
    nextType,
    score: 0,
    lines: 0,
    level: 1,
    status: "playing",
  };
}

function hardDropPiece(state: GameState) {
  let nextPiece = { ...state.piece };

  while (canPlace(state.board, { ...nextPiece, y: nextPiece.y + 1 })) {
    nextPiece = { ...nextPiece, y: nextPiece.y + 1 };
  }

  return spawnNextPiece(state, nextPiece);
}

type Action =
  | { type: "RESET" }
  | { type: "TICK" }
  | { type: "MOVE"; dx: number; dy: number }
  | { type: "ROTATE" }
  | { type: "DROP" }
  | { type: "TOGGLE_PAUSE" };

function tryMove(state: GameState, dx: number, dy: number) {
  const movedPiece = { ...state.piece, x: state.piece.x + dx, y: state.piece.y + dy };
  if (canPlace(state.board, movedPiece)) {
    return {
      ...state,
      piece: movedPiece,
      score: dy === 1 ? state.score + 1 : state.score,
    };
  }

  if (dy === 1) {
    return spawnNextPiece(state, state.piece);
  }

  return state;
}

function tryRotate(state: GameState) {
  const nextRotation = (state.piece.rotation + 1) % 4;
  const kicks = [0, -1, 1, -2, 2];

  for (const kick of kicks) {
    const rotated = { ...state.piece, rotation: nextRotation, x: state.piece.x + kick };
    if (canPlace(state.board, rotated)) {
      return {
        ...state,
        piece: rotated,
      };
    }
  }

  return state;
}

function reducer(state: GameState, action: Action): GameState {
  if (action.type === "RESET") {
    return createInitialState();
  }

  if (state.status === "over") {
    return state;
  }

  if (action.type === "TOGGLE_PAUSE") {
    return {
      ...state,
      status: state.status === "paused" ? "playing" : "paused",
    };
  }

  if (state.status === "paused") {
    return state;
  }

  switch (action.type) {
    case "TICK":
      return tryMove(state, 0, 1);
    case "MOVE":
      return tryMove(state, action.dx, action.dy);
    case "ROTATE":
      return tryRotate(state);
    case "DROP":
      return hardDropPiece(state);
    default:
      return state;
  }
}

function previewMatrix(type: PieceType) {
  return ROTATIONS[type][0];
}

function renderPreviewCells(type: PieceType) {
  const matrix = previewMatrix(type);
  const cells: Array<{ filled: boolean; key: string }> = [];

  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      cells.push({ filled: Boolean(matrix[row][col]), key: `${row}-${col}` });
    }
  }

  return cells;
}

export default function TetrisPage() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

  useEffect(() => {
    if (state.status !== "playing") {
      return undefined;
    }

    const speed = Math.max(MIN_SPEED, BASE_SPEED - (state.level - 1) * SPEED_STEP);
    const timer = window.setInterval(() => dispatch({ type: "TICK" }), speed);

    return () => window.clearInterval(timer);
  }, [state.level, state.status]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      if (["arrowleft", "arrowright", "arrowdown", "arrowup", " ", "a", "d", "s", "w", "z", "x", "p"].includes(key)) {
        event.preventDefault();
      }

      if (key === "arrowleft" || key === "a") {
        dispatch({ type: "MOVE", dx: -1, dy: 0 });
      } else if (key === "arrowright" || key === "d") {
        dispatch({ type: "MOVE", dx: 1, dy: 0 });
      } else if (key === "arrowdown" || key === "s") {
        dispatch({ type: "MOVE", dx: 0, dy: 1 });
      } else if (key === "arrowup" || key === "w" || key === "x") {
        dispatch({ type: "ROTATE" });
      } else if (key === " ") {
        dispatch({ type: "DROP" });
      } else if (key === "p") {
        dispatch({ type: "TOGGLE_PAUSE" });
      } else if (key === "z") {
        dispatch({ type: "RESET" });
      }
    }

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const displayBoard = state.board.slice();
  getBlocks(state.piece).forEach(({ x, y }) => {
    if (x >= 0 && x < BOARD_WIDTH && y >= 0 && y < BOARD_HEIGHT) {
      displayBoard[y * BOARD_WIDTH + x] = state.piece.type;
    }
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(120,160,255,0.14),transparent_28%),linear-gradient(180deg,#050505_0%,#090909_55%,#050505_100%)] pt-20 text-white">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="max-w-xl">
          <Link
            href="/fun"
            className="inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
          >
            返回 Fun
          </Link>

          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-white/30">Tetris</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">Drop clean. Clear lines.</h1>
          <p className="mt-6 text-sm leading-7 text-white/45 md:text-base">
            俄罗斯方块做成了一个极简的桌面式游戏页。方向键移动，空格硬降，P 暂停，R 重开。
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/45">
            <span className="rounded-full border border-white/10 px-3 py-2">Arrow keys</span>
            <span className="rounded-full border border-white/10 px-3 py-2">Space drop</span>
            <span className="rounded-full border border-white/10 px-3 py-2">P pause</span>
            <span className="rounded-full border border-white/10 px-3 py-2">R restart</span>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3">
            <Stat label="Score" value={state.score} />
            <Stat label="Lines" value={state.lines} />
            <Stat label="Level" value={state.level} />
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-white/30">Controls</p>
            <div className="mt-4 grid gap-3 text-sm text-white/55 sm:grid-cols-2">
              <Control label="Move" value="Arrow keys / A D" />
              <Control label="Soft drop" value="Arrow Down / S" />
              <Control label="Rotate" value="Arrow Up / W / X" />
              <Control label="Hard drop" value="Space" />
              <Control label="Pause" value="P" />
              <Control label="Restart" value="R" />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => dispatch({ type: "MOVE", dx: -1, dy: 0 })}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition-colors hover:border-white/20 hover:text-white"
            >
              ← Left
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "MOVE", dx: 1, dy: 0 })}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition-colors hover:border-white/20 hover:text-white"
            >
              Right →
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "ROTATE" })}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition-colors hover:border-white/20 hover:text-white"
            >
              Rotate
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "DROP" })}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition-colors hover:border-white/20 hover:text-white"
            >
              Drop
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "TOGGLE_PAUSE" })}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition-colors hover:border-white/20 hover:text-white"
            >
              {state.status === "paused" ? "Resume" : "Pause"}
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "RESET" })}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              Restart
            </button>
          </div>

          <p className="mt-6 text-sm text-white/35">
            {state.status === "over" ? "Game over. 重新开始再来一局。" : "把每一列保持干净，先清线，再追更高等级。"}
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[36px] bg-[radial-gradient(circle,rgba(120,160,255,0.14),transparent_60%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/40 md:p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/30">Playfield</p>
                <h2 className="mt-2 text-lg font-semibold">Stack with intent</h2>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.22em] text-white/30">
                {state.status === "paused" ? (
                  <span className="rounded-full border border-white/10 px-3 py-2 text-white/80">Paused</span>
                ) : null}
                {state.status === "over" ? (
                  <span className="rounded-full border border-white/10 px-3 py-2 text-white/80">Game over</span>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1fr_140px]">
              <div className="rounded-[28px] bg-[#161616] p-3 md:p-4">
                <div className="grid aspect-[1/2] grid-cols-10 gap-[2px] rounded-[22px] bg-[#232323] p-2">
                  {displayBoard.map((cell, index) => {
                    const type = cell ?? "O";
                    const filled = Boolean(cell);
                    return (
                      <div
                        key={index}
                        className={`rounded-[4px] border border-white/5 transition-colors ${
                          filled ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]" : "bg-black/25"
                        }`}
                        style={{
                          backgroundColor: filled ? COLORS[type] : "rgba(255,255,255,0.035)",
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-white/30">Next</p>
                <div className="mt-4 rounded-[20px] bg-[#151515] p-3">
                  <div className="grid grid-cols-4 gap-2">
                    {renderPreviewCells(state.nextType).map((cell) => (
                      <div
                        key={cell.key}
                        className="aspect-square rounded-[4px] border border-white/5"
                        style={{
                          backgroundColor: cell.filled ? COLORS[state.nextType] : "rgba(255,255,255,0.04)",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-5 space-y-3 text-sm text-white/45">
                  <p>Speed: {Math.max(MIN_SPEED, BASE_SPEED - (state.level - 1) * SPEED_STEP)} ms</p>
                  <p>Goal: clear lines and keep climbing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-white/30">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value.toLocaleString("en-US")}</p>
    </div>
  );
}

function Control({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.22em] text-white/30">{label}</p>
      <p className="mt-2">{value}</p>
    </div>
  );
}
