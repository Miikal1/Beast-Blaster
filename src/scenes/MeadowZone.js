class MeadowZone extends Phaser.Scene {
    constructor() {
        super('meadowZone');
    }

    preload(){

        this.load.image('meadowZone', "assets/meadowZone.png");
        this.load.image('grassyGround', "assets/grassyGround.png");
        this.load.image('wall', "assets/wall.png");
        this.load.image('blaster', "assets/blaster.png");
        this.load.image('bear', "assets/bear.png");
        this.load.image('cat', "assets/cat.png");
        this.load.image('dolphin', "assets/dolphin.png");
        this.load.image('eagle', "assets/eagle.png");
        this.load.image('lion', "assets/lion.png");
        this.load.image('speedUp', "assets/speedUp.png");
        this.load.image('finish', "assets/finish.png");
        this.load.image('replay', "assets/replay.png");

    }    

    create(){

        let width = config.width;
        let height = config.height;
        this.physics.world.gravity.y = 1000;

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.bg = this.add.tileSprite(0,0, game.config.width, game.config.height, 'meadowZone').setOrigin(0,0);

        this.ground = this.physics.add.sprite(800, 830, 'grassyGround');
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;

        this.platforms = this.add.group();
        this.animals = this.add.group();

        this.leftWall = this.physics.add.sprite(-1, 380, 'wall');
        this.leftWall.body.allowGravity = false;
        this.leftWall.body.immovable = true;
        this.platforms.add(this.leftWall);

        this.rightWall = this.physics.add.sprite(3401, 380, 'wall');
        this.rightWall.body.allowGravity = false;
        this.rightWall.body.immovable = true;
        this.platforms.add(this.rightWall);

        /*this.speedUp = this.physics.add.sprite(800, 350, 'speedUp');
        this.speedUp.setAlpha(0);
        this.speedUp.body.allowGravity = false;*/

        this.p1 = this.physics.add.sprite(55, 700, 'blaster');
        this.p1.setCollideWorldBounds(true);
        this.runSpeed = 270;
        this.p1.setScale(2);
        this.p1.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.direction = "right";
        this.one = 1;

                    // b   c    d    e    l
        this.ammo = [true,true,true,true,true];

        this.bearMovement = 0;
        this.catMovement = 0;
        this.dolphinMovement = 0;
        this.eagleMovement = 0;
        this.lionMovement = 0;

        this.launchPoint = 0;
        
        this.physics.add.collider(this.p1, this.ground);
        this.physics.add.collider(this.p1, this.platforms);
        this.physics.add.collider(this.animals, this.ground);

    }

    update(){

        if(this.keyA.isDown) {
            this.p1.setVelocityX(-this.runSpeed);
            this.p1.setFlip(true, false);
            this.direction = "left";
            this.one = -1;
        }
        else if(this.keyD.isDown) {
            this.p1.setVelocityX(this.runSpeed);
            this.p1.resetFlip();
            this.direction = "right";
            this.one = 1;
        }
        else {
            this.p1.setVelocityX(0);
        }

        if(this.p1.body.touching.down && Phaser.Input.Keyboard.JustDown(this.keyW)) {
            this.p1.body.setVelocityY(-500);
        }

        if(Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.launchPoint = this.p1.x;
            this.beast = Math.floor((Math.random() * 5));
            if (this.beast == 0 && this.ammo[0] == true){
                if(this.direction == "right"){
                    this.bear = this.physics.add.sprite(this.p1.x+100, this.p1.y-40, 'bear');  
                }
                else if(this.direction == "left"){
                    this.bear = this.physics.add.sprite(this.p1.x-100, this.p1.y-40, 'bear');
                    this.bear.setFlip(true, false);
                }
                this.bear.setCollideWorldBounds(true);
                this.animals.add(this.bear);
                this.ammo[0] = false;
                this.bear.setVelocityX(this.one*500);
                
            }
            else if (this.beast == 1 && this.ammo[1] == true){
                if(this.direction == "right"){
                    this.cat = this.physics.add.sprite(this.p1.x+50, this.p1.y-30, 'cat');
                }
                else if(this.direction == "left"){
                    this.cat = this.physics.add.sprite(this.p1.x-50, this.p1.y-30, 'cat');
                    this.cat.setFlip(true, false);
                }
                this.cat.setCollideWorldBounds(true);
                this.animals.add(this.cat);
                this.ammo[1] = false;
                this.cat.setVelocityX(this.one*1000);
            }
            else if (this.beast == 2 && this.ammo[2] == true){
                if(this.direction == "right"){
                    this.dolphin = this.physics.add.sprite(this.p1.x+50, this.p1.y-30, 'dolphin');
                }
                else if(this.direction == "left"){
                    this.dolphin = this.physics.add.sprite(this.p1.x-50, this.p1.y-30, 'dolphin');
                    this.dolphin.setFlip(true, false);
                }
                this.dolphin.setCollideWorldBounds(true);
                this.animals.add(this.dolphin);
                this.ammo[2] = false;
                this.dolphin.setVelocityX(this.one*600);
            }
            else if (this.beast == 3 && this.ammo[3] == true){
                if(this.direction == "right"){
                    this.eagle = this.physics.add.sprite(this.p1.x+50, this.p1.y-30, 'eagle');
                }
                else if(this.direction == "left"){
                    this.eagle = this.physics.add.sprite(this.p1.x-50, this.p1.y-30, 'eagle');
                    this.eagle.setFlip(true, false);
                }
                this.eagle.setCollideWorldBounds(true);
                this.animals.add(this.eagle);
                this.ammo[3] = false;
                this.eagle.setVelocityX(this.one*700);
            }
            else if (this.beast == 4 && this.ammo[4] == true){
                if(this.direction == "right"){
                    this.lion = this.physics.add.sprite(this.p1.x+50, this.p1.y-30, 'lion');
                }
                else if(this.direction == "left"){
                    this.lion = this.physics.add.sprite(this.p1.x-50, this.p1.y-30, 'lion');
                    this.lion.setFlip(true, false);
                }this.lion.setCollideWorldBounds(true);
                this.animals.add(this.lion);
                this.ammo[4] = false;
                this.lion.setVelocityX(this.one*500);
            }
            this.type = Math.floor((Math.random() * 3));
            console.log(this.beast);
        }

        if (this.ammo[0] == false){
            if(this.bear.y == 717){
                this.bear.setVelocityX(0);
                if (this.physics.overlap(this.p1, this.bear)){ 
                    this.bear.destroy();
                    this.ammo[0] = true;
                }
            }
        }

        if (this.ammo[1] == false){
            if(this.cat.y == 732.5){
                this.cat.setVelocityX(0);
                if (this.physics.overlap(this.p1, this.cat)){ 
                    this.cat.destroy();
                    this.ammo[1] = true;
                }
            }

        }

        if (this.ammo[2] == false){
            if(this.dolphin.y == 726){
                this.dolphin.setVelocityX(0);
                if (this.physics.overlap(this.p1, this.dolphin)){ 
                    this.dolphin.destroy();
                    this.ammo[2] = true;
                }
            }
        }

        if (this.ammo[3] == false){
            if(this.eagle.y == 735){
                this.eagle.setVelocityX(0);
                if (this.physics.overlap(this.p1, this.eagle)){ 
                    this.eagle.destroy();
                    this.ammo[3] = true;
                }
            }
        }

        if (this.ammo[4] == false){
            if(this.lion.y == 714.5){
                this.lion.setVelocityX(0);
                if (this.physics.overlap(this.p1, this.lion)){ 
                    this.lion.destroy();
                    this.ammo[4] = true;
                }
            }
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyR)) {
            console.log("bear y: " + this.bear.y);
            console.log("cat y: " + this.cat.y);
            console.log("dolphin y: " + this.dolphin.y);
            console.log("eagle y: " + this.eagle.y);
            console.log("lion y: " + this.lion.y);
        }

    }

    checkCollision(a, b) {
        // simple AABB checking
        if ((a.x < b.x + b.width && 
            a.x + a.width > b.x && 
            a.y < b.y + b.height &&
            a.height + a.y > b.y) ) {
                return true;
        } 
        else {
            return false;
        }
    }

    collect(item) {
        this.space = 0;
        while (this.space < 18){
            if (inventory[this.space] == null){
                inventory[this.space] == item;
                break;
            }
            else {
                this.space += 1;
            }
        }
    }

    has(item){
        this.space = 0;
        this.result = false
        while (this.space < inventory.length){
            if (inventory[this.space] == item){
                this.result = true;
                break;
            }
            else {
                this.space += 1;
            }
        }
        return this.result;
    }

    takeOut(item){
        this.space = 0;
        while (this.space < 10){
            if (inventory[this.space] == item){
                inventory[this.space] = null;
                break;
            }
            else {
                this.space += 1;
            }
        }
    }

}