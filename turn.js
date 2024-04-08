class Game {
    constructor(totalPlayers) {
        this.turn = 1;
        this.actionsCompleted = 0;
        this.totalPlayers = totalPlayers;
        this.gameOver = false;
        this.playerActions = new Array(totalPlayers).fill(null); // 플레이어의 행동 상태를 null로 초기화
    }

    performAction(playerId, action) {
        if (this.gameOver) {
            return; // 게임이 끝났으면 아무 작업도 수행하지 않음
        }

        // 플레이어 액션 기록 및 상태 업데이트
        this.playerActions[playerId - 1] = action; // 플레이어 ID는 1부터 시작하므로 인덱스를 맞추기 위해 -1
        console.log(`플레이어 ${playerId}가 ${action}을 수행`);
        this.updatePlayerStatus(playerId, `${action} 완료`);

        // 모든 플레이어가 행동을 완료했는지 확인
        if (this.playerActions.every((action) => action !== null)) {
            this.endTurn();
        }
    }

    updatePlayerStatus(playerId, status) {
        document.getElementById(
            `player${playerId}Status`,
        ).innerText = `Player ${playerId}: ${status}`;
    }

    endTurn() {
        this.turn++; // 턴 수 증가
        this.playerActions.fill(null); // 플레이어 행동 상태 리셋
        console.log(` ${this.turn}번 째 Turn 시작 `);
        this.updateTurnDisplay(); // 턴 정보 업데이트
        // 플레이어 상태 리셋
        for (let i = 1; i <= this.totalPlayers; i++) {
            this.updatePlayerStatus(i, "준비");
        }
    }

    updateTurnDisplay() {
        document.getElementById("turnDiv").innerText = `Round: ${this.turn}`;
    }
}

let newGame = new Game(0, false);
const game = new Game(2); // 2명의 플레이어가 있는 게임 인스턴스 생성

document.getElementById("redAttack").addEventListener("click", () => {
    game.performAction(1, "attack"); // 플레이어 1이 공격
});

document.getElementById("redDefend").addEventListener("click", () => {
    game.performAction(1, "defend"); // 플레이어 1이 방어
});

document.getElementById("blueAttack").addEventListener("click", () => {
    game.performAction(2, "attack"); // 플레이어 2가 공격
});

document.getElementById("blueDefend").addEventListener("click", () => {
    game.performAction(2, "defend"); // 플레이어 2가 방어
});
