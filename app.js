let boxes = document.querySelectorAll(".box");
let resetbutton = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // player O starts
let moves = 0; // to track total moves

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    moves = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            // Only allow a move if the box is empty
            if (turnO) {
                box.innerText = "O"; // Player O's turn
            } else {
                box.innerText = "X"; // Player X's turn
            }
            box.disabled = true; // Disable the box after it is clicked
            turnO = !turnO; // Switch turns
            moves++; // Increment move counter

            checkWinner();
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = ""; // Clear the box
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winpatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            winnerFound = true;
            showWinner(pos1Val); // Display the winner
            break;
        }
    }

    // Check for a draw if no winner found and all boxes are filled
    if (!winnerFound && moves === 9) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetbutton.addEventListener("click", resetGame);
