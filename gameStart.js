let jiwooCards = new CardList("#player1Cards");
let woong2Cards = new CardList("#player2Cards");
let redDeck = new CardList("#player1Deck");
let blueDeck = new CardList("#player2Deck");
let newGame = new Game(0,false)

let startBtn = document.querySelector("#gameStart")
let turnDiv = document.querySelector("#turnDiv")

function assignPokemonCards(cardList, pockemonArray, count) {
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * pockemonArray.length);
        const pockemon = pockemonArray[randomIndex];
        const card = new Card(
            pockemon.name,
            pockemon.element,
            pockemon.hp,
            pockemon.attack,
            pockemon.shield,
            pockemon.speed,
        );

        cardList.addCard(card);
        pockemonArray.splice(randomIndex, 1);
    }
}


function SelectPockemon(selectedCard, playerCards, targetDeck) {
    playerCards.cards.forEach((card) => {
        if (selectedCard === card.name) {
            targetDeck.addCard(card);
            playerCards.removeCard(card.name);
        }
    });


    
    console.log(playerCards)
    console.log(targetDeck)
    
    
}
function gameStart() {
    // 초기 카드 할당 로직
    startBtn.style.display="none"

    turnDiv.innerHTML = `
      Round : ${newGame.turn}

    `
    

    assignPokemonCards(jiwooCards, pockemonArray, 5);
    assignPokemonCards(woong2Cards, pockemonArray, 5);

    // 카드 목록 변화에 따른 UI 업데이트 구독
    jiwooCards.subscribe(() => jiwooCards.updateUI());
    woong2Cards.subscribe(() => woong2Cards.updateUI());
  

    // 초기 UI 업데이트
    jiwooCards.updateUI(jiwooCards.cards, jiwooCards);
    woong2Cards.updateUI(woong2Cards.cards, woong2Cards);

    

}

document.getElementById("gameStart").addEventListener("click", gameStart);

