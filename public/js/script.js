let players = document.querySelectorAll('.card')

players.forEach(player => addEventListener('click', addToBoard));
let boardArea = document.querySelector('.board-container')

let count = 0;

function addToBoard(e) {
    if (count < 30) {
        console.log(e.target.closest('.card'))

        let card = e.target.closest('.card');
        if (!card) return;

        let fName = card.childNodes[1].childNodes[3].childNodes[1].childNodes[1].outerText
        let lName = card.childNodes[1].childNodes[3].childNodes[1].childNodes[3].outerText
        let position = card.childNodes[1].childNodes[3].childNodes[3].childNodes[3].outerText

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



const next = document.querySelector('.next');
const prev = document.querySelector('.previous')
const track = document.querySelector('.track');
const cards = document.querySelectorAll('.card');
const carouselWidth = document.querySelector('.carousel-container').offsetWidth;

let position = 0;

next.addEventListener('click', () => {
  if (position != Math.floor(cards.length / 5) * -1000){
  	track.style.transform = `translateX(${position - 1000}px)`;
  	position = position - 1000;
      console.log(position);
  }
  });
  
prev.addEventListener('click', () => {
	if (position !== 0) {
  	track.style.transform = `translateX(${position + 1000}px)`;
  	position = position + 1000;
    console.log(position);
  }
})