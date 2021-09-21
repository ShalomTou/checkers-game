/*----------- Game State Data ----------*/

const board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]

let winnerPiecesCounterRed = 0;
let winnerPiecesCounterBlack = 0;



// DOM referenes
const cells = [...document.querySelectorAll("td")];
let redsPieces = [...document.querySelectorAll("p")];
let blacksPieces = [...document.querySelectorAll("span")];
const redTurnText = document.querySelectorAll(".red-turn-text");
const blackTurntext = document.querySelectorAll(".black-turn-text");
const divider = document.querySelector("#divider")

// player properties
let player = {
    turn: true,
    redScore: 12,
    blackScore: 12,
    playerPieces: null,
    redPiecesWin: 0,
    blackPiecesWin: 0
}


// selected piece properties initialized with defined null or false values
let selectedPiece = {
    pieceId: -1,
    indexOfPieceInBoard: -1,
    inWin: false,
}

// Add events Listener
function givePiecesEventListeners() {
    if (player.turn) {
        redsPieces.forEach(p => p.addEventListener('click', getPlayerPieces));
    }
    blacksPieces.forEach(p => p.addEventListener('click', getPlayerPieces))
}

// Logic


function blob() {
    let winnerCounter = 0;
    redsPieces.forEach(p => {
        if (p.classList.contains(`king`))
            winnerCounter++
    });
    if (winnerCounter > 1) {
        divider.style.display = "none";
        for (let i = 0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = "black";
            blackTurntext[i].style.display = "none";
            redTurnText[i].textContent = "RED WINS!";
        }
        return alert(`red wins`)
    }
    blacksPieces.forEach(p => {
        if (p.classList.contains(`king`))
            winnerCounter++
    });
    if (winnerCounter > 1) {
        divider.style.display = "none";
        for (let i = 0; i < blackTurntext.length; i++) {
            blackTurntext[i].style.color = "black";
            redTurnText[i].style.display = "none";
            blackTurntext[i].textContent = "BLACK WINS!";
        }
        return alert(`black wins`)
    }
}

function checkForWinner() {
    blob()
    if (player.redPiecesWin > 1 || player.blackScore === 0) {
        divider.style.display = "none";
        for (let i = 0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = "black";
            blackTurntext[i].style.display = "none";
            redTurnText[i].textContent = "RED WINS!";
        }
    } else if (player.redPiecesWin > 1 || player.redScore === 0) {
        divider.style.display = "none";
        for (let i = 0; i < blackTurntext.length; i++) {
            blackTurntext[i].style.color = "black";
            redTurnText[i].style.display = "none";
            blackTurntext[i].textContent = "BLACK WINS!";
        }
    }
    changePlayer();
}

// holds the length of the players piece count
function getPlayerPieces() {
    if (player.turn) {
        player.playerPieces = redsPieces;
    }
    player.playerPieces = blacksPieces;
    removeCellonclick();
    resetBorders();
}

// removes possible moves from old selected piece (* this is needed because the user might re-select a piece *)
function removeCellonclick() {
    cells.forEach(c => c.removeAttribute("onclick"));
}

// resets borders to default
function resetBorders() {
    player.playerPieces.forEach(p => p.style.border = '1px solid #f1f1f1')
    resetSelectedPieceProperties();
    getSelectedPiece();
}

// resets selected piece properties
function resetSelectedPieceProperties() {
    selectedPiece.pieceId = -1;
    selectedPiece.pieceId = -1;
    selectedPiece.inWin = false;
}

// gets ID and index of the board cell its on
function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfPieceInBoard = board.indexOf(+selectedPiece.pieceId); // return the id of the piece in the table
    isPieceWin();
}

// checks if selected piece is a king
function isPieceWin() {
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
        selectedPiece.inWin = true;
    } else {
        selectedPiece.inWin = false;
    }
    getAvailableSpaces();
}

// gets the moves that the selected piece can make
function getAvailableSpaces() {
    if (board[selectedPiece.indexOfPieceInBoard + 7] === null &&
        cells[selectedPiece.indexOfPieceInBoard + 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.seventhSpace = true;
    }
    if (board[selectedPiece.indexOfPieceInBoard + 9] === null &&
        cells[selectedPiece.indexOfPieceInBoard + 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.ninthSpace = true;
    }
    if (board[selectedPiece.indexOfPieceInBoard - 7] === null &&
        cells[selectedPiece.indexOfPieceInBoard - 7].classList.contains("noPieceHere") !== true) {
        selectedPiece.minusSeventhSpace = true;
    }
    if (board[selectedPiece.indexOfPieceInBoard - 9] === null &&
        cells[selectedPiece.indexOfPieceInBoard - 9].classList.contains("noPieceHere") !== true) {
        selectedPiece.minusNinthSpace = true;
    }
    checkAvailableJumpSpaces();
}

// gets the moves that the selected piece can jump
function checkAvailableJumpSpaces() {
    if (player.turn) {
        if (board[selectedPiece.indexOfPieceInBoard + 14] === null &&
            cells[selectedPiece.indexOfPieceInBoard + 14].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfPieceInBoard + 7] >= 12) {
            selectedPiece.fourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfPieceInBoard + 18] === null &&
            cells[selectedPiece.indexOfPieceInBoard + 18].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfPieceInBoard + 9] >= 12) {
            selectedPiece.eighteenthSpace = true;
        }
        if (board[selectedPiece.indexOfPieceInBoard - 14] === null &&
            cells[selectedPiece.indexOfPieceInBoard - 14].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfPieceInBoard - 7] >= 12) {
            selectedPiece.minusFourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfPieceInBoard - 18] === null &&
            cells[selectedPiece.indexOfPieceInBoard - 18].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfPieceInBoard - 9] >= 12) {
            selectedPiece.minusEighteenthSpace = true;
        }
    } else {
        if (board[selectedPiece.indexOfPieceInBoard + 14] === null &&
            cells[selectedPiece.indexOfPieceInBoard + 14].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfPieceInBoard + 7] < 12 && board[selectedPiece.indexOfPieceInBoard + 7] !== null) {
            selectedPiece.fourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfPieceInBoard + 18] === null &&
            cells[selectedPiece.indexOfPieceInBoard + 18].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfPieceInBoard + 9] < 12 && board[selectedPiece.indexOfPieceInBoard + 9] !== null) {
            selectedPiece.eighteenthSpace = true;
        }
        if (board[selectedPiece.indexOfPieceInBoard - 14] === null && cells[selectedPiece.indexOfPieceInBoard - 14].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfPieceInBoard - 7] < 12 &&
            board[selectedPiece.indexOfPieceInBoard - 7] !== null) {
            selectedPiece.minusFourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfPieceInBoard - 18] === null && cells[selectedPiece.indexOfPieceInBoard - 18].classList.contains("noPieceHere") !== true &&
            board[selectedPiece.indexOfPieceInBoard - 9] < 12 &&
            board[selectedPiece.indexOfPieceInBoard - 9] !== null) {
            selectedPiece.minusEighteenthSpace = true;
        }
    }
    checkPieceConditions();
}

// restricts movement if the piece is a king
function checkPieceConditions() {
    if (selectedPiece.inWin) {
        givePieceBorder();
    } else {
        if (player.turn) {
            selectedPiece.minusSeventhSpace = false;
            selectedPiece.minusNinthSpace = false;
            selectedPiece.minusFourteenthSpace = false;
            selectedPiece.minusEighteenthSpace = false;
        } else {
            selectedPiece.seventhSpace = false;
            selectedPiece.ninthSpace = false;
            selectedPiece.fourteenthSpace = false;
            selectedPiece.eighteenthSpace = false;
        }
        givePieceBorder();
    }
}

// gives the piece a green highlight for the user (showing its movable)
function givePieceBorder() {
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace ||
        selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
        document.getElementById(selectedPiece.pieceId).style.border = "3px solid #f1f1f1";
        giveCellsClick();
    } else {
        return;
    }
}

// gives the cells on the board a 'click' bassed on the possible moves
function giveCellsClick() {
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexOfPieceInBoard + 7].setAttribute("onclick", "makeMove(7)");
    }
    if (selectedPiece.ninthSpace) {
        cells[selectedPiece.indexOfPieceInBoard + 9].setAttribute("onclick", "makeMove(9)");
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.indexOfPieceInBoard + 14].setAttribute("onclick", "makeMove(14)");
    }
    if (selectedPiece.eighteenthSpace) {
        cells[selectedPiece.indexOfPieceInBoard + 18].setAttribute("onclick", "makeMove(18)");
    }
    if (selectedPiece.minusSeventhSpace) {
        cells[selectedPiece.indexOfPieceInBoard - 7].setAttribute("onclick", "makeMove(-7)");
    }
    if (selectedPiece.minusNinthSpace) {
        cells[selectedPiece.indexOfPieceInBoard - 9].setAttribute("onclick", "makeMove(-9)");
    }
    if (selectedPiece.minusFourteenthSpace) {
        cells[selectedPiece.indexOfPieceInBoard - 14].setAttribute("onclick", "makeMove(-14)");
    }
    if (selectedPiece.minusEighteenthSpace) {
        cells[selectedPiece.indexOfPieceInBoard - 18].setAttribute("onclick", "makeMove(-18)");
    }
}

/* v when the cell is clicked v */

// makes the move that was clicked
function makeMove(number) {
    document.getElementById(selectedPiece.pieceId).remove();
    cells[selectedPiece.indexOfPieceInBoard].innerHTML = "";
    if (player.turn) {
        if (selectedPiece.inWin) {
            cells[selectedPiece.indexOfPieceInBoard + number].innerHTML = `<p class="red-piece piece king" id="${selectedPiece.pieceId}"></p>`;
            redsPieces = document.querySelectorAll("p");
        } else {
            cells[selectedPiece.indexOfPieceInBoard + number].innerHTML = `<p class="red-piece piece" id="${selectedPiece.pieceId}"></p>`;
            redsPieces = document.querySelectorAll("p");
        }
    } else {
        if (selectedPiece.inWin) {
            cells[selectedPiece.indexOfPieceInBoard + number].innerHTML = `<span class="black-piece piece king" id="${selectedPiece.pieceId}"></span>`;
            blacksPieces = document.querySelectorAll("span");
        } else {
            cells[selectedPiece.indexOfPieceInBoard + number].innerHTML = `<span class="black-piece piece" id="${selectedPiece.pieceId}"></span>`;
            blacksPieces = document.querySelectorAll("span");
        }
    }

    let indexOfPiece = selectedPiece.indexOfPieceInBoard
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}

// Changes the board states data on the back end
function changeData(indexOfPieceInBoard, modifiedIndex, removePiece) {
    board[indexOfPieceInBoard] = null;
    board[modifiedIndex] = parseInt(selectedPiece.pieceId);
    if (player.turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    if (player.turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }
    if (removePiece) {
        board[removePiece] = null;
        if (player.turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = "";
            player.blackScore--
        }
        if (player.turn === false && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = "";
            player.redScore--
        }
    }
    resetSelectedPieceProperties();
    removeCellonclick();
    removeEventListeners();
}

// removes the 'onClick' event listeners for pieces
function removeEventListeners() {
    if (player.turn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].removeEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].removeEventListener("click", getPlayerPieces);
        }
    }
    checkForWinner();
}

// Checks for a win
function checkForWin() {
    if (player.blackScore === 0) {
        divider.style.display = "none";
        for (let i = 0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = "black";
            blackTurntext[i].style.display = "none";
            redTurnText[i].textContent = "RED WINS!";
        }
    } else if (player.redScore === 0) {
        divider.style.display = "none";
        for (let i = 0; i < blackTurntext.length; i++) {
            blackTurntext[i].style.color = "black";
            redTurnText[i].style.display = "none";
            blackTurntext[i].textContent = "BLACK WINS!";
        }
    }
    changePlayer();
}

// Switches players turn
function changePlayer() {
    if (player.turn) {
        player.turn = false;
        for (let i = 0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = "lightGrey";
            blackTurntext[i].style.color = "black";
        }
    } else {
        player.turn = true;
        for (let i = 0; i < blackTurntext.length; i++) {
            blackTurntext[i].style.color = "lightGrey";
            redTurnText[i].style.color = "black";
        }
    }
    givePiecesEventListeners();
}

givePiecesEventListeners();