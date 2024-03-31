let pocketmonArray = [
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
        name: "PikachCaterpie",
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

class Game {
    constructor(turn, gameOver) {
        this.turn = turn;
        this.gameOver = gameOver;
    }
}
