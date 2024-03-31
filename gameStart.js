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

function updateUI(playerDeck, deckElementId) {
    const deckElement = document.querySelector(deckElementId);
    deckElement.innerHTML = ""; // 기존 덱 UI 내용을 비웁니다.

    // 덱에 있는 모든 카드를 순회하며 UI를 업데이트합니다.
    playerDeck.cards.forEach((card) => {
        let cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.innerHTML = `
        <h4>${card.name}</h4>
        <p>Element: ${card.element}</p>
        <p>HP: ${card.hp}</p>
        <p>Attack: ${card.attack}</p>
        <p>Shield: ${card.shield}</p>
        <p>Speed: ${card.speed}</p>

        `;
        deckElement.appendChild(cardElement); // 새로운 카드 요소를 덱에 추가합니다.
    });
}

function SelectPockemon(selectedCard, playerCards, targetDeck) {
    playerCards.cards.forEach((card) => {
        if (selectedCard === card.name) {
            targetDeck.addCard(card);
            playerCards.removeCard(card.name);
        }
    });

    // jiwooCards.updateUI(jiwooCards.cards, "#player1Cards");
    // woong2Cards.updateUI(woong2Cards.cards, "#player2Cards");
}
function gameStart() {
    // 초기 카드 할당 로직
    assignPokemonCards(jiwooCards, pockemonArray, 5);
    assignPokemonCards(woong2Cards, pockemonArray, 5);

    // 카드 목록 변화에 따른 UI 업데이트 구독
    jiwooCards.subscribe(() => jiwooCards.updateUI());
    woong2Cards.subscribe(() => woong2Cards.updateUI());
    redDeck.subscribe(() => redDeck.updateUI());
    blueDeck.subscribe(() => blueDeck.updateUI());

    // 초기 UI 업데이트
    jiwooCards.updateUI(jiwooCards.cards, "#player1Cards");
    woong2Cards.updateUI(woong2Cards.cards, "#player2Cards");
}

document.getElementById("gameStart").addEventListener("click", gameStart);

// let jiwoo = new Player("jiwoo", 30, new Array()); // 플레이어 A
// let woong2 = new Player("woong2", 30, new Array()); // 플레이어 B

// let redDeck = new Deck([]); // jiwoo 플레이어의 덱
// let blueDeck = new Deck([]); // woong2 플레이어의 덱

// // 게임 시작 시에 플레이어에게 각 5마리의 포켓몬을 할당
// function assignPokemonCards(player, pocketmonArray, count) {
//     // 랜덤으로 포켓몬 출력
//     for (let i = 0; i < count; i++) {
//         // 특정 범위안에서 랜덤으로 숫자 뽑는 식
//         const randomIndex = Math.floor(Math.random() * pocketmonArray.length);

//         // 랜덤 숫자를 통해서 포켓몬 배열에서 랜덤으로 선택
//         const pocketmon = pocketmonArray[randomIndex];

//         // 선택된 포켓몬으로 Card 인스턴스 생성
//         const card = new Card(
//             pocketmon.name,
//             pocketmon.element,
//             pocketmon.hp,
//             pocketmon.attack,
//             pocketmon.shield,
//             pocketmon.speed,
//         );

//         // 생성된 Card 인스턴스를 player의 cards 배열에 추가
//         player.cards.push(card);

//         // 한 번 뽑힌 포켓몬은 포켓몬 배열에서 삭제하여 중복 방지
//         for (let i = 0; i < pocketmonArray.length; i++) {
//             if (pocketmonArray[i].name === card.name) {
//                 pocketmonArray.splice(i, 1);
//             }
//         }
//     }
// }

// function updateDeckUI(playerDeck, deckElementId) {
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

// // 포켓몬 클릭 시 덱으로 이동시키고 플레이어의 포켓볼에서 제거
// // 매개변수로 선택 된 카드명, 플레이어의 이름을 받는다
// function nameCheck(selectedCard, player) {
//     // 매개변수로 받은 플레이어의 포켓볼을 순회
//     player.cards.forEach((card) => {
//         // 선택 된 카드와 포켓볼의 카드 이름과 같고 해당 플레이어가 지우라면
//         if (selectedCard === card.name && player.name === "jiwoo") {
//             // 레드덱에 포켓몬 추가
//             redDeck.cards.push(card);

//             // 플레이어의 포켓볼에서 선택 된 포켓몬의 이름과 같지 않은 포켓몬만 반환
//             player.cards = player.cards.filter((item) => {
//                 return item.name !== selectedCard;
//             });

//             console.log(redDeck);
//             console.log(player.cards);
//         }

//         if (selectedCard === card.name && player.name === "woong2") {
//             blueDeck.cards.push(card);

//             player.cards = player.cards.filter((item) => {
//                 return item.name !== selectedCard;
//             });

//             console.log(redDeck);
//             console.log(player.cards);
//         }
//     });
//     updateDeckUI(redDeck, "#player1Deck");
//     updateDeckUI(blueDeck, "#player2Deck");
// }

// // 플레이어가 받은 카드 리스트를 카드 리스트 보드에 노출
// function assignPocketList(deck, playerCardsList) {
//     playerCardsList.forEach((card, index) => {
//         // 카드 정보를 사용하여 HTML 요소를 생성
//         let cardElement = document.createElement("div");
//         cardElement.id = `${index + 1}poketmon`;
//         cardElement.className = "cardList";
//         cardElement.innerHTML = `
//         <h4>${card.name}</h4>
//         <p>Element: ${card.element}</p>
//         <p>HP: ${card.hp}</p>
//         <p>Attack: ${card.attack}</p>
//         <p>Shield: ${card.shield}</p>
//         <p>Speed: ${card.speed}</p>
//         `;

//         // 각 카드들에 클릭 이벤트 추가
//         cardElement.addEventListener("click", function () {
//             let selectedCard = card.name;

//             // 카드가 선택될 시 nameCheck 함수 호출
//             nameCheck(selectedCard, jiwoo);
//             nameCheck(selectedCard, woong2);
//         });
//         // 생성된 카드 요소를 player1CardList에 추가
//         deck.appendChild(cardElement);
//     });
// }

// // 게임 시작 함수
// function gameStart() {
//     // 각 플레이어의 포켓몬 리스트를 보여줄 UI
//     let player1CardList = document.querySelector("#player1Cards");
//     let player2CardList = document.querySelector("#player2Cards");

//     // 게임이 시작되면 플레이어에게 포켓몬 분배
//     assignPokemonCards(jiwoo, pocketmonArray, 5);
//     assignPokemonCards(woong2, pocketmonArray, 5);

//     // assignPokemonCards 로 할당 받은 포켓몬 리스트를 화면에 노출
//     assignPocketList(player1CardList, jiwoo.cards);
//     assignPocketList(player2CardList, woong2.cards);
// }

// document.getElementById("gameStart").addEventListener("click", function () {
//     gameStart();
//     // UI 업데이트 로직 추가
//     let startBtn = document.querySelector("#gameStart");
//     startBtn.style.display = "none";
// });
