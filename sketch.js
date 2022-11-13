const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, fruit, ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button, button2, button3;
var bunny;
var blink, eat, sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  starImg = loadImage("star.png")

  emptyStar = loadAnimation("empty.png");
  oneStar = loadAnimation("one_star.png");
  twoStars = loadAnimation("stars.png");


  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup() {
  var mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (mobile) {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth + 80, displayHeight);
  } else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight);

  }

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(180, 90);
  button.size(50, 50);
  button.mouseClicked(drop);

  //btn 2
  button2 = createImg('cut_btn.png');
  button2.position(390, 90);
  button2.size(50, 50);
  button2.mouseClicked(drop2);

  rope = new Rope(7, { x: 200, y: 90 });
  rope2 = new Rope(7, { x: 400, y: 90 });


  mute_btn = createImg('mute.png');
  mute_btn.position(width - 50, 20);
  mute_btn.size(50, 50);
  mute_btn.mouseClicked(mute);

  ground = new Ground(200, canH, canW + 1150, 20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(320, canH - 45, 100, 100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  bunny.changeAnimation('blinking');


  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);
  fruit_con_2 = new Link(rope2, fruit);

  star = createSprite(320, 50, 20, 20);
  star.addImage(starImg);
  star.scale = 0.02;

  star2 = createSprite(50, 370, 20, 20);
  star2.addImage(starImg);
  star2.scale = 0.02;

  stars = createSprite(50, 20, 30, 30);
  stars.scale = 0.2;

  stars.addAnimation("empty", emptyStar);
  stars.addAnimation("onestar", oneStar);
  stars.addAnimation("twostar", twoStars);


  stars.changeAnimation("empty");





  blower = createImg('baloon2.png');
  blower.position(260, 370);
  blower.size(120, 120);
  blower.mouseClicked(blow);



  rectMode(CENTER);
  ellipseMode(RADIUS);
  // imageMode(CENTER);
  textSize(50)

}

function draw() {
  background(50);
  image(bg_img, 0, 0, displayWidth + 100, displayHeight);

  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }


  Engine.update(engine);
  ground.show();
  rope.show();
  rope2.show();
  
  if (collide(fruit, bunny, 80) == true) {
    World.remove(engine.world, fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
  }
  
  
  if (fruit != null && fruit.position.y >= 650) {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit = null;
  }
  if (collide(fruit, star, 20) == true) {
    star.visible = false;
    stars.changeAnimation("onestar")
  }
  
  if (collide(fruit, star2, 20) == true) {
    star2.visible = false;
    stars.changeAnimation("twostar")
    
    
  }
  
  drawSprites();
  
}

function drop() {
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null;
}

function drop2() {
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body, sprite, x) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= x) {
      return true;
    }
    else {
      return false;
    }
  }
}


function mute() {
  if (bk_song.isPlaying()) {
    bk_song.stop();
  }
  else {
    bk_song.play();
  }
}


function blow() {
  Matter.Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0, y: -0.03 });
  air.play();

}

