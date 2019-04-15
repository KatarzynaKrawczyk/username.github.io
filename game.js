let timesClicked = 0;
const CardsColor = [
    "star", "blue", 
   
];


//2tables: CardsColorH CardsColorE -> create element*CardsColorE(H).length
function createBoard(){
    cards.forEach(card  => {
        const position = Math.floor(Math.random() * CardsColor.length);
        card.classList.add(CardsColor[position]);
        console.log(CardsColor);

        CardsColor.splice(position, 1);
        console.log(CardsColor);
        })
        setTimeout(function () {
        cards.forEach(card => {
            card.classList.add('hidden')
            card.addEventListener('click', clickCard)
        })        
    }, 2000)
};

function prepareBoardH () {
    
    CardsColor.push( "aqua", "gold", "gray", "black");
    const CardsColorCopy = CardsColor.slice();
    Array.prototype.push.apply(CardsColor,CardsColorCopy);
    console.log(CardsColor);
    createBoard();
    debugger;
  
};
function prepareBoardE () {
    const CardsColorCopy = CardsColor.slice();
    Array.prototype.push.apply(CardsColor,CardsColorCopy);
    console.log(CardsColor);
    createBoard();
    debugger;
   
};


function main (){
    const $startButtonHard = document.getElementById('startButtonHard');
    $startButtonHard.addEventListener('click', function(){
        hideElement();
        prepareBoardH();
        showElement();
    } )
    const $startButtonEasy = document.getElementById('startButtonEasy');
    $startButtonEasy.addEventListener('click', function(){
        hideElement();
        prepareBoardE();
        showElement();
    } )
}
function hideElement(){
    let introSection = document.getElementById('intro');
    introSection.classList.add('d-none');
}
function showElement(){
    let board = document.getElementById('board');
    board.classList.remove('d-none');
}
let clickCounter = document.getElementById('clickCounter');
let gameTimeCounter = document.getElementById('gameTimeCounter');

let cards = document.getElementsByClassName('card-body');

cards = [...cards];
console.log(cards);
console.log(cards.length);
//change to table

const startTime = new Date().getTime();

let activeCard = '';
const activeCards = [];

const gamePairs = cards.length/2;
let gameResult = 0;

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
                 //    (gameResult == gamePairs){
                        
                        const endTime = new Date().getTime();
                        let gameTime = (endTime-startTime)/1000;
                     
                        console.log(gameTime);
                       
                        function Round(n, k)
                            {
                                var factor = Math.pow(10, k);
                                return Math.round(n*factor)/factor;
                            }
                            
                            gameTimeCounter.innerHTML = ('your time score is '+(Round(gameTime, 0))+' seconds' );
debugger;
    //                    swal(`You Won! your time score is ${gameTime} seconds`);
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