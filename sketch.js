 var dog, sittingDog, standingDog ,runningDog, eatingDog
var database
var foodStock, foodS, foodImage, Food
var back
var eatingSound, whiningSound

function preload(){

database = firebase.database()

eatingSound = loadSound("sounds/Chewing-sound-effect.mp3")
whiningSound = loadSound("sounds/Puppy-whining-sound.mp3")

back = loadImage("images/back.png")
foodImage = loadImage("images/food.png")
sittingDog = loadImage("images/dog1.png")
  standingDog = loadImage("images/dog2.png")
  runningDog = loadImage("images/dog4.png")
  eatingDog = loadImage("images/dog3.png")

  foodStock = database.ref('Food')
  foodStock.on("value", readStock)
}

function setup() {
	createCanvas(500, 500);
  
dog = createSprite(400, 400, 50, 50)
dog.addAnimation("dog_sitting", sittingDog)
dog.addAnimation("dog_standing", standingDog)
dog.addAnimation("dog_running", runningDog)
dog.addAnimation("dog_eating", eatingDog)

Food = createSprite(100, 440, 50, 50)
Food.addAnimation("food_kept", foodImage)
Food.scale = 0.2
}


function draw() {  


 
  //add styles here
  background(back)

if (keyDown("up")) {
 
  dog.changeAnimation("dog_standing",standingDog)
  whiningSound.play();
  eatingSound.stop();
}

if (keyDown("left")) {
  
  dog.changeAnimation("dog_running", runningDog)
  dog.x= 200
  eatingSound.stop();
}

if (keyDown("down")) {
  writeStock(foodS)
  dog.changeAnimation("dog_eating", eatingDog)
whiningSound.stop();
  eatingSound.play();
}

if (keyDown("right")) {
 
  dog.changeAnimation("dog_sitting", sittingDog)
whiningSound.stop();
  eatingSound.stop();
}

  dog.display();
  drawSprites();

textSize(20)
fill("white")
stroke("green")
strokeWeight(3)
  text("PRESS THE UP ARROW, THEN THE LEFT!" ,20, 20)
  text("AND FINALLY DOWN TO FEED FLUPPY!", 60, 40)
  text("AFTER HE FINISHES,", 10, 60)
text("PRESS LEFT TO MAKE HIM SIT AGAIN!", 60, 80)
}

function readStock(data) {
  foodS = data.val();

}

function writeStock(x){
  if (x<=0) {
    x=0
  } 
  else {
    x=x-1
  }

database.ref('/').update({
  food:x
})



}
