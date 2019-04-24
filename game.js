
let timesClicked = 0;
let cards, cardsAmmount, clickCounter, gameTimeCounter, $startButton;
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
  //      setTimeout(function () {
        cards.forEach(card => {
            card.classList.add('hidden')
         //   card.addEventListener('click', clickCard)
        })        
 //   }, 200)
};
function showElement(){
    let board = document.getElementById('board');
    board.classList.remove('d-none');
};
function prepareDOMElemens(){
    $startButton = document.getElementById ('intro');
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
function checkCard (){
    if (event.target.classList.contains ('off')){       
        return;
    }
    else if (event.target.classList.contains ('card-body')) {
        clickCard ();
    }
};

function clickCard (){
    
    let activeCard = event.target;

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
            card.removeEventListener('click', clickCard));
            activeCards[1] = activeCard;
            setTimeout(function(){
                if (activeCards[0].className == activeCards[1].className){
                    activeCards.forEach(card => card.classList.add('off'));
                    gameResult=+1;
//mute paired cards
                    cards = cards.filter(card => !card.classList.contains('off'));
                    gameTimeCounter.innerHTML = (cards.length+' cards left');
            //        console.log(cards.length+' cards left');
//end of game                    
                    if(cards.length === 0){
                        const endTime = new Date().getTime();
                        let gameTime = (endTime-startTime)/1000;
                        function Round(n, k) {   
                            var factor = Math.pow(10, k);
                            return Math.round(n*factor)/factor;
                            }          
                        gameTimeCounter.innerHTML = ('your time score is '+(Round(gameTime, 0))+' seconds !' );
                       // board.classList.remove('d-none');
                       const $playAgainButton = document.getElementById('playAgainButton');
                       $playAgainButton.classList.remove('d-none');
                       $playAgainButton.addEventListener('click',function(){
                           location.reload();
                            });
                    }
                }
//if not nde of game
                else {
                    setTimeout (function(){
                    gameTimeCounter.innerHTML = ('try again');
                     },200);
                    gameTimeCounter.innerHTML = ('');
                    activeCards.forEach(card => card.classList.add('hidden'))  
                }
                activeCard = "";
                activeCards.length = 0;
            //    cards.forEach(card => card.addEventListener('click', clickCard));
            },300)
    }
}

document.addEventListener('DOMContentLoaded', main);