module.exports = function(app) {
  this.controller('GameController', GameController)
};

function GameController() {
  this.model = {
    userLocation = 'start',
    hasWeapon = false,
    command: '',
    gamelog: [],
    location: {
      'start': {
        commands: ['Enter ? for avaliable commands at any time'],
        prompt: 'Welcome to the dungeon, you are in a room with a monster. There is a room to your left.'
      },
      'weapon room': {
        commands:['take sword', 'look', 'say <message>', 'walk right'],
        prompt: 'You are in the weapon room. There is a sword on a rack.'
      },
      'monster room without weapon': {
        commands: ['walk left', 'say <message>'],
        prompt: 'You are in a room with a monster.'
      },
      'monster room with weapon' :{
        commands: ['walk left','say <message>','fight monster'],
        prompt: 'You are in a room with a monster. You have a sword in hand.'
      }
    }
  }
}
