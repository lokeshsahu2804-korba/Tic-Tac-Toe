const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetBtn = document.querySelector(".reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.dataset.index;
        if (board[index] !== "" || !running) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        checkWinner();
    });
});

function checkWinner() {
    let won = false;

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            won = true;
            break;
        }
    }

    if (won) {
        statusText.textContent = `Player ${currentPlayer} Wins 🎉`;
        running = false;
    } 
    else if (!board.includes("")) {
        statusText.textContent = "It's a Draw 🤝";
        running = false;
    } 
    else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

resetBtn.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    running = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });
});
