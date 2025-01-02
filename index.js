let boxes = document.querySelectorAll(".box");
let restBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let val = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const restGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    val = 0;
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0) {
            box.classList.add("o");
            box.innerText = "O";
            turn0 = false;
            val++;
            box.classList.remove("x");
        }
        else{
            box.classList.add("x");
            box.innerText = "X";
            turn0 = true;
            val++;
            box.classList.remove("o");
        }
        box.disabled = true;

        checkWinner();
        console.log(val);
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    msg.innerText = `The game is draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();  
}

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if(posVal1 != "" && posVal2 != "" && posVal3 != "") {
            if(posVal1 == posVal2 && posVal2 == posVal3) {
                showWinner(posVal1);
            }
        }

        if(val === 9) {
            showDraw();
        }
    }
};

newGameBtn.addEventListener("click", restGame);
restBtn.addEventListener("click", restGame);