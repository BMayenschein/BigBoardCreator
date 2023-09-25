const draggablePlayers = document.querySelectorAll('.draggablePlayer')
const playerAreas = document.querySelectorAll('.playerArea')
const tierNames = document.querySelectorAll('.tierName')
const tierDescs = document.querySelectorAll('.tierDesc')
const tierInfo = document.querySelectorAll('.tierInfo')
const addTierBtn = document.querySelector('.addTier')
const playersContainer = document.querySelector('.playersContainer')
const removeTierBtn = document.querySelector('.removeTier')
const changeColorBtn = document.querySelector('.tierColor')

removeTierBtn.addEventListener('click', removeTier)

function removeTier(e) {
    const parent = e.target.parentElement
    const gParent = parent.parentElement
    const pArea = gParent.children[1]
    let players = [...pArea.children]
    players.forEach(player => playersContainer.appendChild(player))
    gParent.remove()
}

changeColorBtn.addEventListener('click', changeColor)

function changeColor(e) {
    let colors = ['rgb(255, 215, 0)', 'rgb(255, 255, 1)', 'rgb(255, 127, 0)', 'rgb(254, 0, 0)', 'rgb(255, 1, 126)', 'rgb(255, 0, 254)', 'rgb(127, 0, 255)', 'rgb(0, 0, 254)', 'rgb(0, 63, 255)',
'rgb(1, 255, 255)', 'rgb(0, 254, 129)', 'rgb(0, 255, 1)']
    const parent = e.target.parentElement
    let currentColor = parent.style.backgroundColor
    let currentIndex = colors.indexOf(currentColor)
    if (currentIndex == 11) {
        currentIndex = 0
    }
    parent.style.backgroundColor = colors[currentIndex + 1]
}

addTierBtn.addEventListener('click', addTier)

function addTier() {
    let colors = ['rgb(255, 215, 0)','rgb(255, 255, 1)', 'rgb(255, 127, 0)', 'rgb(254, 0, 0)', 'rgb(255, 1, 126)', 'rgb(255, 0, 254)', 'rgb(127, 0, 255)', 'rgb(0, 0, 254)', 'rgb(0, 63, 255)',
'rgb(1, 255, 255)', 'rgb(0, 254, 129)', 'rgb(0, 255, 1)']
    const tierContainer = document.querySelector('.tierContainer');

    const tier = document.createElement('div')
    tier.classList.add('tier')

    const info = document.createElement('div')
    info.classList.add('tierInfo')
    info.setAttribute('ondragenter', "event.preventDefault(); event.dataTransfer.dropEffect = 'none'")
    info.setAttribute('ondragover', "event.preventDefault(); event.dataTransfer.dropEffect = 'none'")
    let color = colors[Math.floor(Math.random()*colors.length)];
    info.style.backgroundColor = color;

    const tierSettings = document.createElement('i')
    tierSettings.classList.add('fa-regular')
    tierSettings.classList.add('fa-circle')
    tierSettings.classList.add('tierColor')
    tierSettings.setAttribute('title', 'Change Color')

    const tierDesc = document.createElement('span')
    tierDesc.classList.add('tierDesc')
    tierDesc.innerText = 'Tier Description'
    tierDesc.contentEditable = 'true'
    tierDesc.setAttribute('ondragenter', "event.preventDefault(); event.dataTransfer.dropEffect = 'none'")
    tierDesc.setAttribute('ondragover', "event.preventDefault(); event.dataTransfer.dropEffect = 'none'")

    const closeTier = document.createElement('div')
    closeTier.classList.add('fa-solid')
    closeTier.classList.add('fa-xmark')
    closeTier.classList.add('removeTier')

    const pArea = document.createElement('div')
    pArea.classList.add('playerArea');
    
    info.appendChild(tierSettings)
    info.appendChild(tierDesc)
    info.appendChild(closeTier)
    tier.appendChild(info)
    tier.appendChild(pArea)
    tierContainer.appendChild(tier)

    pArea.addEventListener('dragover', function(e) {
        getElementFromPoint(e, pArea);
    })

    closeTier.addEventListener('click', function(e) {
        removeTier(e);
    })

    tierSettings.addEventListener('click', function(e) {
        changeColor(e);
    })
}

draggablePlayers.forEach(player => {
    player.addEventListener('dragstart', () => {
        player.classList.add('dragging');
        player.classList.add('hideInArea');
    })

    player.addEventListener('dragend', () => {
        player.classList.remove('dragging');
        player.classList.remove('hideInArea');
        
    })
})

playerAreas.forEach(area => {
    area.addEventListener('dragover', function(e){
        getElementFromPoint(e, area)
    })
})

function getElementFromPoint(e, area) {
    e.preventDefault();

    const tier = area.parentElement
    const draggable = document.querySelector('.dragging')

    let elementFromPoint = document.elementFromPoint(e.clientX, e.clientY);
    if (elementFromPoint.tagName === "IMG") {
        elementFromPoint = elementFromPoint.parentElement
    }

    if (elementFromPoint == area) {
        area.appendChild(draggable)
    }
    else if (elementFromPoint == tier) {
        tier.childNodes[3].appendChild(draggable)
    }
    else if (elementFromPoint.classList.contains('pImg')) {
        area.insertBefore(draggable, elementFromPoint)
    }
}

playersContainer.addEventListener('dragover', function(e) {
    getElementFromPoint(e, playersContainer)
})

function returnPlayerToPool(e, area) {
    e.preventDefault();
    const player = document.querySelector('.dragging')
    area.appendChild(player)
}

async function saveBoard() {
    const tiers = [...document.querySelectorAll('.tier')]
    let board = []

    tiers.forEach(tier => {
        const tierInfo = tier.children[0].children[1].innerText
        const tierColor = tier.children[0].style.backgroundColor
        const playerDivs = [...tier.children[1].children]
        const players = playerDivs.map(div => div.dataset.pname)
        const playerContainerDivs = [...playersContainer.children]
        const playersInPool = playerContainerDivs.map(player => player.dataset.pname)
    
        board.push({
            "tierInfo": tierInfo,
            "players": players,
            "tierColor": tierColor,
        })

        
    })


    console.log(board);
}