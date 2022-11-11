const tablero = document.getElementById("tablero");
const buttonStart = document.getElementById('comenzar');

const icons = [
    '<i class="fas fa-utensils"></i>',
    '<i class="fas fa-water text-dark"></i>',
    '<i class="fas fa-utensil-spoon"></i>',
    '<i class="fas fa-venus-mars"></i>',
    '<i class="fas fa-tv"></i>',
    '<i class="fas fa-walking text-dark"></i>',
    '<i class="fas fa-tshirt"></i>',
    '<i class="fas fa-volleyball-ball text-dark"></i>',
    '<i class="fas fa-user-astronaut"></i>',
    '<i class="fas fa-vihara text-dark"></i>',
    '<i class="fas fa-trophy"></i>',
    '<i class="fas fa-university"></i>',
    '<i class="fas fa-chess text-dark"></i>',
    '<i class="fas fa-dice-d20 text-dark"></i>',
    '<i class="fas fa-yin-yang text-dark"></i>',
    '<i class="fas fa-yen-sign text-dark"></i>',
    '<i class="fas fa-x-ray text-dark"></i>',
    '<i class="fas fa-wrench text-dark"></i>',
    '<i class="fas fa-won-sign text-dark"></i>',
    '<i class="fas fa-wine-glass-alt text-dark"></i>',
    '<i class="fas fa-wine-bottle text-dark"></i>',
    '<i class="fas fa-star text-dark"></i>',
    '<i class="far fa-star text-dark"></i>',
    '<i class="fas fa-star-of-life text-dark"></i>',
    '<i class="fas fa-star-and-crescent text-dark"></i>',
   ' <i class="fab fa-old-republic text-dark"></i>',
    '<i class="fab fa-galactic-republic text-dark"></i>',
    '<i class="fas fa-sun text-dark"></i>',
    '<i class="fas fa-stroopwafel text-dark"></i>',
    '<i class="fas fa-dice text-dark"></i>',
    '<i class="fas fa-chess-knight text-dark"></i>',
    '<i class="fas fa-truck-monster"></i>',
    '<i class="fas fa-wind text-dark"></i>',
    '<i class="fas fa-wifi text-dark"></i>',
    '<i class="fas fa-umbrella-beach"></i>',
    '<i class="fas fa-wheelchair text-dark"></i>',
];

let cards = [];
let selected = [];
let pairs = 0;
let tries = 0;

const newGame = () => {
    selected = [];
    cards = [];
    pairs = 0;
    tries = 0;

    for (let i = 0; i < 16; i++) {
        cards.push(`
            <div class="card-container" onclick="select(${i})">
                <div class="cards" id="cards-${i}">
                    <div class="front back" id="back-${i}">
                        ${icons[0]}
                    </div>
                    <div class="front card-back">
                        <i class="far fa-question-circle"></i>
                    </div>
                </div>
            </div>
        `)
        if (i % 2 == 1) icons.splice(0, 1);
    }
    cards.sort(() => Math.random() - 0.5);
    tablero.innerHTML = cards.join(" ");
}

const getRandom = () => {
    const random = Math.floor(Math.random() * icons.length);
    if(img.indexOf(random) == -1){
        return random;
    }else {
        return getRandom();
    }
}


const select = (card) => {
    let cardSelected = document.getElementById("cards-" + card);
    if(cardSelected.style.transform != "rotateY(180deg)"){
        if(selected.length < 2) {
            cardSelected.style.transform = "rotateY(180deg)";
            selected.push(card);
            if(selected.length == 2) deselect(selected);
        }
    }
}

const deselect = (cardsSelected) => {
    setTimeout(() => {
        tries ++;
        let card1 = document.getElementById("back-" + cardsSelected[0])
        let card2 = document.getElementById("back-" + cardsSelected[1])
        if(card1.innerHTML != card2.innerHTML){
            selected = [];
            let cardOne = document.getElementById("cards-" + cardsSelected[0])
            let cardTwo = document.getElementById("cards-" + cardsSelected[1])
            card1.style.background = "red";
            card2.style.background = "red";
            setTimeout(() => {
                cardOne.style.transform = "rotateY(0deg)";
                cardTwo.style.transform = "rotateY(0deg)";
                card1.style.background = "white";
                card2.style.background = "white";
            }, 1000)
            
        }
        else{
            card1.style.background = "green";
            card2.style.background = "green";
            selected = [];
            pairs ++;
            if(pairs == 8){
                tablero.innerHTML = `
                    <div class="row text-center">
                        <h3 class="text-center text-light">Completado</h3>
                        <h3 class="text-center text-light">Total de intentos: <span class="text-center text-light fw-bold">${tries}</span></h3>
                        <button id="start" class=" mt-3 btn btn-lg btn-outline-success text-light" onclick="newGame()">Jugar</button>
                    </div>
                    `
            }
        }
    }, 1000);
}