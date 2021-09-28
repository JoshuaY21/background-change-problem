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
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var bg_img2;
var bg_img3;
var food;
var rabbit;

var muteBtn

var button;
var bunny;
var blink,eat,sad;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var wall;

var diffBack1
var diffBack2

var sound = 1;

var blower

function preload()
{
  bg_img = loadImage('background.png');
  bg_img2 = loadImage('bg_plain.png')
  bg_img3 = loadImage("bkg.jpg")
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  bk_song = loadSound("sound1.mp3");
  cut_sound = loadSound("rope_cut.mp3");
  air = loadSound("air.wav");
  sad_sound = loadSound("sad.wav");
  eating_sound = loadSound("eating_sound.mp3")
  
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false;
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  muteBtn = createImg("mute.png")
  muteBtn.position(450,20)
  muteBtn.size(30,30)

  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bk_song.play()
  bk_song.setVolume(0.05)

  bunny = createSprite(400,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20,{restitution: 0.0000000000001});
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  wall = new Ground(500,350,5,700);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);

  blower = createImg("blower.png")
  blower.position(10,250)
  blower.size(150,100)

     
  
}

function draw() 
{
  background(51);

  image(bg_img2,width/2,height/2,490,690);

  //changeBack(1)

  blower.mouseClicked(airBlow)
  muteBtn.mouseClicked(mute)

  

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play()
    bk_song.stop()
  }
   
  if(collide(fruit,ground.body)==true )
  {
    bunny.changeAnimation('crying');
    sad_sound.play()
    bk_song.stop()
   }

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
  cut_sound.play()
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true;
            }
            else{
              return false;
            }
         }
}

function airBlow() {
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.05,y:0})
  air.play()
  air.setVolume(0.1)
}

function mute() {
  

  if(sound === 1) {
    bk_song.setVolume(0)
    sound = 0
  }
  else{
    bk_song.setVolume(0.05)
    sound = 1
  }
}

function changeBack(back) {

  if (back === 1) {
    image(bg_img,width/2,height/2,490,690);
    diffBack1 = createImg("bg_plain.png");
    diffBack1.position(450,100);
    diffBack1.size(50,70);
    diffBack1.mouseClicked(changeBack(2))
    diffBack2 = createImg("bkg.jpg")
    diffBack2.position(450,180);
    diffBack2.size(50,70);
    diffBack2.mouseClicked(changeBack(3))
  }

  if (back === 2) {
    image(bg_img2,width/2,height/2,490,690);
    diffBack1 = createImg("background.png");
    diffBack1.position(450,100);
    diffBack1.size(50,70);
    diffBack1.mouseClicked(changeBack(1))
    diffBack2 = createImg("bkg.jpg")
    diffBack2.position(450,180);
    diffBack2.size(50,70);
    diffBack2.mouseClicked(changeBack(3))
  }

  if (back === 3) {
    image(bg_img3,width/2,height/2,490,690);
    diffBack1 = createImg("bg_plain.png");
    diffBack1.position(450,70);
    diffBack1.size(50,70);
    diffBack1.mouseClicked(changeBack(2))
    diffBack2 = createImg("background.png")
    diffBack2.position(450,120);
    diffBack2.size(50,70);
    diffBack2.mouseClicked(changeBack(1))
  }
}