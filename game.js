let timesClicked = 0;
let cards, cardsAmmount, clickCounter, gameTimeCounter;
const activeCards = [];
const startTime = new Date().getTime();
const CardsColor = [ "star", "blue", ];
const $board = document.getElementById('board2');
function main (){
    prepareDOMElemens();
    prepareDOMEvents();
};
//DOM
function hideElement(){
    let introSection = document.getElementById('intro');
    introSection.classList.add('d-none');
};
function prepareBoard(){
    const CardsColorCopy = CardsColor.slice();
    Array.prototype.push.apply(CardsColor,CardsColorCopy);
    cardsAmmount = CardsColor.length;
    console.log(cardsAmmount);
    createDOMElement(cardsAmmount);
    createBoard();
};
function createDOMElement(cardsAmmount){
   
    $fragment = document.createDocumentFragment();
    for (let i=0; i<cardsAmmount; i++ ) {
        const back = document.createElement('div');
        back.classList.add('card', 'mx-auto');
        const backElement = document.createElement('div');
        backElement.classList.add('card-body');
        back.appendChild(backElement);
        $fragment.appendChild(back);
    }    
    $board.appendChild($fragment); //wstawiam 12div
    
};
function createBoard(){
    cards = document.getElementsByClassName('card-body');
    cards = [...cards]; //change to array
    let activeCard = '';
    const gamePairs = cards.length/2;
    let gameResult = 0;

    cards.forEach(card  => {
        const position = Math.floor(Math.random() * CardsColor.length);
        card.classList.add(CardsColor[position]);

        CardsColor.splice(position, 1);
        })
        setTimeout(function () {
        cards.forEach(card => {
            card.classList.add('hidden')
            card.addEventListener('click', clickCard)
        })        
    }, 2000)
};
function showElement(){
    let board = document.getElementById('board');
    board.classList.remove('d-none');
};
function prepareDOMElemens(){
    const $startButton = document.getElementById ('intro');
    $startButton.addEventListener('click', function(){
        hideElement();
        if (event.target.id===('startButtonHard')){
                CardsColor.push( "aqua", "gold", "gray", "black");
            };
        prepareBoard();
        showElement();
    })
};
//DOM
function prepareDOMEvents(){
    clickCounter = document.getElementById('clickCounter');
    gameTimeCounter = document.getElementById('gameTimeCounter');
    $board.addEventListener('click', checkCard );
};
function checkCard(){
console.log(event.target.classList[1]);
let Guess1 = event.target.classList[1];

//here I ended
};
function clickCard (){
    activeCard = this;

    if (activeCard == activeCards[0]) {return;};

    activeCard.classList.remove('hidden'); 
    timesClicked++;
    clickCounter.innerHTML = (timesClicked+' times');

//after 1 click
    if(activeCards.length === 0) {
        activeCards[0] = activeCard;
        console.log('after 1 click');
        return;
    }
//after 2 click
    else {
        console.log('after 2 click');
        cards.forEach (card =>
            card.removeEventListener('click', clickCard))
            activeCards[1] = activeCard;
            setTimeout(function(){
                if (activeCards[0].className == activeCards[1].className){
                    activeCards.forEach(card => card.classList.add('off'));
                    gameResult=+1;
                    console.log(gameResult+' paired');
//mute paired cards
                    cards = cards.filter(card => !card.classList.contains('off'));
                    
                    console.log(cards.length+' cards left');
                    console.log(activeCards.length+' cards active');
                    gameTimeCounter.innerHTML = (gameResult+' paired');
//end of game                    
                    if(cards.length ===      0){
                        const endTime = new Date().getTime();
                        let gameTime = (endTime-startTime)/1000;
                        function Round(n, k) {   
                            var factor = Math.pow(10, k);
                            return Math.round(n*factor)/factor;
                            }
                            gameTimeCounter.innerHTML = ('your time score is '+(Round(gameTime, 0))+' seconds' );
                            board.classList.remove('d-none');
debugger;               
                        location.reload();
                    }
                }
                else {
                    console.log('try again');
                    activeCards.forEach(card => card.classList.add('hidden'))  
                }
                activeCard = "";
                activeCards.length = 0;
                cards.forEach(card => card.addEventListener('click', clickCard));
            },300)
    }

}


document.addEventListener('DOMContentLoaded', main);