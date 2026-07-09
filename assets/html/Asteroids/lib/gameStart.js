(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var GameStart = Asteroids.GameStart = function(canvas) {
    this.playedOnce = false;
    this.canvas = canvas;
    this.start();
    $('#game-over').toggle();

  };
  GameStart.prototype.get_topology = function() {
    if(isNaN(this.topology_idx)){
      this.topology_idx=0;
    }
    return [[0,0],[0,1],[1,0],[0,-1],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]][this.topology_idx%9];
  }

  GameStart.prototype.get_topology_name = function() {
    if(isNaN(this.topology_idx)){
      this.topology_idx=0;
    }
    return ["square","cylinder","cylinder","mobius strip","mobius strip","torus","klien bottle","klien bottle","RP2"][this.topology_idx%9];
  }
  GameStart.prototype.start = function() {
    this.keyHandler();

    this.game = new Asteroids.Game(this.canvas, this, {
          topology: this.get_topology(),
        });
    if (!this.playedOnce) {
      this.welcomeLoop();
    }
  };

  GameStart.prototype.endGame = function() {
    this.playedOnce = true;
    setTimeout(function() {
      $('#start').toggle();
      this.start();
    }.bind(this), 3000);
  };

  var listener = new window.keypress.Listener();

  GameStart.prototype.keyHandler = function() {
    listener.simple_combo('enter', function() {
      if (this.playedOnce) {
        this.game.remove();
      }
      window.cancelAnimationFrame(requestId);
      this.removeTitles();
      this.game.start();
      $('#game-over').hide();
      listener.reset();
    }.bind(this));

    kd.T.press(function() {
      if(!this.game.active){
        this.inc_topology(1);
      }
    }.bind(this));
  };

  GameStart.prototype.removeTitles = function() {
    $('#title').hide();
    $('#start').hide();
    $('#instructions').hide();
    $('#credits').hide();
  };

  GameStart.prototype.gameOver = function() {
    this.start();
    $('#game-over').show();
  };

  GameStart.prototype.gameOverText = function() {
    $('#game-over').toggle();
  };

  GameStart.prototype.title = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.font = '32px vector_battleregular';
    ctx.fillStyle = 'white';
    ctx.fillText("ASTEROIDS", 337, 200);
  };

  var requestId;

  GameStart.prototype.welcomeLoop = function() {
    requestId = window.requestAnimationFrame(this.welcomeLoop.bind(this));
    this.game.drawBackground();
    this.game.drawBorder();
    this.game.makeAsteroids(12);
    for (var i = 0; i < this.game.asteroids.length; i++) {
      this.game.asteroids[i].move().render();
    }
  };
  GameStart.prototype.inc_topology = function(i) {
    if(isNaN(this.topology_idx)){
      this.topology_idx=0;
    }
    this.topology_idx+=i;
    this.game.update_topology(this.get_topology());

    console.log(this.get_topology_name());
  };
})();
