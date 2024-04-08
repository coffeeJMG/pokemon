let pockemonArray = [
    // 꼬부기
    {
        name: "Squirtle",
        element: "water",
        hp: "44",
        attack: "48",
        shield: "65",
        speed: "45",
        speed: "43",
    },
    // 어니부기
    {
        name: "Wartortle",
        element: "water",
        hp: "59",
        attack: "63",
        shield: "80",
        speed: "58",
    },
    // 거북왕
    {
        name: "Blastoise",
        element: "water",
        hp: "79",
        attack: "103",
        shield: "120",
        speed: "78",
    },
    // 파이리
    {
        name: "Charmander",
        element: "fire",
        hp: "39",
        attack: "52",
        shield: "43",
        speed: "65",
    },

    // 리자드
    {
        name: "Charmeleon",
        element: "fire",
        hp: "58",
        attack: "64",
        shield: "58",
        speed: "80",
    },

    //리자몽
    {
        name: "Charizard",
        element: "fire",
        hp: "78",
        attack: "84",
        shield: "78",
        speed: "100",
    },

    // 이상해씨
    {
        name: "Bulbasaur",
        element: "grass",
        hp: "45",
        attack: "49",
        shield: "49",
        speed: "45",
    },

    // 이상해풀
    {
        name: "Ivysaur",
        element: "grass",
        hp: "60",
        attack: "62",
        shield: "63",
        speed: "60",
    },

    // 이상해꽃
    {
        name: "Venusaur",
        element: "grass",
        hp: "80",
        attack: "82",
        shield: "83",
        speed: "80",
    },

    // 캐터피
    {
        name: "Caterpie",
        element: "grass",
        hp: "45",
        attack: "30",
        shield: "35",
        speed: "45",
    },
];

class Card {
    constructor(name, element, hp, attack, shield, speed) {
        this.name = name;
        this.element = element;
        this.hp = hp;
        this.attack = attack;
        this.shield = shield;
        this.speed = speed;
    }
}

class Player {
    constructor(name, hp, cards) {
        this.name = name;
        this.hp = hp;
        this.cards = cards;
    }
}

class Deck {
    constructor(cards) {
        this.cards = cards;
    }
}

class CardList {
    constructor(selector) {
        this.cards = [];
        this.subscribers = []; // 구독자 목록
        this.selector = selector; // UI 업데이트 대상의 선택자
    }

    // 카드 추가
    addCard(card) {
        this.cards.push(card);
        this.notifySubscribers(); // 구독자에게 변화를 알림
    }

    // 카드 제거
    removeCard(cardName) {
        this.cards = this.cards.filter((card) => card.name !== cardName);
        this.notifySubscribers(); // 구독자에게 변화를 알림
    }

    // 구독자 추가
    subscribe(callback) {
        this.subscribers.push(callback);
    }

    lookupSubscribers() {
        console.log("현재 구독자 조회:", this.subscribers);
    }
    // 모든 구독자에게 변경 사항 알림
    notifySubscribers() {
        this.subscribers.forEach((callback) => callback(this.cards));
    }

    updateUI(cardList, cardDeck) {
        const deckElement = document.querySelector(this.selector);
        deckElement.innerHTML = ""; // 기존 내용을 비움

        this.cards.forEach((card) => {
            const cardElement = document.createElement("div");
            cardElement.innerHTML = `
            <h4>${card.name}</h4>
            <p>Element: ${card.element}</p>
            <p>HP: ${card.hp}</p>
            <p>Attack: ${card.attack}</p>
            <p>Shield: ${card.shield}</p>
            <p>Speed: ${card.speed}</p>
            `;

            // 카드 이름에 클릭 이벤트 리스너 추가
            const cardNameElement = cardElement.querySelector("h4");
            cardNameElement.addEventListener("click", (e) => {
                cardDeck.removeCard(card.name);
                cardDeck.updateUI(cardDeck.cards, cardDeck);

                console.log(cardDeck.selector);

                if (cardDeck.selector === "#player1Cards") {
                    redDeck.addCard(card);

                    console.log(redDeck);
                    redDeck.updateUI(redDeck.cards, redDeck);
                }

                if (cardDeck.selector === "#player2Cards") {
                    blueDeck.addCard(card);

                    console.log(blueDeck);
                    blueDeck.updateUI(blueDeck.cards, blueDeck);
                }
            });

            deckElement.appendChild(cardElement);
        });
    }
}
