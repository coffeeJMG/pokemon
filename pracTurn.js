class Turn {
    constructor(playerId) {
        this.playerId = playerId;
        this.actionTaken = false;
    }

    takeAction(action) {
        this.action = action;
        this.actionTaken = true;
        console.log(`Player ${this.playerId} performs ${action}`);
        return `Player ${this.playerId}: ${action} 완료`;
    }

    resetTurn() {
        this.actionTaken = false;
        this.action = null;
    }
}

class Game {
    constructor(totalPlayers) {
        this.turn = 1;
        this.totalPlayers = totalPlayers;
        this.gameOver = false;
        this.turns = Array.from(
            { length: totalPlayers },
            (_, i) => new Turn(i + 1),
        );
    }

    performAction(playerId, action) {
        if (this.gameOver) {
            return;
        }

        let status = this.turns[playerId - 1].takeAction(action);
        this.updatePlayerStatus(playerId, status);

        // if (this.turns.every((turn) => turn.actionTaken)) {
        //     this.endTurn();
        // }
    }

    updatePlayerStatus(playerId, status) {
        document.getElementById(`player${playerId}Status`).innerText = status;
    }

    endTurn() {
        this.turn++;
        this.turns.forEach((turn) => turn.resetTurn());
        console.log(`Turn ${this.turn} begins`);
        this.updateTurnDisplay();
        this.resetPlayerStatuses();
    }

    resetPlayerStatuses() {
        for (let i = 1; i <= this.totalPlayers; i++) {
            this.updatePlayerStatus(i, "Ready");
        }
    }

    updateTurnDisplay() {
        document.getElementById("turnDiv").innerText = `Round: ${this.turn}`;
    }
}

let game = new Game(2); // Assuming 2 players for simplicity

document.getElementById("redAttack").addEventListener("click", () => {
    game.performAction(1, "attack");
});

document.getElementById("redDefend").addEventListener("click", () => {
    game.performAction(1, "defend");
});

document.getElementById("blueAttack").addEventListener("click", () => {
    game.performAction(2, "attack");
});

document.getElementById("blueDefend").addEventListener("click", () => {
    game.performAction(2, "defend");
});
