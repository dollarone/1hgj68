var PlatfomerGame = PlatformerGame || {};

//title screen
PlatformerGame.Game = function(){};

PlatformerGame.Game.prototype = {
    create: function() {

        //  A simple background for our game
//        this.game.add.sprite(0, 0, 'sky');

        this.player1Group = this.game.add.group();
        this.player1Group.enableBody = true;
        this.player2Group = this.game.add.group();
        this.player2Group.enableBody = true;

        this.player1_special = this.player1Group.create(this.game.world.width/6, this.game.world.height-148, 'small_blue_paddle');
        this.player1_special.anchor.setTo(0.5);
        this.player1_special.body.allowGravity = false;
        this.player1_special.body.immovable = true;
        //this.player1_special.body.collideWorldBounds = true;
        this.player1_special.size = "small";

        this.player1_special2 = this.player1Group.create(this.game.world.width/6*5, this.game.world.height-148, 'small_blue_paddle');
        this.player1_special2.size = "small";
        this.player1_special2.anchor.setTo(0.5);
        this.player1_special2.body.allowGravity = false;
        this.player1_special2.body.immovable = true;
        //this.player1_special2.body.collideWorldBounds = true;
        this.player = this.player1Group.create(this.game.world.width/2, this.game.world.height-248, 'middle_blue_paddle');
        this.player.anchor.setTo(0.5);
        this.player.size = "medium";

//        this.game.physics.arcade.enable(this.player);
        this.player.body.allowGravity = false;
        this.player.body.immovable = true;
        //this.player.body.collideWorldBounds = true;


        this.player2 = this.player2Group.create(this.game.world.width/2, 64, 'large_red_paddle');
        this.player2.anchor.setTo(0.5);
        this.player2.body.allowGravity = false;
        this.player2.body.immovable = true;
        //this.player2.body.collideWorldBounds = true;
        this.player2.size = "large";
        this.player2_special = this.player2Group.create(this.game.world.width/6, 148, 'small_red_paddle');
        this.player2_special.anchor.setTo(0.5);
        this.player2_special.body.allowGravity = false;
        this.player2_special.body.immovable = true;
        //this.player2_special.body.collideWorldBounds = true;
        this.player2_special.size = "small";
        this.player = this.player2Group.create(this.game.world.width/6*5, 148, 'small_red_paddle');
        this.player.anchor.setTo(0.5);
        this.player.body.allowGravity = false;
        this.player.body.immovable = true;
        //this.player.body.collideWorldBounds = true;
        this.player.size = "small";
        this.player = this.player2Group.create(this.game.world.width/2, 248, 'middle_red_paddle');
        this.player.anchor.setTo(0.5);
        this.player.body.allowGravity = false;
        this.player.body.immovable = true;
        //this.player.body.collideWorldBounds = true;
        this.player.size = "medium";

        this.player = this.player1Group.create(this.game.world.width/2, this.game.world.height-64, 'large_blue_paddle');
        this.player.anchor.setTo(0.5);
        this.player.size = "large";
        this.player.body.allowGravity = false;
        this.player.body.immovable = true;
        //this.player.body.collideWorldBounds = true;

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player);
        this.player.body.allowGravity = false;
        this.player.body.immovable = true;
        this.player.anchor.setTo(0.5);
        //this.player.body.collideWorldBounds = true;


        this.ball = this.game.add.sprite(this.game.world.width/2, this.game.world.height-32, 'ball');
        this.ball.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.ball);
        //this.ball.body.collideWorldBounds = true;
        //this.game.camera.follow(this.player);

        //  Our two animations, walking left and right.
        //this.player.animations.add('left', [4, 5], 10, true);
        //this.player.animations.add('right', [4, 5], 10, true);

        //  Finally some stars to collect
        this.stars = this.game.add.group();

        //  We will enable physics for any star that is created in this group
        this.stars.enableBody = true;
        this.score = 0;
        this.saveColour = this.game.rnd.integerInRange(0,4);
        this.remains = 0;


        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

        //  Here we'll create 12 of them evenly spaced apart
        for (var j = 0; j <=0; j++) {
            for (var i = 0; i < 0; i++)
            {
                //  Create a star inside of the 'stars' group
                var star = this.stars.create(4+i * 66, 64+(j*34), 'colours');

                //  Let gravity do its thing
                star.body.gravity.y = 0;
                star.frame = this.game.rnd.integerInRange(0, 4);
                if (star.frame === this.saveColour) {
                    this.score++;
                }
                else {
                    this.remains++;
                }
                //  This just gives each star a slightly random bounce value
                //star.body.bounce.y = 0.7 + Math.random() * 0.2;
            }
        }
        this.music = this.game.add.audio('music');
        this.music.loop = true;
        this.timeout = 0;
        this.balltimeout = 0;
        this.dead = false;
//        this.music.play();


        this.COLOURS = ["blue", "red", "green", "yellow", "purple"];

        this.player1_score = 0;
        this.player2_score = 0;
        
        //  The score
        this.scoreText = this.game.add.text(16, 16, 'Score: ' + this.player1_score + " - " + this.player2_score, { fontSize: '32px', fill: '#fff' });
        

        //  Our controls.
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.timer = 0;

        this.showDebug = false; 
        this.startBall(1);
    },

    resetBall: function(winner) {
        if(winner == 1) {
            this.player1_score += 1;
            this.startBall(2);
        }
        else {
            this.player2_score += 1;
            this.startBall(1);
        }
        this.scoreText.text = 'Score: ' + this.player1_score + " - " + this.player2_score;
        
    },

    startBall: function(player) {
        this.ball.x = this.game.width/2;
        this.ball.body.velocity.x = this.game.rnd.integerInRange(-50,50);
        this.ball.body.velocity.y = this.game.rnd.integerInRange(-250,-150);
        if (player == 1) {
            this.ball.y = this.player.y-32;

        }
        else {
            this.ball.y = this.player2.y+32;
            this.ball.body.velocity.y *= -1;
        }
        this.dead = false;

    },
    update: function() {
        this.timer++;
        
        //  Collide the player and the stars with the platforms
//        this.game.physics.arcade.collide(this.player1_special, this.player1_special2);
  //      this.game.physics.arcade.collide(this.player2_special, this.player2Group);
        //this.game.physics.arcade.collide(this.stars, this.blockedLayer);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        //this.game.physics.arcade.overlap(this.ball, this.stars, this.collectStar, null, this);
        this.game.physics.arcade.overlap(this.ball, this.player1Group, this.paddle, null, this);
        this.game.physics.arcade.overlap(this.ball, this.player2Group, this.paddle, null, this);

        //  Reset the players velocity (movement)
        
        this.player1Group.forEach(function(player) {

            player.body.velocity.x = 0;
            
        }, this);

        this.player2Group.forEach(function(player) {

            player.body.velocity.x = 0;
            
        }, this);

/*
        this.player2Group.forEach(function(player) {

            if (this.player2.x < this.ball.x) {
                player.body.velocity.x = 200;
            }
            else {
                player.body.velocity.x = -200;

            }
            if (this.game.rnd.integerInRange(0, 10) == 0) {
                player.body.velocity.x = 0;
            }

            
        }, this);
*/
        if (this.cursors.left.isDown) {
            this.player1Group.forEach(function(player) {

                player.body.velocity.x = -300;
            
            }, this);

        }
        else if (this.cursors.right.isDown) {
            this.player1Group.forEach(function(player) {

                player.body.velocity.x = 300;
            
            }, this);

        }

        if (this.leftKey.isDown) {
            this.player2Group.forEach(function(player) {

                player.body.velocity.x = -300;
            
            }, this);

        }
        else if (this.rightKey.isDown) {
            this.player2Group.forEach(function(player) {

                player.body.velocity.x = 300;
            
            }, this);

        }
        

        if (this.ball.y > this.game.world.height) {
            this.resetBall(2);
        }
        else if (this.ball.y < 0) {
            this.resetBall(1);
        }
        if (this.timeout == 0) {

            if (this.ball.x > (this.game.world.width-8)) {
                this.ball.body.velocity.x *= -1;
                this.timeout = 2;
            }
            else if (this.ball.x < 8) {
                this.ball.body.velocity.x *= -1;
                this.timeout = 2;
            }
        }
        else if (this.timeout > 0) {
            this.timeout--;
        }

        if (this.balltimeout == 1) {
            this.balltimeout--;
            this.startBall();

        }
        else if (this.balltimeout > 1) {
            this.balltimeout--;
        }

        if (this.remains == 0) {
            //this.win();
        }

    },

    win: function() {

        this.scoresText = this.game.add.text(280, 316, 'You win! Score: ' + this.score, { fontSize: '32px', fill: '#000' });
        this.game.paused = true;


    },

    death: function() {
        // -1 life
        // countdown
        //display dETH
        //this.player.x = result[0].x;
        //this.player.y = result[0].y;
        //this.player.frame = 1; 
        if (this.balltimeout == 0 && !this.dead) {
            this.balltimeout = 50;
            this.dead = true;
        }

    },

    paddle : function(ball, player) {
        this.ball.body.velocity.y *= -1;
        if (this.ball.body.velocity.y < 0) {
            this.ball.body.velocity.y -= 10;
        }
        else {
            this.ball.body.velocity.y += 10;   
        }
        if (this.ball.body.velocity.y > 500) {
            this.ball.body.velocity.y = 500;
        }

        if(player.size == "size") {
            this.ball.body.velocity.x = (ball.x - player.x) * 10;
        }
        else if(player.size == "medium") {
            this.ball.body.velocity.x = (ball.x - player.x) * 6;
        }
        else if(player.size == "large") {
            this.ball.body.velocity.x = (ball.x - player.x) * 4;
        }



    },

    collectStar : function(ball, star) {
        if (this.timeout == 0) {
            if (star.alive) {
                if (ball.body.touching.bottom || ball.body.touching.up) {
                    this.ball.body.velocity.y *= -1;
                }
                else {
                    this.ball.body.velocity.x *= -1;
                
                }
               
                this.timeout = 1;
            }
            // Removes the star from the screen
            


            //  Add and update the score
            if (star.frame === this.saveColour) {
                this.score--;
            }
            else {
                this.remains--;
            }
            star.kill();
            
            this.scoreText.text = "Destroy blocks except the " + this.COLOURS[this.saveColour] + ' ones.   Score: ' + this.score;
        }
    },


    render: function() {

        if (this.showDebug) {
            
            this.game.debug.body(this.player);
        }
    },

};