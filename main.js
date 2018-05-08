6// Stewart Axup
//  4/18/2018

var game = new Phaser.Game(800, 600, Phaser.AUTO);

// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {

	},
	create: function() {


	},
	update: function() {

	}
}

var GamePlay = function(game) {};
GamePlay.prototype = {
	var platforms;
	var score = 0;
	var scoreText;
	var gorund;
	function preload() {
    // preload assets
    game.load.audio('theme','assets/audio/actiongametheme.mp3')
    game.load.audio('jump', 'assets/audio/SFX_Jump_07.mp3')
    game.load.image('sky', 'assets/img/sky3.png');
    game.load.image('ground', 'assets/img/ground.png');
    game.load.image('platform', 'assets/img/platform.png');
    game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
    game.load.image('block','assets/img/block.png')
    cursors = game.input.keyboard.createCursorKeys();
}
create: function() {
    //jump sfx
	jsfx=game.add.audio('jump');
    //play audio loop
    bgm = game.add.audio('theme');
    bgm.play('',0,1,true);
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    background =game.add.tileSprite(0, 0,800,600,'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    ground = platforms.create(0, game.world.height - 12, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(1000, 1);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  ledges movabel with cursor
    ledge1 = platforms.create(400, 400, 'platform');
    

    ledge1.body.immovable = true;

    ledge1.inputEnabled = true;
    ledge1.input.enableDrag();
    //ledge
    ledge = platforms.create(-150, 250, 'platform');
    ledge.inputEnabled = true;
    ledge.input.enableDrag();
    ledge.body.immovable = true;
    //ledge2
    ledge2 = platforms.create(0, 450, 'platform');
    ledge2.inputEnabled = true;
    ledge2.input.enableDrag();
    ledge2.body.immovable = true;
    //ledge3
    ledge3 = platforms.create(300, 500, 'platform');
    ledge3.inputEnabled = true;
    ledge3.input.enableDrag();
    ledge3.body.immovable = true;


    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 410;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //creat score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });


},
update: function() {
		 // run game loop
    //roll the bnackground
    background.tilePosition.x -=2;
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    //makes ledge1 scroll
    ledge1.body.velocity.x=-150;
    //respawns ledge
    if(ledge1.x<-500){
    	ledge1.y=Math.random()*600;
    	ledge1.x=800;
    }
    ledge2.body.velocity.x=-150;
    //respawns ledge
    if(ledge2.x<-500){
    	ledge2.y=Math.random()*600;
    	ledge2.x=800;
    }
    ledge3.body.velocity.x=-150;
    //respawns ledge
    if(ledge3.x<-500){
    	ledge3.y=Math.random()*600;
    	ledge3.x=800;
    }
    ledge.body.velocity.x=-150;
    //respawns ledge
    if(ledge.x<-500){
    	ledge.y=Math.random()*600;
    	ledge.x=800;
    }
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
    	player.body.velocity.y = -350;
    	jsfx.play('',0,1,false);
    }
    score += 1;
    scoreText.text = 'Score: ' + score;
    if(player.body.touching.down=true){
    	game.state.start('MainMenu');
    }


},
}

// add states to StateManager and start MainMenu
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.start('MainMenu');
