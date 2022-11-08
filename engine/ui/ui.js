class UI {

  face_sprites = {};

  faces_middle = [];
  faces_left = [];
  faces_right = [];
  state;
  helm;
  ui_display;
  currframe;

  preload() {

    this.ui_banner = loadImage('engine/ui/banner.png');
    this.hud = loadImage('engine/ui/hud.png');
    this.helmet = loadImage('engine/ui/helmet.gif');

    this.faces_middle[0] = loadImage('engine/ui/skull.png');
    this.faces_middle[1] = loadImage('engine/ui/faces_middle/chad_middle_severe.png');
    this.faces_middle[2] = loadImage('engine/ui/faces_middle/chad_middle_high.png');
    this.faces_middle[3] = loadImage('engine/ui/faces_middle/chad_middle_mid.png')
    this.faces_middle[4] = loadImage('engine/ui/faces_middle/chad_middle_low.png');
    this.faces_middle[5] = loadImage('engine/ui/faces_middle/chad_middle_healthy.png');

    this.faces_right[0] = loadImage('engine/ui/skull.png');
    this.faces_right[1] = loadImage('engine/ui/faces_right/chad_right_severe.png');
    this.faces_right[2] = loadImage('engine/ui/faces_right/chad_right_high.png');
    this.faces_right[3] = loadImage('engine/ui/faces_right/chad_right_mid.png');
    this.faces_right[4] = loadImage('engine/ui/faces_right/chad_right_low.png');
    this.faces_right[5] = loadImage('engine/ui/faces_right/chad_right_healthy.png');

    this.faces_left[0] = loadImage('engine/ui/skull.png');
    this.faces_left[1] = loadImage('engine/ui/faces_left/chad_left_severe.png');
    this.faces_left[2] = loadImage('engine/ui/faces_left/chad_left_high.png');
    this.faces_left[3] = loadImage('engine/ui/faces_left/chad_left_mid.png');
    this.faces_left[4] = loadImage('engine/ui/faces_left/chad_left_low.png');
    this.faces_left[5] = loadImage('engine/ui/faces_left/chad_left_healthy.png');
  }


  setup() {
    noSmooth();
    console.log(this.helmet.numFrames);
    this.doom_font = loadFont('fonts/game_over.ttf');
    this.doom_font2 = loadFont('fonts/doom2.ttf');
    textFont(this.doom_font);
    console.log(this.faces_middle);
    this.ui_banner.resize(SCREEN_WIDTH, SCREEN_HEIGHT/ 10);
    //this.chad_anim.resize(100, 100);
    //this.chad.resize(100, 100);
    this.helm = true;
    this.ui_display = false;
  }

  draw(world_data) {

    /* Or like this to avoid executing the ui code multiple times:
    
      let player_pos;
      let player_health;

      for (let player of world_data.players) {
        player_pos = player.pos;
        player_health = player.health;
      }sa


    */

    fill(255);
    textSize(60);
    if (frameCount % 30 == 0)
      this.framerate = Math.floor(frameRate());
    text(`FPS: ${this.framerate}`, 10, 30);
    text(`(${floor(world_data.players[0].pos.x)}, ${floor(world_data.players[0].pos.y)})`, 10, 55);
    text(`(${floor(world_data.players[0].vel.x)}, ${floor(world_data.players[0].vel.y)})`, 10, 80);

    if(this.helm == true){
      image(this.helmet,0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
      this.currframe = this.helmet.getCurrentFrame();

      if(this.currframe == 19){
        this.helm = false;
        this.ui_display = true;
      }

    }

    if(this.ui_display == true) {
      //image(this.ui_banner, SCREEN_WIDTH - this.ui_banner.width, SCREEN_HEIGHT - this.ui_banner.height);
      image(this.hud,0,0, SCREEN_WIDTH, SCREEN_HEIGHT);
      this.draw_stat_ui(world_data);
      this.draw_face_state(world_data);
    }
    //this.helmet.pause();
    //this.helmet.getCurrentFrame();
    //noStroke();
   
    //this.getFrame();
  }

  draw_stat_ui() {
    fill(250, 150, 150);
    textSize(130);
    for(let player of world_data.players) {
      fill(250, 150, 150);
      text(floor(player.health), 175 * (SCREEN_WIDTH / 1000), 855);
      fill(150, 150, 250);
      text(floor(player.armor), 175 * (SCREEN_WIDTH / 1000), 925);
      fill(150, 250, 150);
      text(floor(player.stamina), 750 * (SCREEN_WIDTH / 1000), 915);
    }
  }

  draw_face_state(world_data) {
    for (let player of world_data.players) {
      this.state = ceil(player.health/20);
      if (keyIsDown(keycodes.LEFT)) {
        image(this.faces_left[floor(player.health/20)], SCREEN_WIDTH/2.17, 
                                                        SCREEN_HEIGHT - this.ui_banner.height);  
      }
      else if (keyIsDown(keycodes.RIGHT)) {
        image(this.faces_right[floor(player.health/20)], SCREEN_WIDTH/2.17, 
                                                         SCREEN_HEIGHT - this.ui_banner.height);
      }
      else {
        image(this.faces_middle[floor(player.health/20)], SCREEN_WIDTH/2.17, 
                                                          SCREEN_HEIGHT - this.ui_banner.height);
      }
    }
  }
}
