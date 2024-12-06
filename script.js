let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const celebration = document.getElementById('celebration');
const winnerMessage = document.getElementById('winnerMessage');
const playAgainButton = document.getElementById('playAgainButton');

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

playAgainButton.addEventListener('click', () => {
    celebration.classList.remove('active');
    resetGame();
});

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || checkWinner()) return;

    board[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        celebrateWin(currentPlayer);
    } else if (board.every(cell => cell !== '')) {
        statusDisplay.textContent = 'It\'s a draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
    });
}

function celebrateWin(winner) {
    winnerMessage.textContent = `🎉 Player ${winner} Wins! 🎉`;
    celebration.classList.add('active');
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}
