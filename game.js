const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#FFF",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let ground;
let clouds;
function preload() {
    this.load.spritesheet("dino", "assets/dino-idle.png", {frameWidth:88, frameHeight:94});
    this.load.image("ground", "assets/ground.png");
    this.load.image("cloud", "assets/cloud.png");
    for(let i=0; i<7; i++){
        this.load.image(`obstacle${i}`, `assets/cactuses_${i}.png`);
    }}
    
    


function create() {
    this.player = this.physics.add.sprite(200, 100, "dino")
    .setOrigin(0)
    .setCollideWorldBounds(true)
    .setBodySize(44, 92)
    .setGravityY(5000);


    this.ground = this.add.tileSprite(0, 300, 800, 30, "ground").setOrigin(0, 1);

    this.groundCollider = this.physics.add.staticSprite(0, 300, "ground").setOrigin(0, 1);
    this.groundCollider.body.setSize(800, 30).setOffset(0, 0);
    
    this.physics.add.collider(this.player, this.groundCollider);

    this.physics.add.collider(this.obstacles, this.player, gameOver, null, this);

    this.clouds = this.add.group();
    this.clouds = this.clouds.addMultiple(
        [
            this.add.image(200, 100, "cloud"),
            this.add.image(300, 130, "cloud"),
            this.add.image(450, 80, "cloud")
        ]
    );
    this.gameSpeed = 5;
    this.obstacles = this.physics.add.group({
        allowGravity: false
    });
this.timer = 0;

this.cursors = this.input.keyboard.createCursorKeys();

this.isGameRunning = true;
}

function update(time,delta) {

    if(isGameRunning)
    this.timer +=delta;

const {space, up} = this.cursors;

    
if(Phaser.Input.Keyboard.JustDown(space)
    || Phaser.Input.Keyboard.JustDown(up)
&& this.player.body.onFloor()){
    this.player.setVelocityY(-1600); 
}
}

if (this.timer > 1000){
    const obstacleNum = Math.floor(Math.random()*6) +1;
    this.obstacles.create(750, 220, `obstacle${obstacleNum}`).setOrigin(0);
    this.timer = 0;
}

this.ground.tilePositionX += this.gameSpeed;

this.obstacles.getChildren().forEach(obstacle=>{
    obstacle.setVelocityX(-this.gameSpeed*60);

})
   
function gameOver(){
    this.isGameRunning = false;
    this.timer = 0;
    this.
}

    

