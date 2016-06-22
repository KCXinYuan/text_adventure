module.exports = function(app) {
  app.controller('GameController', GameController);
};

function GameController() {
  this.model = {
    userLocation: 'start',
    hasWeapon: false,
    command: '',
    gamelog: [],
    location: {
      'start': {
        commands: ['?'],
        prompt: 'Welcome to the dungeon, you are in a room with a monster. There is a room to your left. Enter ? for avaliable commands at any time'
      },
      'weaponRoom': {
        commands:['take sword', 'look', 'say <message>', 'walk right'],
        prompt: 'You are in the weapon room. There is a sword on a rack.'
      },
      'monsterRoomWithoutWeapon': {
        commands: ['walk left', 'look','say <message>'],
        prompt: 'You are in a room with a monster.'
      },
      'monsterRoomWithWeapon' :{
        commands: ['walk left','look','say <message>','fight monster'],
        prompt: 'You are in a room with a monster. You have a sword in hand.'
      }
    }
  };
  GameController.prototype.startGame = function() {
    this.model.gamelog = [];
    this.model.userLocation = 'monsterRoomWithoutWeapon';
    this.model.hasWeapon = false;
    this.model.command = '';
    this.model.gamelog.push({
      src: 'game',
      msg: this.model.location.start.prompt
    });
    this.model.location.start.commands.forEach(function(item) {
      this.model.gamelog.push({
        src: 'command',
        msg: item
      });
    });
    // this.model.userLocation = 'monsterRoomWithoutWeapon';
  };

  GameController.prototype.processInput = function() {

    this.model.gamelog.push({
      src: 'user',
      msg: this.model.command
    });

    switch (this.model.command) {

    case '?':
      this.model.gamelog.push({
        src: 'game',
        msg: this.currentHelpMsg()
      });
      break;

    case 'walk left':
      this.model.userLocation = 'weaponRoom';
      this.model.gamelog.push({
        src: 'game',
        msg: this.model.location.weaponRoom.prompt
      });
      break;

    case 'walk right':
      this.model.userLocation = this.model.hasWeapon ? 'monsterRoomWithWeapon' : 'monsterRoomWithoutWeapon';

      var currentRoom = this.model.userLocation;

      this.model.gamelog.push({
        src: 'game',
        msg: this.model.location[currentRoom].prompt
      });
      break;

    case 'take sword':
      this.model.hasWeapon = true;
      this.model.gamelog.push({
        src: 'game',
        msg: 'Sword taken.'
      });
      break;

    case 'look':
      var lookRoom = this.model.userLocation;
      this.model.gamelog.push({
        src: 'game',
        msg: this.model.location[lookRoom].prompt
      });
      break;

    case 'fight monster':
      this.model.gamelog.push({
        src: 'game',
        msg: 'You have slain the monster. Thanks for playing!'
      });
      break;

    default:

      var sayArr = this.model.command.split(' ');
      if(sayArr[0]==='say') {
        this.model.gamelog.push({
          src: 'game',
          msg: sayArr[1] || 'Say something!'
        });
      } else {
        this.model.gamelog.push({
          src: 'game',
          msg: 'Bad Command, enter ? for available commands'
        });
      }
    }
    this.model.command = '';
  };

  GameController.prototype.currentHelpMsg = function() {
    var str ='';

    switch (this.model.userLocation) {

    case 'weaponRoom':
      this.model.location.weaponRoom.commands.forEach(function(item,index) {
        str += index > 0 ? ' | ' : '';
        str += item;
      });
      break;

    case 'monsterRoomWithoutWeapon':
      this.model.location.monsterRoomWithoutWeapon.commands.forEach(function(item,index) {
        str += index > 0 ? ' | ' : '';
        str += item;
      });
      break;

    case 'monsterRoomWithWeapon':
      this.model.location.monsterRoomWithWeapon.commands.forEach(function(item,index) {
        str += index > 0 ? ' | ' : '';
        str += item;
      });
      break;
    }
    return str;
  };
}
