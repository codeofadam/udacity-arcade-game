// Enemies our player must avoid
'use strict';
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary =  this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If enemy is not passed boundary
    if(this.x < this.boundary) {
        // Move forward
        // Increment x by speed * dt
        this.x += this.speed * dt;
    }
    else {
        // Reset position to start
        this.x = this.resetPos;
    }       
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Hero Class - the player
class Hero  {
    //constructor
    constructor() {
        // hero properties
        this.sprite = 'images/char-boy.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
    }

    //METHODS
    // update position
    update() {
        // check collision here
        for(let enemy of allEnemies) {           
            // did player x and y collide with enemy?
            if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2) ) {
                this.reset();
            }   
        }    
         // check for win
        if(this.y === 55) {
            this.victory = true;
        }           
    }

    // Draw hero sprite on current x and y coord position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * update hero's x and y property according to input
     * 
     * @param  {string} input - Direction to travel
     */
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > this.jump) {
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }
    }
                  
    // reset hero
    reset() {
        // set x and y to starting x and y
        this.y = this.startY;
        this.X = this.startX;
    }        
}   

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Hero();
const bug1 = new Enemy(-101, 0, 150); //create and position first bug    
const bug2 = new Enemy(-101, 83, 250); //create and position bug 2
const bug3 = new Enemy((-101*2.5), 166, 200);//create aand position bug 3
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3);//put bugs into allEnemies array

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});