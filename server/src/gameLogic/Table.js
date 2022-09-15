const Player = require('./Player');

class Table {
  constructor(socketIo, tableId) {
    this.socketIo = socketIo;
    this.tableId = tableId;
    this.players = [];
  }
}
