'use strict';
const angular = require('angular');

require('angular-mocks');
require('../app/js/client.js');

describe('setup controller tests', ()=> {
  let gamectrl;

  it('should run a test', ()=> {
    expect(true).toBe(true);
  });

  beforeEach(()=> {
    angular.mock.module('textAdventure');
    angular.mock.inject(function($controller){
      gamectrl = new $controller('GameController');
    });
  });

  it('should have a property gamelog', ()=> {
    it('should have a property hasWeapon', ()=> {
      expect(Array.isArray(gamectrl.model.gamelog)).toBe(true);
    });

    expect(gamectrl.model.hasWeapon).toBe(false);
  });

  it('should have a property userLocation', ()=> {
    expect(gamectrl.model.userLocation).toBe('start');
  });

  it('should have an object of locations', ()=> {
    expect(typeof gamectrl.model.location).toBe('object');
  });
});

describe('action controller tests', ()=> {
  let gamectrl;

  beforeEach(()=> {
    angular.mock.module('textAdventure');
    angular.mock.inject(function($controller){
      gamectrl = new $controller('GameController');
    });
  });

  it('should accept inputs', ()=> {
    gamectrl.model.command = 'walk left';
    gamectrl.processInput();
    expect(gamectrl.model.userLocation).toBe('weaponRoom');
  });

  it('should pick up a weapon', ()=> {
    gamectrl.model.command = 'walk left';
    gamectrl.processInput();
    gamectrl.model.command = 'take sword';
    gamectrl.processInput();
    expect(gamectrl.model.hasWeapon).toBe(true);
  });

  it('should process bad input', () => {
    gamectrl.model.command = 'blah blah';
    gamectrl.processInput();
    expect(gamectrl.model.gamelog[1].msg).toBe('Bad Command, enter ? for available commands');
  });

  it('should repeat the room prompt when look is entered', ()=> {
    gamectrl.model.command = 'walk left';
    gamectrl.processInput();
    gamectrl.model.command = 'look';
    gamectrl.processInput();
    expect(gamectrl.model.gamelog[1].msg).toBe('You are in the weapon room. There is a sword on a rack.');
  });

  it('should give the available commands when ? is entered', ()=> {
    gamectrl.model.command = 'walk left';
    gamectrl.processInput();
    gamectrl.model.command = '?';
    gamectrl.processInput();
    expect(gamectrl.model.gamelog[3].msg).toBe('take sword | look | say <message> | walk right');
  });

  it('should defeat the monster when a player fights monster with a weapon', ()=> {
    gamectrl.model.command = 'walk left';
    gamectrl.processInput();
    gamectrl.model.command = 'take sword';
    gamectrl.processInput();
    gamectrl.model.command = 'walk right';
    gamectrl.processInput();
    expect(gamectrl.model.gamelog[5].msg).toBe('You are in a room with a monster. You have a sword in hand.');
  });

  it('should defeat the monster when a player fights monster with a weapon', ()=> {
    gamectrl.model.command = 'walk left';
    gamectrl.processInput();
    gamectrl.model.command = 'take sword';
    gamectrl.processInput();
    gamectrl.model.command = 'walk right';
    gamectrl.processInput();
    gamectrl.model.command = 'fight monster';
    gamectrl.processInput();
    expect(gamectrl.model.gamelog[7].msg).toBe('You have slain the monster. Thanks for playing!');
  });
});
