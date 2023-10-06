let playerCards = document.querySelectorAll(".card");

const track = document.querySelector('.track');
const cards = document.querySelectorAll('.card');
const simLotteryButton = document.querySelector('.simLottery');
const sortByNameBtn = document.querySelector('.sortByName');
const sortByPositionBtn = document.querySelector('.sortByPos');
const sortByPointsBtn = document.querySelector('.sortByPoints');
const sortByReboundsBtn = document.querySelector('.sortByReb');
const sortByAstBtn = document.querySelector('.sortByAst');

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

sortByNameBtn.addEventListener("click", sortByName);
sortByPositionBtn.addEventListener("click", sortByPosition);
sortByPointsBtn.addEventListener("click", sortByPoints);
sortByReboundsBtn.addEventListener("click", sortByReb);
sortByAstBtn.addEventListener("click", sortByAst);

function removeSelectSortClass() {
    let selected = document.querySelector('.selectSort');
    if (!selected) {return}
    selected.classList.remove('selectSort');
}

async function sortByAst(e) {
    if (e.target.classList.contains('selectSort')) { return }
    let sortedByAsts = [];
    try {
        let res = await fetch(`../ranked/sortByAst`)
        sortedByAsts = await res.json();
    }
    catch(err) {
        console.log(err)
    }

    removeSelectSortClass()
    e.target.classList.add('selectSort');
    document.querySelector('.carousel-container').remove();
    renderCards(sortedByAsts);
}

async function sortByReb(e) {
    if (e.target.classList.contains('selectSort')) { return }
    let sortedByRebs = [];
    try {
        let res = await fetch(`../ranked/sortByRebounds`)
        sortedByRebs = await res.json();
    }
    catch(err) {
        console.log(err)
    }

    removeSelectSortClass()
    e.target.classList.add('selectSort');
    document.querySelector('.carousel-container').remove();
    renderCards(sortedByRebs);
}

async function sortByPoints(e) {
    if (e.target.classList.contains('selectSort')) { return }
    let sortedByPoints = [];
    try {
        let res = await fetch(`../ranked/sortByPoints`)
        sortedByPoints = await res.json();
    }
    catch(err) {
        console.log(err)
    }

    removeSelectSortClass()
    e.target.classList.add('selectSort');
    document.querySelector('.carousel-container').remove();
    renderCards(sortedByPoints);
}


async function sortByPosition(e) {
    if (e.target.classList.contains('selectSort')) { return }
    let sortedByPosition = [];
    try {
        let res = await fetch(`../ranked/sortByPosition`)
        sortedByPosition = await res.json();
    }
    catch(err) {
        console.log(err)
    }

    removeSelectSortClass()
    e.target.classList.add('selectSort');
    document.querySelector('.carousel-container').remove();
    renderCards(sortedByPosition);
}

function renderCards(players) {
    const content = document.querySelector('.content');
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carousel-container');
    
    players.forEach((player, index) => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
    
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = player._id;
        card.addEventListener('click', function(e) {
            addToBoard(e);
        })

        const col1 = document.createElement('div');
        col1.classList.add('col1');

        const pImg = document.createElement('div');
        pImg.classList.add('pImg');

        const img = document.createElement('img');
        img.src = `../img/${player.firstName}${player.lastName}.png`

        const pInfo = document.createElement('div');
        pInfo.classList.add('pInfo');

        const pName = document.createElement('div');
        pName.classList.add('pName');

        const fName = document.createElement('span');
        fName.innerText = player.firstName;
        const lName = document.createElement('span');
        lName.innerText = player.lastName

        const pInfo2 = document.createElement('div');
        pInfo2.classList.add('pInfo2');

        const height = document.createElement('span');
        height.innerText = `${player.height} |`;

        const position = document.createElement('span');
        position.innerText = ` ${player.position}`;


        const col2 = document.createElement('div');
        col2.classList.add('col2');

        const stat1 = document.createElement('div');
        stat1.classList.add('stat');

        const pts = document.createElement('span')
        pts.innerText = player.PTS;
        const pt = document.createElement('span')
        pt.innerText = "PTS";
        
        const stat2 = document.createElement('div');
        stat2.classList.add('stat');

        const reb = document.createElement('span');
        reb.innerText = player.REB;
        const rebs = document.createElement('span');
        rebs.innerText = "REBS";

        const stat3 = document.createElement('div');
        stat3.classList.add('stat');

        const asts = document.createElement('span');
        asts.innerText = player.AST;
        const ast = document.createElement('span');
        ast.innerText = "AST";

        stat3.appendChild(asts)
        stat3.appendChild(ast)

        stat2.appendChild(reb)
        stat2.appendChild(rebs)

        stat1.appendChild(pts)
        stat1.appendChild(pt)

        col2.appendChild(stat1)
        col2.appendChild(stat2)
        col2.appendChild(stat3)

        pInfo2.appendChild(height)
        pInfo2.appendChild(position)

        pName.appendChild(fName)
        pName.appendChild(lName)
        
        pInfo.appendChild(pName)
        pInfo.appendChild(pInfo2)

        pImg.appendChild(img)

        col1.appendChild(pImg)
        col1.appendChild(pInfo)
        
        card.appendChild(col1)
        card.appendChild(col2)

        cardContainer.appendChild(card)
        carouselContainer.appendChild(cardContainer)
    })
    content.prepend(carouselContainer);

    var test = new Flickity( carouselContainer, {
        groupCells: true,
        contain: true,
        wrapAround: true,
        lazyLoad: true,
        pageDots: false,
        cellAlign: 'center',
        percentPosition: false,
        watchCSS: true
      });
}
async function sortByName(e) {
    if (e.target.classList.contains('selectSort')) { return }
    let sortedByName = [];
    try {
        let res = await fetch(`../ranked/sortByName`)
        sortedByName = await res.json();
    }
    catch(err) {
        console.log(err)
    }

    removeSelectSortClass()
    e.target.classList.add('selectSort');
    document.querySelector('.carousel-container').remove();
    renderCards(sortedByName);
}

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
        const sendBoard = await fetch(`../mock/saveBoard`, {
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
        let id = card.dataset.id;
        try{
            const response = await fetch(`../mock/addToBoard`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    'id': id
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
    try {
        let res = await fetch(`../mock/getUserBoard`)
        const usersBoard = await res.json();
        board = usersBoard.userBoard;
        draftOrder = usersBoard.draftOrder;
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