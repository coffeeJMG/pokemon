let player1 = new CardList("#player1Cards");
let player2 = new CardList("#player2Cards");
let redDeck = new CardList("#player1Deck");
let blueDeck = new CardList("#player2Deck");

let startBtn = document.querySelector("#gameStart");
let turnDiv = document.querySelector("#turnDiv");

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

    console.log(playerCards);
    console.log(targetDeck);
}
function gameStart() {
    // 초기 카드 할당 로직
    startBtn.style.display = "none";

    assignPokemonCards(player1, pockemonArray, 5);
    assignPokemonCards(player2, pockemonArray, 5);

    // 카드 목록 변화에 따른 UI 업데이트 구독
    player1.subscribe(() => player1.updateUI());
    player2.subscribe(() => player2.updateUI());

    // 초기 UI 업데이트
    player1.updateUI(player1.cards, player1);
    player2.updateUI(player2.cards, player2);
}

document.getElementById("gameStart").addEventListener("click", gameStart);
