// index.js

// Turn 클래스 정의
class Turn {
    constructor(turn, player1Action, player2Action) {
        this.turn = turn;
        this.player1Action = player1Action;
        this.player2Action = player2Action;
    }

    setPlayer1Action(action) {
        this.player1Action = action;
    }

    setPlayer2Action(action) {
        this.player2Action = action;
    }
}

let currentTurn = new Turn(1, null, null);

let player1;
let player2;
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

    console.log("포켓몬을 할당 했습니다.");
}

function gameStart() {
    // 초기 카드 할당 로직
    startBtn.style.display = "none";

    let player1Cards = new CardList("#player1Cards");
    let player2Cards = new CardList("#player2Cards");

    console.log("player1, player2 의 카드리스트를 생성했습니다.");

    assignPokemonCards(player1Cards, pockemonArray, 5);
    assignPokemonCards(player2Cards, pockemonArray, 5);

    player1 = new Player("Player 1", 100, player1Cards, false);
    player2 = new Player("Player 2", 100, player2Cards, false);

    console.log("player1, player2 를 생성했습니다.");

    // 카드 목록 변화에 따른 UI 업데이트 구독
    player1.cards.subscribe(() => player1.cards.updateUI());
    player2.cards.subscribe(() => player2.cards.updateUI());

    // 초기 UI 업데이트
    player1.cards.updateUI(player1.cards.cards, player1.cards);
    player2.cards.updateUI(player2.cards.cards, player2.cards);

    console.log("카드 리스트 UI 생성");
}

// player 의 액션을 받는 코드

function handlePlayerAction(playerId, actionType) {
    if (playerId === "player1") {
        if (redDeck.cards.length === 0) {
            alert("포켓몬을 올려주세요.");
            return;
        }
        if (player1.action) {
            alert("이미 선택하셨습니다.");
        } else {
            currentTurn.setPlayer1Action(actionType);
            player1.action = true;
            document.querySelector(
                "#player1Stat",
            ).innerText = `Player 1: ${actionType}`;
            console.log("Player 1 Action: ", currentTurn.player1Action);
        }
    } else if (playerId === "player2") {
        if (blueDeck.cards.length === 0) {
            alert("포켓몬을 올려주세요.");
            return;
        }
        if (player2.action) {
            alert("이미 선택하셨습니다.");
        } else {
            currentTurn.setPlayer2Action(actionType);
            player2.action = true;
            document.querySelector(
                "#player2Stat",
            ).innerText = `Player 2: ${actionType}`;
            console.log("Player 2 Action: ", currentTurn.player2Action);
        }
    }

    // 확인 버튼을 표시할지 결정
    if (player1.action && player2.action) {
        document.querySelector("#confirmTurn").style.display = "block";
    }
}

function resolveTurn() {
    const player1Card = redDeck.cards[0]; // 플레이어1의 카드 (첫 번째 카드)
    const player2Card = blueDeck.cards[0]; // 플레이어2의 카드 (첫 번째 카드)

    console.log(player1Card);
    console.log(player2Card);

    let player1Score = 0;
    let player2Score = 0;

    // Player 1의 액션이 attack인 경우
    if (currentTurn.player1Action === "attack") {
        player1Score = player1Card.attack;
    } else if (currentTurn.player1Action === "shield") {
        player1Score = player1Card.shield;
    }

    // Player 2의 액션이 attack인 경우
    if (currentTurn.player2Action === "attack") {
        player2Score = player2Card.attack;
    } else if (currentTurn.player2Action === "shield") {
        player2Score = player2Card.shield;
    }

    // 결과 비교 및 출력
    let resultMessage;
    if (player1Score > player2Score) {
        resultMessage = "Player 1 wins this turn!";
    } else if (player1Score < player2Score) {
        resultMessage = "Player 2 wins this turn!";
    } else {
        resultMessage = "This turn is a draw!";
    }

    alert(resultMessage);

    // 턴 종료 후 초기화
    endTurn();
}

function endTurn() {
    if (player1.action && player2.action) {
        currentTurn.turn++;
        player1.action = false;
        player2.action = false;

        // 턴 종료 후 초기화 및 UI 업데이트
        updateTurnDisplay();
        document.querySelector("#player1Stat").innerText =
            "Please, choose action";
        document.querySelector("#player2Stat").innerText =
            "Please, choose action";
        document.querySelector("#confirmTurn").style.display = "none";
    } else {
        alert("모든 플레이어가 행동을 선택해야 합니다.");
    }
}

function updateTurnDisplay() {
    document.querySelector(
        "#turnDisplay",
    ).innerText = `Turn ${currentTurn.turn}`;
}

document.querySelector("#confirmTurn").addEventListener("click", resolveTurn);
