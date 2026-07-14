(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  const gameRoot = document.querySelector("[data-snake-game]");
  if (!gameRoot) {
    return;
  }

  const canvas = document.getElementById("snake-canvas");
  const scoreEl = document.getElementById("game-score");
  const bestEl = document.getElementById("game-best");
  const statusEl = document.getElementById("game-status");
  const overlayEl = document.getElementById("game-overlay");
  const startBtn = document.getElementById("game-start");
  const pauseBtn = document.getElementById("game-pause");
  const restartBtn = document.getElementById("game-restart");
  const touchButtons = Array.from(document.querySelectorAll("[data-direction]"));

  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const GRID = 20;
  const STEP_MS = 140;
  const STORAGE_KEY = "snake-best-score";

  const state = {
    mode: "idle",
    score: 0,
    best: readBestScore(),
    snake: [],
    direction: { x: 1, y: 0 },
    queuedDirection: null,
    food: { x: 0, y: 0 },
    accumulator: 0,
    lastFrame: 0,
    boardSize: 0,
    cellSize: 0,
    pointerStart: null,
  };

  let frameHandle = 0;
  let resizeObserver = null;

  function readBestScore() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value ? Number(value) || 0 : 0;
    } catch {
      return 0;
    }
  }

  function writeBestScore(value) {
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      return;
    }
  }

  function setMode(nextMode) {
    state.mode = nextMode;
    const labels = {
      idle: "Ready",
      running: "Running",
      paused: "Paused",
      gameover: "Game over",
    };

    if (statusEl) {
      statusEl.textContent = labels[nextMode] || nextMode;
    }

    if (overlayEl) {
      overlayEl.classList.toggle("is-visible", nextMode !== "running");
      overlayEl.textContent = overlayMessage(nextMode);
    }

    if (pauseBtn) {
      pauseBtn.textContent = nextMode === "paused" ? "Resume" : "Pause";
    }
  }

  function overlayMessage(mode) {
    switch (mode) {
      case "running":
        return "Playing...";
      case "paused":
        return "Paused. Press Pause or Resume.";
      case "gameover":
        return "Game over. Press Restart to try again.";
      default:
        return "Press Start to begin.";
    }
  }

  function syncHud() {
    if (scoreEl) {
      scoreEl.textContent = String(state.score);
    }

    if (bestEl) {
      bestEl.textContent = String(state.best);
    }
  }

  function boardOrigin() {
    return {
      x: Math.floor((state.boardSize - GRID * state.cellSize) / 2),
      y: Math.floor((state.boardSize - GRID * state.cellSize) / 2),
    };
  }

  function resizeCanvas() {
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    const size = Math.max(1, Math.floor(rect.width));
    const dpr = window.devicePixelRatio || 1;

    state.boardSize = size;
    state.cellSize = size / GRID;

    canvas.width = Math.floor(size * dpr);
    canvas.height = Math.floor(size * dpr);
    canvas.style.width = "";
    canvas.style.height = "";
    canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);

    draw();
  }

  function getSnakeSet() {
    return new Set(state.snake.map((segment) => `${segment.x},${segment.y}`));
  }

  function spawnFood() {
    const occupied = getSnakeSet();
    const openCells = [];

    for (let y = 0; y < GRID; y += 1) {
      for (let x = 0; x < GRID; x += 1) {
        const key = `${x},${y}`;
        if (!occupied.has(key)) {
          openCells.push({ x, y });
        }
      }
    }

    if (openCells.length === 0) {
      return null;
    }

    return openCells[Math.floor(Math.random() * openCells.length)];
  }

  function resetGame(startRunning = false, initialDirection = null) {
    state.score = 0;
    state.direction = initialDirection || { x: 1, y: 0 };
    state.queuedDirection = null;
    state.snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    state.food = spawnFood();
    state.accumulator = 0;
    state.lastFrame = 0;
    syncHud();
    setMode(startRunning ? "running" : "idle");
    draw();
  }

  function isOpposite(a, b) {
    return a.x === -b.x && a.y === -b.y;
  }

  function queueDirection(nextDirection) {
    if (!nextDirection) {
      return;
    }

    const current = state.queuedDirection || state.direction;
    if (isOpposite(nextDirection, current)) {
      return;
    }

    state.queuedDirection = nextDirection;

    if (state.mode === "idle") {
      startGame(nextDirection);
    }
  }

  function gameOver() {
    state.best = Math.max(state.best, state.score);
    writeBestScore(state.best);
    syncHud();
    setMode("gameover");
    draw();
  }

  function step() {
    if (state.queuedDirection && !isOpposite(state.queuedDirection, state.direction)) {
      state.direction = state.queuedDirection;
    }
    state.queuedDirection = null;

    const head = state.snake[0];
    const nextHead = {
      x: head.x + state.direction.x,
      y: head.y + state.direction.y,
    };

    if (nextHead.x < 0 || nextHead.y < 0 || nextHead.x >= GRID || nextHead.y >= GRID) {
      gameOver();
      return;
    }

    const snakeSet = getSnakeSet();
    const tail = state.snake[state.snake.length - 1];
    snakeSet.delete(`${tail.x},${tail.y}`);

    if (snakeSet.has(`${nextHead.x},${nextHead.y}`)) {
      gameOver();
      return;
    }

    state.snake.unshift(nextHead);

    if (state.food && nextHead.x === state.food.x && nextHead.y === state.food.y) {
      state.score += 1;
      state.best = Math.max(state.best, state.score);
      writeBestScore(state.best);
      syncHud();
      state.food = spawnFood();

      if (!state.food) {
        gameOver();
        return;
      }
    } else {
      state.snake.pop();
      syncHud();
    }
  }

  function drawCell(x, y, color, radius = 8) {
    const origin = boardOrigin();
    const px = origin.x + x * state.cellSize;
    const py = origin.y + y * state.cellSize;
    const size = state.cellSize;

    ctx.fillStyle = color;
    roundRect(ctx, px + 1, py + 1, size - 2, size - 2, radius);
    ctx.fill();
  }

  function roundRect(context, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + r, y);
    context.lineTo(x + width - r, y);
    context.quadraticCurveTo(x + width, y, x + width, y + r);
    context.lineTo(x + width, y + height - r);
    context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    context.lineTo(x + r, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - r);
    context.lineTo(x, y + r);
    context.quadraticCurveTo(x, y, x + r, y);
    context.closePath();
  }

  function drawGrid() {
    const origin = boardOrigin();
    const size = GRID * state.cellSize;

    ctx.strokeStyle = "rgba(20, 92, 84, 0.08)";
    ctx.lineWidth = 1;

    for (let i = 0; i <= GRID; i += 1) {
      const pos = origin.x + i * state.cellSize + 0.5;
      ctx.beginPath();
      ctx.moveTo(pos, origin.y);
      ctx.lineTo(pos, origin.y + size);
      ctx.stroke();
    }

    for (let i = 0; i <= GRID; i += 1) {
      const pos = origin.y + i * state.cellSize + 0.5;
      ctx.beginPath();
      ctx.moveTo(origin.x, pos);
      ctx.lineTo(origin.x + size, pos);
      ctx.stroke();
    }
  }

  function drawBackground() {
    ctx.clearRect(0, 0, state.boardSize, state.boardSize);
    const width = state.boardSize;
    const height = state.boardSize;
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#f8fffd");
    gradient.addColorStop(1, "#edf7f4");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    drawGrid();
  }

  function draw() {
    drawBackground();

    if (state.food) {
      drawCell(state.food.x, state.food.y, "#d65f3d", 10);
    }

    state.snake.forEach((segment, index) => {
      const color = index === 0 ? "#145c54" : "#1f7a72";
      drawCell(segment.x, segment.y, color, index === 0 ? 10 : 8);
    });
  }

  function update(timestamp) {
    if (state.mode === "running") {
      if (!state.lastFrame) {
        state.lastFrame = timestamp;
      }

      const delta = timestamp - state.lastFrame;
      state.lastFrame = timestamp;
      state.accumulator += delta;

      while (state.accumulator >= STEP_MS && state.mode === "running") {
        step();
        state.accumulator -= STEP_MS;
      }
    } else {
      state.lastFrame = timestamp;
      state.accumulator = 0;
    }

    draw();
    frameHandle = window.requestAnimationFrame(update);
  }

  function startGame(initialDirection = null) {
    if (state.mode === "running") {
      return;
    }

    if (state.mode === "idle" || state.mode === "gameover") {
      resetGame(true, initialDirection);
      return;
    }

    state.lastFrame = 0;
    setMode("running");
  }

  function togglePause() {
    if (state.mode === "running") {
      setMode("paused");
      return;
    }

    if (state.mode === "paused") {
      setMode("running");
      state.lastFrame = 0;
      return;
    }

    startGame();
  }

  function restartGame() {
    resetGame(false);
  }

  function directionFromKey(key) {
    switch (key.toLowerCase()) {
      case "arrowup":
      case "w":
        return { x: 0, y: -1 };
      case "arrowdown":
      case "s":
        return { x: 0, y: 1 };
      case "arrowleft":
      case "a":
        return { x: -1, y: 0 };
      case "arrowright":
      case "d":
        return { x: 1, y: 0 };
      default:
        return null;
    }
  }

  function onKeyDown(event) {
    const direction = directionFromKey(event.key);
    if (direction) {
      event.preventDefault();
      queueDirection(direction);
      return;
    }

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      togglePause();
    }
  }

  function onPointerDown(event) {
    state.pointerStart = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event) {
    if (!state.pointerStart) {
      return;
    }

    const dx = event.clientX - state.pointerStart.x;
    const dy = event.clientY - state.pointerStart.y;
    const distance = Math.hypot(dx, dy);
    state.pointerStart = null;

    if (distance < 24) {
      return;
    }

    if (Math.abs(dx) > Math.abs(dy)) {
      queueDirection(dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
    } else {
      queueDirection(dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
    }
  }

  function bindControls() {
    startBtn?.addEventListener("click", startGame);
    pauseBtn?.addEventListener("click", togglePause);
    restartBtn?.addEventListener("click", restartGame);

    touchButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const dir = button.getAttribute("data-direction");
        if (dir === "up") queueDirection({ x: 0, y: -1 });
        if (dir === "down") queueDirection({ x: 0, y: 1 });
        if (dir === "left") queueDirection({ x: -1, y: 0 });
        if (dir === "right") queueDirection({ x: 1, y: 0 });
      });
    });

    window.addEventListener("keydown", onKeyDown);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", () => {
      state.pointerStart = null;
    });

    window.addEventListener("resize", resizeCanvas);
  }

  function init() {
    syncHud();
    setMode("idle");
    if (typeof ResizeObserver !== "undefined" && canvas.parentElement) {
      resizeObserver = new ResizeObserver(() => resizeCanvas());
      resizeObserver.observe(canvas.parentElement);
    }
    bindControls();
    resizeCanvas();
    resetGame(false);
    window.requestAnimationFrame(update);
  }

  window.__snakeGame = {
    getState: () => ({ ...state, snake: state.snake.map((segment) => ({ ...segment })) }),
    startGame,
    togglePause,
    restartGame,
  };

  init();
})();
