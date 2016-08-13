var PlatformerGame = PlatformerGame || {};

//loading the game assets
PlatformerGame.Preload = function(){};

PlatformerGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.spritesheet('logo-tiles', 'assets/images/logo-tiles.png', 17, 16);
    this.game.load.spritesheet('colours', 'assets/images/colours.png', 64, 32);
    
    this.game.load.image('sky', 'assets/images/sky_new.png');
    this.game.load.image('ball', 'assets/images/ball.png');
    this.game.load.image('small_red_paddle', 'assets/images/small_red_paddle.png');
    this.game.load.image('middle_red_paddle', 'assets/images/middle_red_paddle.png');
    this.game.load.image('large_red_paddle', 'assets/images/large_red_paddle.png');
    this.game.load.image('small_blue_paddle', 'assets/images/small_blue_paddle.png');
    this.game.load.image('middle_blue_paddle', 'assets/images/middle_blue_paddle.png');
    this.game.load.image('large_blue_paddle', 'assets/images/large_blue_paddle.png');

    this.game.load.audio('music', 'assets/audio/music.ogg');

  },
  create: function() {
    this.state.start('Logo');
  }
};
