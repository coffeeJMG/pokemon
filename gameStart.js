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
let redDeck;
let blueDeck;
let startBtn;
let turnDiv;
let player1hp;
let player2hp;

document.addEventListener("DOMContentLoaded", function () {
    startBtn = document.querySelector("#gameStart");
    turnDiv = document.querySelector("#turnDiv");
    player1hp = document.querySelector("#player1Hp");
    player2hp = document.querySelector("#player2Hp");

    redDeck = new CardList("#player1Deck");
    blueDeck = new CardList("#player2Deck");

    document
        .querySelector("#confirmTurn")
        .addEventListener("click", resolveTurn);
});

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

    console.log(player1.hp);

    player1hp.innerHTML = `Player 1 HP: ${player1.hp}`;
    player2hp.innerHTML = `Player 2 HP: ${player2.hp}`;

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
    const player1Pokemon = redDeck.cards[0]; // 플레이어1의 카드 (첫 번째 카드)
    const player2Pokemon = blueDeck.cards[0]; // 플레이어2의 카드 (첫 번째 카드)

    console.log(player1Pokemon);
    console.log(player2Pokemon);

    let player1Attack = player1Pokemon.attack;
    let player1Speed = player1Pokemon.speed;
    let player1PokemonHp = parseInt(player1Pokemon.hp, 10);
    let player2Attack = player2Pokemon.attack;
    let player2Speed = player2Pokemon.speed;
    let player2PokemonHp = parseInt(player2Pokemon.hp, 10);

    let resultMessage = "";

    console.log(player1PokemonHp, player2PokemonHp);

    // Player 1의 액션이 attack인 경우
    if (
        currentTurn.player1Action === "attack" &&
        currentTurn.player2Action === "attack"
    ) {
        if (player1Speed > player2Speed) {
            console.log("player1 선제공격");
            player2PokemonHp -= player1Attack;

            if (player2PokemonHp <= 0) {
                console.log("player2 포켓몬 사망");
                resultMessage += "Player 2's 포켓몬 사망 ";
                player2.hp -= player1Attack; // 플레이어 2의 HP 감소
            } else {
                console.log("player2 후공");
                player1PokemonHp -= player2Attack;

                if (player1PokemonHp <= 0) {
                    console.log("player1 포켓몬 사망");
                    resultMessage += "Player 1's 포켓몬 사망 ";
                    player1.hp -= player2Attack; // 플레이어 1의 HP 감소
                }
            }
        } else {
            console.log("player2 선제공격");
            player1PokemonHp -= player2Attack;

            if (player1PokemonHp <= 0) {
                console.log("player1 포켓몬 사망");
                resultMessage += "Player 1's 포켓몬 사망 ";
                player1.hp -= player2Attack; // 플레이어 1의 HP 감소
            } else {
                console.log("player1 후공");
                player2PokemonHp -= player1Attack;

                if (player2PokemonHp <= 0) {
                    console.log("player2 포켓몬 사망");
                    resultMessage += "Player 2's 포켓몬 사망 ";
                    player2.hp = player1Attack; // 플레이어 2의 HP 감소
                }
            }
        }
    }

    player1Pokemon.hp = player1PokemonHp.toString();
    player2Pokemon.hp = player2PokemonHp.toString();

    // Update player HP display
    player1hp.innerHTML = `Player 1 HP: ${player1.hp}`;
    player2hp.innerHTML = `Player 2 HP: ${player2.hp}`;

    console.log(player1Hp, player2Hp);

    alert(resultMessage);

    // HP가 0 이하인 포켓몬을 덱에서 제거
    if (player1Hp <= 0) {
        redDeck.removeCard(player1Pokemon.name);
    }
    if (player2Hp <= 0) {
        blueDeck.removeCard(player2Pokemon.name);
    }

    // 플레이어의 HP가 0 이하일 경우 게임 종료
    if (player1.hp <= 0) {
        alert("Player 2 승리!");
        console.log("Player 2 승리!");
        return;
    }
    if (player2.hp <= 0) {
        alert("Player 1 승리!");
        console.log("Player 1 승리!");
        return;
    }

    // 턴 종료 후 초기화
    currentTurn.turn++;
    player1.action = false;
    player2.action = false;

    updateTurnDisplay();
    document.querySelector("#player1Stat").innerText = "Please, choose action";
    document.querySelector("#player2Stat").innerText = "Please, choose action";
    document.querySelector("#confirmTurn").style.display = "none";

    // 덱 UI 업데이트
    redDeck.updateUI(redDeck.cards, redDeck);
    blueDeck.updateUI(blueDeck.cards, blueDeck);
}

function endTurn() {
    if (!player1.action && !player2.action) {
        alert("모든 플레이어가 행동을 선택해야 합니다.");
    }
}

function updateTurnDisplay() {
    document.querySelector(
        "#turnDisplay",
    ).innerText = `Turn ${currentTurn.turn}`;
}
