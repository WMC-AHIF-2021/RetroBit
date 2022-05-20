class Player
{
    public isLocalPlayer: boolean;
    public socketId: string;
    public name: string;
}

class SocketClient
{
    private roomManager: RoomManager;

    constructor() {
    }

    public init(roomManager: RoomManager): void
    {
        this.roomManager = roomManager;
        this.registerSocketEvents();
        setInterval(() => {
            this.getPlayers();
        }, 1000);
    }
    private registerSocketEvents(): void
    {
        socket.on("connect", () =>
        {
            console.log("Connected to server");
        });

        socket.on("rooms:create:success", (data: string) => {
            this.roomManager.createRoomSuccess(data);
        });
        socket.on("rooms:join:success", (data: string) => {
            this.roomManager.joinRoomSuccess(data);
        });
        socket.on("rooms:join:error", (data: string) => {
            alert(data);
        });
        socket.on("rooms:players:get:sending", (data: any) => {
            this.roomManager.updatePlayerList(data);
        });

        socket.on("game:start:sending", () => {
            game.startGame(false);
        });

        socket.on("game:update:sending", (data: any) => {
            game.updateGame(data);
        });

        socket.on("game:youAreWinner", () => {
            game.gameState = GameState.Finished;
            document.getElementById("canvas").style.visibility = "hidden";
            document.getElementById("gameEndPanel").style.visibility = "visible";
            document.getElementById("gameEndPanel_winnerOrLoser").innerHTML = "<span style='color: green'>You won!</span>";
        });
        socket.on("game:youAreLooser", () => {
            game.gameState = GameState.Finished;
            document.getElementById("canvas").style.visibility = "hidden";
            document.getElementById("gameEndPanel").style.visibility = "visible";
            document.getElementById("gameEndPanel_winnerOrLoser").innerHTML = "<span style='color: red'>You lost!</span>";
        });
    }

    // rooms:create
    public createRoom(): void {
        socket.emit("rooms:create");
    }
    // rooms:join
    public joinRoom(roomToJoin: string): void {
        socket.emit("rooms:join", roomToJoin);
    }
    // rooms:players:get
    public getPlayers(): void {
        socket.emit("rooms:players:get");
    }

    // game:start
    public sendStartGame(): void {
        socket.emit("game:start");
    }

    // game:playerPos:update
    public sendPlayerPosUpdate(playerPosX: number, playerPosY: number): void {
        socket.emit("game:playerPos:update", [playerPosX, playerPosY]);
    }
}

class RoomManager
{
    private socketClient: SocketClient;

    private currentRoomID: string;
    private players: Player[] = [];
    public get Players(): Player[] {
        return this.players;
    }

    constructor(socketClient: SocketClient) {
        this.socketClient = socketClient;
        this.socketClient.init(this);
    }

    public createRoom(): void {
        this.socketClient.createRoom();
    }
    public createRoomSuccess(roomID: string): void {
        this.currentRoomID = roomID;
        console.log("Created room with ID: " + roomID);

        let optionsEl = document.getElementById("options");
        optionsEl.style.visibility = "hidden";
        let roomPanelEl = document.getElementById("joinedRoomInfoPanel");
        roomPanelEl.style.visibility = "visible";

        document.getElementById("joinedRoomPanel_startGameButton").style.visibility = "visible";

        document.getElementById("joinedRoomId").innerText = roomID;

        game.gameState = GameState.WaitingForPlayers;
    }

    public joinRoom(): void {
        let roomID = (<HTMLInputElement>document.getElementById("options_gameId")).value;
        this.socketClient.joinRoom(roomID);
    }
    public joinRoomSuccess(roomID: string): void {
        this.currentRoomID = roomID;
        console.log("Joined room with ID: " + roomID);

        let optionsEl = document.getElementById("options");
        optionsEl.style.visibility = "hidden";
        let roomPanelEl = document.getElementById("joinedRoomInfoPanel");
        roomPanelEl.style.visibility = "visible";

        document.getElementById("joinedRoomPanel_startGameButton").style.visibility = "hidden";

        document.getElementById("joinedRoomId").innerText = roomID;

        game.gameState = GameState.WaitingForPlayers;
    }

    public updatePlayerList(players: any): void {
        let listHTML = "";
        this.players = [];
        for (let i = 0; i < players.length; i++) {
            let player = new Player();
            player.socketId = players[i].socketId;
            player.name = players[i].name;
            player.isLocalPlayer = players[i].socketId == socket.id;
            this.players.push(player);

            listHTML += "<li>" + player.name + " (" + player.socketId + ")</li>";
        }
        document.getElementById("joinedRoom_playerCount").innerText = players.length + " / 2";
        document.getElementById("joinedRoom_playerList").innerHTML = listHTML;
    }
}