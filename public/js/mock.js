let playerCards = document.querySelectorAll(".card");

const track = document.querySelector('.track');
const cards = document.querySelectorAll('.card');
const simLotteryButton = document.querySelector('.simLottery');

let carouselWidth = document.querySelector('.carousel-container').offsetWidth;

let board = [];
let count = board.length;
let position = 0;
let draftOrder = [
"Detroit Pistons", 
"San Antonio Spurs", 
"Houston Rockets", 
"Charlotte Hornets", 
"Portland Trail Blazers", 
"Orlando Magic", 
"Washington Wizards", 
"Indiana Pacers", 
"Utah Jazz",
"Dallas Mavericks", 
"Oklahoma City Thunder", 
"Chicago Bulls", 
"Toronto Raptors", 
"New Orleans Pelicans", 
"Atlanta Hawks",
"Minnesota Timberwolves",
"Los Angeles Lakers",
"Golden State Warriors",
"LA Clippers",
"Miami Heat",
"Brooklyn Nets",
"Phoenix Suns",
"New York Knicks",
"Sacramento Kings",
"Cleveland Cavaliers",
"Memphis Grizzlies",
"Denver Nuggets",
"Philadelphia 76ers",
"Boston Celtics",
"Milwaukee Bucks" 
];

playerCards.forEach(card => card.addEventListener('click', addToBoard));
simLotteryButton.addEventListener('click', getDraftOrder);

let boardType = window.location.pathname.includes('ranked') ? 'ranked' : 'mock'

async function getDraftOrder() {
    try {
        let res = await fetch("../mock/getDraftOrder")
        const order = await res.json();
        draftOrder = order;
    }
    catch(err) {
        console.log(err)
    }
    board = [];
    count = 0;
    saveBoard();
    renderMockBoard();
}

async function saveBoard() {
    try{
        const sendBoard = await fetch(`../${boardType}/saveBoard`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'board': board,
                'draftOrder': draftOrder,
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
        if (!player.dataset.player) return;
        player.classList.add("selected");
        
    }
    else {
        let player = document.getElementsByClassName("selected");
        
        let player2 = e.target.closest(".player");
        if (!player2) return;
        if (player2.classList.contains("selected")) {
            player2.classList.remove("selected");
        }
        else {
            let index1 = Number(player[0].classList[0]);
            let index2 = Number(player2.classList[0]);

            let team1 = board[index1].team;
            let team2 = board[index2].team;
            
            [board[index1], board[index2]] = [board[index2], board[index1]]
            board[index1].team = team1;
            board[index2].team = team2;
            player[0].classList.remove("selected");
            renderBoard();
            saveBoard();
        }
    }
}

function removePlayerFromBoard(e) {
    let player = e.target.closest(".player");
    if (!player) return;
    let index = player.classList[0];

    console.log(player);
    console.log(index);

    board[index] = null;
    renderBoard();
    saveBoard();
}


function renderMockBoard() {
    const boardArea = document.querySelector(".board-container");
    boardArea.innerHTML = "";
    draftOrder.forEach((team, index) => {
        const playerInfo = document.createElement("div");

        let spot = document.createElement("span");
        spot.classList.add("spot");
        spot.innerText = index + 1;

        const imgCtr = document.createElement("section");
        const teamLogo = document.createElement("img");
        teamLogo.src = `../img/team-logos/${team}.png`;
        
        imgCtr.classList.add('imgCtr')
        teamLogo.classList.add('teamLogo')
        playerInfo.classList.add(`${index}`)
        playerInfo.classList.add('player')
        playerInfo.dataset.team = team;

        imgCtr.appendChild(teamLogo);
        playerInfo.appendChild(spot)
        playerInfo.appendChild(imgCtr);
        boardArea.appendChild(playerInfo);
    })
}

async function renderBoard() {
    renderMockBoard();
    const boardArea = document.querySelector(".board-container");

    board.forEach((player,index) => {
        if (player === null) {
            return
        }
        let fName = player.firstName;
        let lName = player.lastName;

        if (fName !== "Amen" && fName !== "Ausar") {
            fName = `${fName[0]}.`
        }

        const playerInfo = document.querySelector(`.${CSS.escape(index)}`);
        const playerName = document.createElement("span");
        playerName.classList.add("playerName");
        playerName.innerText = `${fName} ${lName}`;
    
        const remove = document.createElement("button");
        remove.classList.add("delete-btn")
        remove.innerText = "X";
        remove.addEventListener("click", removePlayerFromBoard);
    
        playerInfo.appendChild(playerName);
        playerInfo.dataset.player = `${fName} ${lName}`
        playerInfo.appendChild(remove);
    
        playerInfo.addEventListener("click", swapPlayer)
        count = board.length;
    })
}

async function addToBoard(e) {
    if (board.length < 30 || board.includes(null)) {
        let card = e.target.closest(".card");
        if (!card) return;
        let index = card.dataset.id;
        try{
            const response = await fetch(`../${boardType}/addToBoard`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'index': index
                }),
            });
            const player = await response.json();
            let teams = document.querySelectorAll('.board-container div');
            if (teams.length === 0) {return;}
            if (board.includes(null)) {
                let i = board.indexOf(null);
                let team = teams[i].dataset.team;
                player.team = team;
                board[i] = player;
            }
            else {
                let team = teams[count].dataset.team;
                player.team = team;
                board.push(player);
            }
            renderBoard();
            saveBoard();
        }
        catch (error) {
            console.error("Error:", error);
        }
    }
    else {
        return
    }
}

async function getUserBoard() {
    console.log('get user board')
    try {
        let res = await fetch(`../${boardType}/getUserBoard`)
        const usersBoard = await res.json();
        board = usersBoard.userBoard;
        draftOrder = usersBoard.draftOrder;
        console.log(usersBoard.userBoard);
        console.log(usersBoard.draftOrder);
    }
    catch(err) {
        console.log(err)
    }
    renderBoard();
}


let elem = document.querySelector('.carousel-container');
var flkty = new Flickity( elem, {
  groupCells: true,
  contain: true,
  wrapAround: true,
  lazyLoad: true,
  pageDots: false,
  cellAlign: 'center',
  percentPosition: false,
  watchCSS: true
});