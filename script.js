let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let aiMode = false;

const winConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function renderBoard() {
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';
  board.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.textContent = cell;
    cellDiv.onclick = () => handleClick(index);
    boardDiv.appendChild(cellDiv);
  });
}

function handleClick(index) {
  if (!gameActive || board[index]) return;
  board[index] = currentPlayer;
  renderBoard();
  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;

    if (aiMode && currentPlayer === 'O') {
      aiMove();
    }
  }
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.getElementById('status').textContent = `${board[a]} wins! 🎉`;
      gameActive = false;
      return;
    }
  }
  if (!board.includes('')) {
    document.getElementById('status').textContent = 'It\'s a draw!';
    gameActive = false;
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  document.getElementById('status').textContent = "Player X's turn";
  renderBoard();
}

function toggleMode() {
  aiMode = !aiMode;
  resetGame();
  document.getElementById('status').textContent = aiMode ? "AI Mode: Player X vs AI O" : "Two Player Mode";
}

function aiMove() {
  let emptyIndices = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  board[randomIndex] = 'O';
  renderBoard();
  checkWinner();
  if (gameActive) {
    currentPlayer = 'X';
    document.getElementById('status').textContent = "Player X's turn";
  }
}

renderBoard();
