const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Table = require('./Table');

class Player {
  constructor(socketIo, gameSocket) {
    //connect to all others during vid chat & get curr game states
    this.socketIo = socketIo;
    this.gameSocket = gameSocket;
    this.currentTable = undefined;
    this.user = undefined;

    //poker logic
    gameSocket.on('createTable', this.createTable);
    gameSocket.on('joinTable', this.joinActiveTable);

    gameSocket.on('disconnect', this.leaveTable);
    gameSocket.on('leaveTable', this.leaveTable);

    gameSocket.on('bet', this.betPoker);
    gameSocket.on('call', this.callPoker);
    gameSocket.on('check', this.checkPoker);
    gameSocket.on('raise', this.raisePoker);
    gameSocket.on('fold', this.foldPoker);

    gameSocket.on('resign', this.resignChess);
  }
}

// Setup Table

joinActiveTable = () => {
  
}
