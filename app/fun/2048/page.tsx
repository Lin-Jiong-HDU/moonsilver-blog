"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const SIZE = 4;
const TARGET = 2048;
const BEST_KEY = "moonsilver-2048-best";

type Direction = "left" | "right" | "up" | "down";
type Board = number[];

function createEmptyBoard() {
  return Array.from({ length: SIZE * SIZE }, () => 0);
}

function cloneBoard(board: Board) {
  return board.slice();
}

function boardToMatrix(board: Board) {
  return Array.from({ length: SIZE }, (_, row) => board.slice(row * SIZE, row * SIZE + SIZE));
}

function matrixToBoard(matrix: number[][]) {
  return matrix.flat();
}

function reverseRows(matrix: number[][]) {
  return matrix.map((row) => row.slice().reverse());
}

function transpose(matrix: number[][]) {
  return Array.from({ length: SIZE }, (_, row) => Array.from({ length: SIZE }, (_, col) => matrix[col][row]));
}

function slideRow(row: number[]) {
  const values = row.filter(Boolean);
  const merged: number[] = [];
  let scoreGain = 0;

  for (let i = 0; i < values.length; i += 1) {
    const current = values[i];
    const next = values[i + 1];

    if (current === next) {
      const doubled = current * 2;
      merged.push(doubled);
      scoreGain += doubled;
      i += 1;
      continue;
    }

    merged.push(current);
  }

  while (merged.length < SIZE) {
    merged.push(0);
  }

  return {
    row: merged,
    moved: merged.some((value, index) => value !== row[index]),
    scoreGain,
  };
}

function moveBoard(board: Board, direction: Direction) {
  const matrix = boardToMatrix(board);

  let oriented = matrix;
  if (direction === "right") {
    oriented = reverseRows(matrix);
  } else if (direction === "up") {
    oriented = transpose(matrix);
  } else if (direction === "down") {
    oriented = reverseRows(transpose(matrix));
  }

  let moved = false;
  let scoreGain = 0;
  const nextOriented = oriented.map((row) => {
    const result = slideRow(row);
    moved ||= result.moved;
    scoreGain += result.scoreGain;
    return result.row;
  });

  let restored = nextOriented;
  if (direction === "right") {
    restored = reverseRows(nextOriented);
  } else if (direction === "up") {
    restored = transpose(nextOriented);
  } else if (direction === "down") {
    restored = transpose(reverseRows(nextOriented));
  }

  return {
    board: matrixToBoard(restored),
    moved,
    scoreGain,
  };
}

function getEmptyIndexes(board: Board) {
  return board.flatMap((value, index) => (value === 0 ? [index] : []));
}

function spawnTile(board: Board) {
  const empties = getEmptyIndexes(board);
  if (empties.length === 0) {
    return board;
  }

  const nextBoard = cloneBoard(board);
  const index = empties[Math.floor(Math.random() * empties.length)];
  nextBoard[index] = Math.random() < 0.9 ? 2 : 4;
  return nextBoard;
}

function hasMoves(board: Board) {
  if (board.some((value) => value === 0)) {
    return true;
  }

  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      const value = board[row * SIZE + col];
      const right = col < SIZE - 1 ? board[row * SIZE + col + 1] : 0;
      const down = row < SIZE - 1 ? board[(row + 1) * SIZE + col] : 0;

      if (value === right || value === down) {
        return true;
      }
    }
  }

  return false;
}

function tileClass(value: number) {
  const map: Record<number, string> = {
    0: "bg-white/5 text-white/10",
    2: "bg-[#2a2a2a] text-[#f7f2e8]",
    4: "bg-[#3b3327] text-[#fff0cf]",
    8: "bg-[#7a4d1b] text-[#fff9ef]",
    16: "bg-[#a85f12] text-white",
    32: "bg-[#d06a0f] text-white",
    64: "bg-[#ea5a18] text-white",
    128: "bg-[#e0a600] text-[#1a1200]",
    256: "bg-[#e8c300] text-[#1a1200]",
    512: "bg-[#f2d54a] text-[#1a1200]",
    1024: "bg-[#f5df7d] text-[#1a1200]",
    2048: "bg-[#ffffff] text-[#101010]",
  };

  return map[value] ?? "bg-[#ffffff] text-[#101010]";
}

function formatScore(value: number) {
  return value.toLocaleString("en-US");
}

function readBestScore() {
  if (typeof window === "undefined") {
    return 0;
  }

  const stored = window.localStorage.getItem(BEST_KEY);
  if (!stored) {
    return 0;
  }

  const parsed = Number(stored);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function Game2048Page() {
  const [board, setBoard] = useState<Board>(() => spawnTile(spawnTile(createEmptyBoard())));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => readBestScore());

  const won = board.some((value) => value >= TARGET);
  const gameOver = !hasMoves(board);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(BEST_KEY, String(bestScore));
    }
  }, [bestScore]);

  const resetGame = useCallback(() => {
    const nextBoard = spawnTile(spawnTile(createEmptyBoard()));
    setBoard(nextBoard);
    setScore(0);
  }, []);

  const applyMove = useCallback((direction: Direction) => {
    if (gameOver) {
      return;
    }

    const result = moveBoard(board, direction);
    if (!result.moved) {
      return;
    }

    const nextBoard = spawnTile(result.board);
    const nextScore = score + result.scoreGain;
    setBoard(nextBoard);
    setScore(nextScore);
    setBestScore((current) => Math.max(current, nextScore));
  }, [gameOver, score, board]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();

      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " ", "w", "a", "s", "d"].includes(key)) {
        event.preventDefault();
      }

      if (key === "arrowleft" || key === "a") {
        applyMove("left");
      } else if (key === "arrowright" || key === "d") {
        applyMove("right");
      } else if (key === "arrowup" || key === "w") {
        applyMove("up");
      } else if (key === "arrowdown" || key === "s") {
        applyMove("down");
      } else if (key === "r") {
        resetGame();
      }
    }

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [applyMove, resetGame]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,200,120,0.14),transparent_30%),linear-gradient(180deg,#050505_0%,#090909_55%,#050505_100%)] pt-20 text-white">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="max-w-xl">
          <Link
            href="/fun"
            className="inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
          >
            返回 Fun
          </Link>

          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-white/30">2048</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">Slide. Merge. Chase 2048.</h1>
          <p className="mt-6 text-sm leading-7 text-white/45 md:text-base">
            这版 2048 保留最直接的规则，视觉上做得更克制一点。键盘方向键、WASD，或者直接点下面的按钮都可以。
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/45">
            <span className="rounded-full border border-white/10 px-3 py-2">Arrow keys</span>
            <span className="rounded-full border border-white/10 px-3 py-2">WASD</span>
            <span className="rounded-full border border-white/10 px-3 py-2">Restart with R</span>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3">
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/30">Score</p>
              <p className="mt-2 text-3xl font-semibold">{formatScore(score)}</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/30">Best</p>
              <p className="mt-2 text-3xl font-semibold">{formatScore(bestScore)}</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/30">Goal</p>
              <p className="mt-2 text-3xl font-semibold">2048</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => applyMove("left")}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition-colors hover:border-white/20 hover:text-white"
            >
              ← Left
            </button>
            <button
              type="button"
              onClick={() => applyMove("up")}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition-colors hover:border-white/20 hover:text-white"
            >
              ↑ Up
            </button>
            <button
              type="button"
              onClick={() => applyMove("down")}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition-colors hover:border-white/20 hover:text-white"
            >
              ↓ Down
            </button>
            <button
              type="button"
              onClick={() => applyMove("right")}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition-colors hover:border-white/20 hover:text-white"
            >
              → Right
            </button>
            <button
              type="button"
              onClick={resetGame}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              Restart
            </button>
          </div>

          <p className="mt-6 text-sm text-white/35">
            提示：2048 到了以后可以继续玩，尽量把大数字堆到一个角落。
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[36px] bg-[radial-gradient(circle,rgba(255,165,0,0.12),transparent_60%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/40 md:p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/30">Board</p>
                <h2 className="mt-2 text-lg font-semibold">Keep the grid breathing</h2>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.22em] text-white/30">
                {won ? <span className="rounded-full border border-white/10 px-3 py-2 text-white/80">2048 reached</span> : null}
                {gameOver ? <span className="rounded-full border border-white/10 px-3 py-2 text-white/80">No moves left</span> : null}
              </div>
            </div>

            <div className="rounded-[28px] bg-[#171411] p-3 md:p-4">
              <div className="grid grid-cols-4 gap-3 rounded-[22px] bg-[#2a2420] p-3 md:p-4">
                {board.map((value, index) => (
                  <div
                    key={`${index}-${value}`}
                    className={`flex aspect-square items-center justify-center rounded-[18px] text-3xl font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 md:text-4xl ${tileClass(value)}`}
                  >
                    {value === 0 ? "" : value}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/30">
              <span>Tip</span>
              <span>Combine equal tiles</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
