let playerCards = document.querySelectorAll(".card");

const next = document.querySelector('.next');
const prev = document.querySelector('.previous')
const track = document.querySelector('.track');
const cards = document.querySelectorAll('.card');
const carouselWidth = document.querySelector('.carousel-container').offsetWidth;

let count = 0;
let board = [];
let position = 0;

playerCards.forEach(card => card.addEventListener('click', addToBoard));

async function saveBoard() {
    try{
        const sendBoard = await fetch('../ranked/saveBoard', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'board': board
            }),
        });
    }
    catch (error) {
        console.error("Error:", error);
    }
}

function swapPlayer(e) {
    if (document.getElementsByClassName("selected").length == 0) {
        let player = e.target.closest(".player");
        if (!player) return;
        player.classList.add("selected");
    }
    else {
        let player = document.getElementsByClassName("selected");
        console.log(player[0]);
        let player2 = e.target.closest(".player");
        if (!player2) return;
        if (player2.classList.contains("selected")) {
            player2.classList.remove("selected");
        }
        else {
            let index1 = player[0].classList[1];
            let index2 = player2.classList[1];
            [board[index1], board[index2]] = [board[index2], board[index1]]
            player[0].classList.remove("selected");
            renderBoard();
            saveBoard();
        }
    }
}

function removePlayerFromBoard(e) {
    let player = e.target.closest(".player");
    if (!player) return;
    let index = player.classList[1];
    board.splice(index, 1);
    renderBoard();
    saveBoard();
}

async function renderBoard() {
    const boardArea = document.querySelector(".board-container");
    boardArea.innerHTML = "";
    board.forEach((player,index) => {
        let fName = player.firstName;
        let lName = player.lastName;
        let position = player.position;

        if (fName !== "Amen" && fName !== "Ausar") {
            fName = `${fName[0]}.`
        }

        const playerInfo = document.createElement("div");
        let spot = document.createElement("span");
        spot.classList.add("spot");
        spot.innerText = index + 1;
    
        const playerName = document.createElement("span");
        playerName.classList.add("playerName");
        playerName.innerText = `${fName} ${lName}`;
    
        const pos = document.createElement("span");
        pos.classList.add("position");
        pos.innerText = position;
    
        const remove = document.createElement("button");
        remove.classList.add("delete-btn")
        remove.innerText = "X";
        remove.addEventListener("click", removePlayerFromBoard);
    
        playerInfo.classList.add('player')
        playerInfo.classList.add(`${index}`)
        playerInfo.appendChild(spot);
        playerInfo.appendChild(playerName);
        playerInfo.appendChild(pos);
        playerInfo.appendChild(remove);
        boardArea.appendChild(playerInfo);

        playerInfo.addEventListener("click", swapPlayer)
    })
    count = board.length;
}

async function addToBoard(e) {
    console.log('add to board called')
    if (board.length < 30) {
        let card = e.target.closest(".card");
        if (!card) return;
        let index = card.dataset.id;
        try{
            const response = await fetch('../ranked/addToBoard', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'index': index
                }),
            });
            const player = await response.json();
            board.push(player);
            renderBoard();
        }
        catch (error) {
            console.error("Error:", error);
        }
    }
    saveBoard();
}

async function getUserBoard() {
    console.log('get user board')
    try {
        let res = await fetch('../ranked/getUserBoard')
        const usersBoard = await res.json();
        board = usersBoard;
    }
    catch(err) {
        console.log(err)
    }
    renderBoard();
}

next.addEventListener('click', () => {
    if (position != Math.floor(cards.length / 5) * -1000 + 1000){
        track.style.transform = `translateX(${position - 1000}px)`;
        position = position - 1000;
    }
});
    
prev.addEventListener('click', () => {
    if (position !== 0) {
        track.style.transform = `translateX(${position + 1000}px)`;
        position = position + 1000;
    }
});