var Player = /** @class */ (function () {
    function Player() {
    }
    return Player;
}());
var SocketClient = /** @class */ (function () {
    function SocketClient() {
    }
    SocketClient.prototype.init = function (roomManager) {
        var _this = this;
        this.roomManager = roomManager;
        this.registerSocketEvents();
        setInterval(function () {
            _this.getPlayers();
        }, 1000);
    };
    SocketClient.prototype.registerSocketEvents = function () {
        var _this = this;
        socket.on("connect", function () {
            console.log("Connected to server");
        });
        socket.on("rooms:create:success", function (data) {
            _this.roomManager.createRoomSuccess(data);
        });
        socket.on("rooms:join:success", function (data) {
            _this.roomManager.joinRoomSuccess(data);
        });
        socket.on("rooms:join:error", function (data) {
            alert(data);
        });
        socket.on("rooms:players:get:sending", function (data) {
            _this.roomManager.updatePlayerList(data);
        });
        socket.on("game:start:sending", function () {
            game.startGame(false);
        });
        var nextSendingReceived = true;
        var nextSendingCheckTimeout = null;
        socket.on("game:update:sending", function (data) {
            game.updateGame(data);
            clearTimeout(nextSendingCheckTimeout);
            nextSendingCheckTimeout = setTimeout(function () {
                nextSendingReceived = false;
            }, 100);
        });
        var isBadConnectionPanelOpen = false;
        setInterval(function () {
            if (nextSendingReceived === false && !isBadConnectionPanelOpen) {
                document.getElementById("badConnectionPanel").style.visibility = "visible";
                isBadConnectionPanelOpen = true;
                setTimeout(function () {
                    nextSendingReceived = true;
                }, 5000);
            }
            else if (nextSendingReceived && isBadConnectionPanelOpen) {
                document.getElementById("badConnectionPanel").style.visibility = "hidden";
                isBadConnectionPanelOpen = false;
            }
        }, 10);
        socket.on("game:youAreWinner", function () {
            game.gameState = GameState.Finished;
            document.getElementById("canvas").style.visibility = "hidden";
            document.getElementById("gameEndPanel").style.visibility = "visible";
            document.getElementById("gameEndPanel_winnerOrLoser").innerHTML = "<span style='color: green'>You won!</span>";
        });
        socket.on("game:youAreLooser", function () {
            game.gameState = GameState.Finished;
            document.getElementById("canvas").style.visibility = "hidden";
            document.getElementById("gameEndPanel").style.visibility = "visible";
            document.getElementById("gameEndPanel_winnerOrLoser").innerHTML = "<span style='color: red'>You lost!</span>";
        });
    };
    // rooms:create
    SocketClient.prototype.createRoom = function () {
        socket.emit("rooms:create");
    };
    // rooms:join
    SocketClient.prototype.joinRoom = function (roomToJoin) {
        socket.emit("rooms:join", roomToJoin);
    };
    // rooms:players:get
    SocketClient.prototype.getPlayers = function () {
        socket.emit("rooms:players:get");
    };
    // game:start
    SocketClient.prototype.sendStartGame = function () {
        socket.emit("game:start");
    };
    // game:playerPos:update
    SocketClient.prototype.sendPlayerPosUpdate = function (playerPosX, playerPosY) {
        socket.emit("game:playerPos:update", [playerPosX, playerPosY]);
    };
    return SocketClient;
}());
var RoomManager = /** @class */ (function () {
    function RoomManager(socketClient) {
        this.players = [];
        this.socketClient = socketClient;
        this.socketClient.init(this);
    }
    Object.defineProperty(RoomManager.prototype, "Players", {
        get: function () {
            return this.players;
        },
        enumerable: false,
        configurable: true
    });
    RoomManager.prototype.createRoom = function () {
        this.socketClient.createRoom();
    };
    RoomManager.prototype.createRoomSuccess = function (roomID) {
        this.currentRoomID = roomID;
        console.log("Created room with ID: " + roomID);
        var optionsEl = document.getElementById("options");
        optionsEl.style.visibility = "hidden";
        var roomPanelEl = document.getElementById("joinedRoomInfoPanel");
        roomPanelEl.style.visibility = "visible";
        document.getElementById("joinedRoomPanel_startGameButton").style.visibility = "visible";
        document.getElementById("joinedRoomId").innerText = roomID;
        game.gameState = GameState.WaitingForPlayers;
    };
    RoomManager.prototype.joinRoom = function () {
        var roomID = document.getElementById("options_gameId").value;
        this.socketClient.joinRoom(roomID);
    };
    RoomManager.prototype.joinRoomSuccess = function (roomID) {
        this.currentRoomID = roomID;
        console.log("Joined room with ID: " + roomID);
        var optionsEl = document.getElementById("options");
        optionsEl.style.visibility = "hidden";
        var roomPanelEl = document.getElementById("joinedRoomInfoPanel");
        roomPanelEl.style.visibility = "visible";
        document.getElementById("joinedRoomPanel_startGameButton").style.visibility = "hidden";
        document.getElementById("joinedRoomId").innerText = roomID;
        game.gameState = GameState.WaitingForPlayers;
    };
    RoomManager.prototype.updatePlayerList = function (players) {
        var listHTML = "";
        this.players = [];
        for (var i = 0; i < players.length; i++) {
            var player = new Player();
            player.socketId = players[i].socketId;
            player.name = players[i].name;
            player.isLocalPlayer = players[i].socketId == socket.id;
            this.players.push(player);
            listHTML += "<li>" + player.name + " (" + player.socketId + ")</li>";
        }
        document.getElementById("joinedRoom_playerCount").innerText = players.length + " / 2";
        document.getElementById("joinedRoom_playerList").innerHTML = listHTML;
        var startGameButtonEl = document.getElementById("joinedRoomPanel_startGameButton");
        if (startGameButtonEl) {
            startGameButtonEl.disabled = players.length != 2;
        }
    };
    return RoomManager;
}());
//# sourceMappingURL=communication.js.map