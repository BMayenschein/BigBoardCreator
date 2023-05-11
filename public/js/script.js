let players = document.querySelector('.menu-container')
console.log(players);


players.addEventListener('click', addToBoard);
let boardArea = document.querySelector('.board-container')

let count = 0;

function addToBoard(e) {
    if (count < 30) {
        let fName = e.target.parentElement.childNodes[1].outerText
        let lName = e.target.parentElement.childNodes[3].outerText
        let position = e.target.parentElement.childNodes[5].outerText

        if (fName != 'Amen' && fName != 'Ausar') {
            fName = `${fName[0]}.`;
        }
        
        const playerInfo = document.createElement('div');

        let spot = document.createElement('span');
        spot.classList.add('spot');
        spot.innerText = count + 1;

        const playerName = document.createElement('span');
        playerName.classList.add('playerName');
        playerName.innerText = `${fName} ${lName}`;

        const pos = document.createElement('span');
        pos.classList.add('position');
        pos.innerText = position;


        playerInfo.classList.add('player')
        playerInfo.appendChild(spot);
        playerInfo.appendChild(playerName);
        playerInfo.appendChild(pos);
        boardArea.appendChild(playerInfo);
        count++;
    }
}