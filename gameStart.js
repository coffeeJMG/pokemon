let jiwooCards = new CardList("#player1Cards");
let woong2Cards = new CardList("#player2Cards");
let redDeck = new CardList("#player1Deck");
let blueDeck = new CardList("#player2Deck");



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

// function updateUI(playerDeck, deckElementId) {
//     const deckElement = document.querySelector(deckElementId);
//     deckElement.innerHTML = ""; // 기존 덱 UI 내용을 비웁니다.

//     // 덱에 있는 모든 카드를 순회하며 UI를 업데이트합니다.
//     playerDeck.cards.forEach((card) => {
//         let cardElement = document.createElement("div");
//         cardElement.className = "card";
//         cardElement.innerHTML = `
//         <h4>${card.name}</h4>
//         <p>Element: ${card.element}</p>
//         <p>HP: ${card.hp}</p>
//         <p>Attack: ${card.attack}</p>
//         <p>Shield: ${card.shield}</p>
//         <p>Speed: ${card.speed}</p>

//         `;
//         deckElement.appendChild(cardElement); // 새로운 카드 요소를 덱에 추가합니다.
//     });
// }

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

