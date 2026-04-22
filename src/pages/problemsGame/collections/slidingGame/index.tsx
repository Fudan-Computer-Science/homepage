import React, { useRef, useState, useEffect } from "react";

type Move = {
  dir: string;
  dist: number;
};

const dirs = [
  { dx: -1, dy: 0, name: "U" },
  { dx: 1, dy: 0, name: "D" },
  { dx: 0, dy: -1, name: "L" },
  { dx: 0, dy: 1, name: "R" },
];

export default function IceFillVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mapInput, setMapInput] = useState(`5 5
#####
#A..#
#.#.#
#...#
#####`);

  const [opInput, setOpInput] = useState(`R 2
D 2
L 2
U 1`);

  const [board, setBoard] = useState<string[][]>([]);

  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const [painted, setPainted] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepList, setStepList] = useState<Move[]>([]);
  const [stepValue, setStepValue] = useState(0);
  const [isCrashed, setIsCrashed] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopRef = useRef(false);
  const lastMovesRef = useRef<Move[] | null>(null);

  const cellSize = 40;

  /* ======================== 解析地圖 ======================== */

  function parseMapInput() {
    const lines = mapInput.trim().split("\n");
    const [n, m] = lines[0].split(" ").map(Number);
    const grid = lines.slice(1).map((l) => l.split(""));

    let sx = 0, sy = 0;
    const p = new Set<string>();

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (grid[i][j] === "A") {
          sx = i;
          sy = j;
          p.add(`${i},${j}`);
        }
      }
    }

    return { grid, player: { x: sx, y: sy }, painted: p };
  }

  function loadMap() {
    const { grid, player: startPlayer, painted: startPainted } = parseMapInput();
    setBoard(grid);
    setPlayer(startPlayer);
    setPainted(startPainted);
    setStepValue(0);
    setIsCrashed(false);
  }

  /* ======================== Solver (not for user) ======================== */


  /* ======================== 畫圖 ======================== */

  function draw() {
    if (!canvasRef.current || !board.length) return;
    const ctx = canvasRef.current.getContext("2d")!;
    const n = board.length;
    const m = board[0].length;

    canvasRef.current.width = m * cellSize;
    canvasRef.current.height = n * cellSize;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (board[i][j] === "#")
          ctx.fillStyle = "#333";
        else if (painted.has(`${i},${j}`))
          ctx.fillStyle = "#ffb347";
        else
          ctx.fillStyle = "#eee";

        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }

    if (isCrashed) {
      const x0 = player.y * cellSize + cellSize * 0.2;
      const y0 = player.x * cellSize + cellSize * 0.2;
      const x1 = player.y * cellSize + cellSize * 0.8;
      const y1 = player.x * cellSize + cellSize * 0.8;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.moveTo(x1, y0);
      ctx.lineTo(x0, y1);
      ctx.stroke();
    } else {
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(
        player.y * cellSize + cellSize / 2,
        player.x * cellSize + cellSize / 2,
        cellSize / 3,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }

  useEffect(draw, [board, player, painted, isCrashed]);

  /* ======================== 播放邏輯 ======================== */

  function clearIntervalSafe() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function stopPlayback() {
    stopRef.current = true;
    clearIntervalSafe();
    setIsPlaying(false);
  }

  function runMoves(moveList: Move[], startPlayer?: { x: number; y: number }, startPainted?: Set<string>) {
    stopPlayback();
    stopRef.current = false;
    setIsPlaying(true);
    lastMovesRef.current = moveList;
    setIsCrashed(false);

    let stepIndex = 0;
    let { x, y } = startPlayer ?? player;
    const newPaint = new Set(startPainted ?? painted);
    const grid = board.length ? board : parseMapInput().grid;

    function nextStep() {
      if (stepIndex >= moveList.length) {
        setIsPlaying(false);
        return;
      }

      const { dir, dist } = moveList[stepIndex];
      const d = dirs.find(d => d.name === dir)!;

      let moved = 0;

      intervalRef.current = setInterval(() => {
        if (stopRef.current) {
          clearIntervalSafe();
          return;
        }

        if (moved === dist) {
          clearIntervalSafe();
          stepIndex++;
          nextStep();
          return;
        }

        const nx = x + d.dx;
        const ny = y + d.dy;
        const outOfBounds = nx < 0 || ny < 0 || nx >= grid.length || ny >= grid[0].length;
        if (outOfBounds || grid[nx][ny] === "#") {
          setIsCrashed(true);
          stopPlayback();
          return;
        }

        x = nx;
        y = ny;
        newPaint.add(`${x},${y}`);
        setPlayer({ x, y });
        setPainted(new Set(newPaint));

        moved++;
      }, 150);
    }

    nextStep();
  }

  function buildStepListFromInput() {
    const lines = opInput.trim().split("\n").filter((l) => l.trim().length > 0);
    const list: Move[] = [];

    for (const line of lines) {
      const [d, s] = line.trim().split(/\s+/);
      const dist = Number(s);
      if (!d || !Number.isFinite(dist) || dist <= 0) continue;
      list.push({ dir: d, dist });
    }

    return list;
  }

  function applyStepCount(count: number, listOverride?: Move[]) {
    stopPlayback();
    const list = listOverride ?? stepList;
    const { grid, player: startPlayer, painted: startPainted } = parseMapInput();
    let { x, y } = startPlayer;
    const newPaint = new Set(startPainted);
    let crashed = false;
    let appliedCount = 0;

    for (let i = 0; i < Math.min(count, list.length); i++) {
      const move = list[i];
      const d = dirs.find((dir) => dir.name === move.dir);
      appliedCount = i + 1;
      if (!d) continue;
      for (let step = 0; step < move.dist; step++) {
        const nx = x + d.dx;
        const ny = y + d.dy;
        const outOfBounds = nx < 0 || ny < 0 || nx >= grid.length || ny >= grid[0].length;
        if (outOfBounds || grid[nx][ny] === "#") {
          crashed = true;
          break;
        }
        x = nx;
        y = ny;
        newPaint.add(`${x},${y}`);
      }
      if (crashed) break;
    }

    setBoard(grid);
    setPlayer({ x, y });
    setPainted(newPaint);
    setIsCrashed(crashed);
    if (crashed && count !== appliedCount) setStepValue(appliedCount);
  }

  /* ======================== 手動操作解析 ======================== */

  function replay() {
    const moveList = lastMovesRef.current ?? opInput.trim().split("\n").map(l => {
      const [d, s] = l.split(" ");
      return { dir: d, dist: Number(s) };
    });

    const { grid, player: startPlayer, painted: startPainted } = parseMapInput();
    setBoard(grid);
    setPlayer(startPlayer);
    setPainted(startPainted);
    setIsCrashed(false);
    runMoves(moveList, startPlayer, startPainted);
  }

  function reset() {
    loadMap();
  }

  /* ======================== UI ======================== */

  useEffect(() => {
    loadMap();
    return () => stopPlayback();
  }, []);

  useEffect(() => {
    const list = buildStepListFromInput();
    setStepList(list);
    setStepValue(0);
    setIsCrashed(false);
    applyStepCount(0, list);
  }, [opInput, mapInput]);

  return (
    <div>
      <h2>Ice Fill Puzzle Visualizer</h2>

      <h3>測資輸入</h3>
      <textarea
        rows={8}
        cols={40}
        value={mapInput}
        onChange={(e) => setMapInput(e.target.value)}
      />
      <br />
      <button onClick={loadMap} disabled={isPlaying}>Load Map</button>
      <button onClick={reset} disabled={isPlaying}>Reset</button>

      <h3>手動操作輸入</h3>
      <textarea
        rows={6}
        cols={40}
        value={opInput}
        onChange={(e) => setOpInput(e.target.value)}
      />
      <br />
      <div style={{ marginTop: 8 }}>
        <input
          type="range"
          min={0}
          max={stepList.length}
          value={stepValue}
          onChange={(e) => {
            const next = Number(e.target.value);
            setStepValue(next);
            applyStepCount(next);
          }}
          disabled={isPlaying}
          style={{ width: 240 }}
        />
        <span style={{ marginLeft: 8 }}>{stepValue}/{stepList.length}</span>
      </div>
      <label style={{ display: "inline-flex", alignItems: "center", gap: 8, marginLeft: 8 }}>
        <input
          type="checkbox"
          checked={isPlaying}
          onChange={(e) => {
            if (e.target.checked) {
              replay();
            } else {
              stopPlayback();
            }
          }}
        />
        Auto Play
      </label>

      <canvas ref={canvasRef} style={{ marginTop: 20 }} />
    </div>
  );
}
