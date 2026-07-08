(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(canvas,topology) {
    this.hide = false;
    this.invulnerable = false;
    this.canFire = true;
    this.canvas = canvas;
    this.velocity = [0, 0];
    this.position = [512, 384];
    this.x_bounds = [-28, 1026];
    this.y_bounds = [-28, 770];
    this.pointingAt = [0, -1];
    this.rotation = 90 * Math.PI / 180;
    this.bullets = [];
    this.shipImg = new Image();
    this.shipImg.src = 'vendor/ship.png';
    this.shipinvImg = new Image();
    this.shipinvImg.src = 'vendor/ship_inv.png';

    this.topology = topology;
    this.inverted = false;
    this.speed_cap=20;
  };

  Ship.prototype.fireBullet = function() {
    if (this.canFire) {
      this.bullets.push(new Asteroids.Bullet(this.position,
        this.pointingAt, this.canvas, this.velocity));
    }
  };

  Ship.prototype.move = function() {

    for (var i = 0; i < 2; i++) {
      this.position[i] += this.velocity[i];
    }

    for (var dim=0; dim < 2; dim++){
      var other_dim = 1-dim;
      var bounds = [this.x_bounds, this.y_bounds][dim]
      var other_bounds = [this.x_bounds, this.y_bounds][other_dim]

      if(this.topology[dim]==1 || this.topology[dim]==-1){
        var trans = false;
        if (this.position[dim] < bounds[0] && this.velocity[dim] < 0) {
          this.position[dim] = bounds[1];
          trans = true;
        }  else if (this.position[dim] > bounds[1] && this.velocity[dim] > 0) {
          this.position[dim] = bounds[0];
          trans = true;
        }
        if (trans && this.topology[dim]==-1){
          this.inverted=!this.inverted;
          this.position[other_dim] = other_bounds[1]-(this.position[other_dim]-other_bounds[0]);
          this.velocity[other_dim] = -this.velocity[other_dim];
        }
      } else {
        // topology[1] is 0, we simply rebound
        if ((this.position[dim] < bounds[0] && this.velocity[dim] < 0) ||
            this.position[dim] > bounds[1] && this.velocity[dim] > 0
            ){
          this.velocity[dim]= -this.velocity[dim];
        }
      }
    }

    return this;
  };

  Ship.prototype.moveBullets = function() {
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move();
    }

    return this;
  };

  Ship.prototype.newPointingAt = function() {
    this.pointingAt[1] = Math.sin(this.rotation) * -1;
    this.pointingAt[0] = Math.cos(this.rotation);
  };

  Ship.prototype.render = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.save();
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate(this.rotation * -1);
    if (this.invulnerable){
      ctx.drawImage(this.shipinvImg, -16, -16, 44, 32);
    }
    else {
      ctx.drawImage(this.shipImg, -16, -16, 44, 32);
    }
    ctx.restore();
  };

  Ship.prototype.rotateLeft = function() {
    if (this.inverted){
      this.rotation -= 7 * Math.PI / 180;
    }
    else{
      this.rotation += 7 * Math.PI / 180;
    }

    if (this.rotation > 360 * Math.PI / 180) {
      this.rotation -= 360 * Math.PI / 180;
    }

    this.newPointingAt();
  };

  Ship.prototype.rotateRight = function() {
    if (this.inverted){
      this.rotation += 7 * Math.PI / 180;
    }
    else{
      this.rotation -= 7 * Math.PI / 180;
    }

    if (this.rotation < 0) {
      this.rotation += 360 * Math.PI / 180;
    }

    this.newPointingAt();
  };

  Ship.prototype.renderBullets = function() {
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].render();
    }

    return this;
  };

  Ship.prototype.resetShip = function() {
    this.invulnerable = true;
   /* var resetting = setInterval(function() {
      if (this.hide === false) {
        this.hide = true;
      } else {
        this.hide = false;
      }
    }.bind(this), 200);*/

    setTimeout(function() {
      //clearInterval(resetting);
      this.invulnerable = false;
      this.hide = false;
    }.bind(this), 2000);

    this.position = [512, 384];
    this.pointingAt = [0, -1];
    this.rotation = 90 * Math.PI / 180;
    this.velocity = [0, 0];
    this.inverted=false;
  };

  Ship.prototype.showLives = function(posX, posY) {
    var ctx = this.canvas.getContext('2d');
    ctx.drawImage(this.shipImgLife, posX, posY);
  };

  Ship.prototype.thrust = function() {

    for (var i = 0; i < 2; i++) {
      this.velocity[i] += this.pointingAt[i] * 0.12;
      if (Math.abs(this.velocity[i]) > this.speed_cap) {
        if (this.velocity[i] > 0) {
          this.velocity[i] = this.speed_cap;
        } else {
          this.velocity[i] = -this.speed_cap;
        }
      }
    }
  };
  Ship.prototype.brake = function() {
    var speed = Math.sqrt(Math.pow(this.velocity[0],2)+Math.pow(this.velocity[1],2));
    if (speed<0.12){
      this.velocity=[0,0]
    } else if(speed>0){
    var unit_vel = [this.velocity[0]/speed, this.velocity[1]/speed];
    for (var i = 0; i < 2; i++) {
        this.velocity[i] -= unit_vel[i] * 0.12;
      }
    }
  };
})();
