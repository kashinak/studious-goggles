//declare game variables//
/*free code camp*/
let order = [];//variable to keep track of the order of the lights and how they are going to flash
let playerOrder = []; //order player is pressing the lights in
let flash; //this will be an integer - the number of flashes in the game
let turn; //keep track of what turn we are on
let good; /*is a boolean true/false value - whether the player is doing well or not - if the player has hit all the right colors or has not hit all the right colors*/
let compTurn; /*boolean true/false to keep track of whether it is the computer's turn or the player's turn*/
let intervalId; //will explain later
let noise = true; //if we are playing noise
let on = false; //if the program has been turned on - the power button which begins in off position so false
let win; //This will say whether the player has won the game or not

/*my code*/
let round = 0;
let score = 0;
let highScore = [];
let num = 4;
/*my code*/
const startButton = document.getElementById("start");
/*free code camp*/
const turnCounter = document.querySelector("#turn"); //the digital read out screen for the game
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const onButton = document.querySelector("#on");

/*my code*/
const scoreCounter = document.querySelector("#score");
const highScoreCounter = document.querySelector("#high-score");


  /*my code*/
//upon clicking startButton, game console clears and new game sequence is played//

startButton.addEventListener("click", startGame);

function startGame() {
    startButton.innerHTML = "Start Game!";
    startButton.innerHTML = "";
    // gameSequence();
    play();
}

function play() {
    win = false; //you are starting the game you haven't won yet.
    order = [];//we are going to use a for loop below to randomly fill up this order array
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;//when you press start digital screen will read 1 because you are on first round of the game
    good = true;//means the player has not hit anything incorrect yet
    for (var i = 0; i < 20; i++) { /*fist initialize a variable i=0, we are going to loop while i is less than 20 and at the end of the loop we are going to incremnet i.*/
        //this is how we fill the order array
      order.push(Math.floor(Math.random() * 4) + 1);/*gets random number between 1 and 5 and it is going to be a decimal so Math.floor is going to round it down. If you console.log(order); you can see that the order array fills with 20 random numbers in console*/
    }
    compTurn = true; //game starts with the computer flashing lights and then the player has to match those lights
      
      //then we start the first turn
  
    intervalId = setInterval(gameTurn, 800);/*setInterval means that it is going to run a function after a certain amount of milliseconds. setInterval will run a gameTurn function
      every 800 milliseconds. so a game light will flash every 800 milliseconds and keep repeating until this interval is cleared. The interval will clear after all the lights have flashed. I haven't done that yet.The reason we have an IntervalId is so we can clear the interval. If you turn the power off, clear interval because it will stop simon from running colors and will stop running the gameTurn function every 800 millliseconds. It's the gameTurn function that flashes the colors*/
  }
  
  /*my code*/
//game generates a sequence with a random tile click//
// function gameSequence() {
//     init();
//     let n = Math.floor(Math.random() * num + 1);
//     setTimeout(() => {
//         switch (n) {
//             case 1:
//                 playSound1();
//                 order.push(1); //my code
//                 break;
//             case 2:
//                 playSound2();
//                 order.push(2); //my code
//                 break;
//             case 3:
//                 playSound3();
//                 order.push(3); //my code
//                 break;
//             case 4:
//                 playSound4();
//                 order.push(4);//my code
//                 break;
//             default:
//         }
//     }, 1000);
//     // end();
// }

//end function
// function end() {
//     startButton.style.display = "";
// }

/*now let's define the gameTurn function which cause the game to flash colors. whne the colors are flashing the player is unable to click the butoons so that's wht we set on = false.*/
function gameTurn() {
 on = false; //player cannot click any of the button swhile the game is flashing colors.
 init() 
 if (flash == turn) { /*if the numbers of time the lights have have flashed equals the turn that we are on then that means the computer's turn is over. so if the computer's turn is over, we are going to clear interval*/
   clearInterval(intervalId);
   compTurn = false;
   clearColor();
   on = true; //if on = true that means the player can now start pressing buttons.
 }

 if (compTurn) { /*the thing in the parenthesis is the condition and then you are going to run the thing in the cury brackets*/
   clearColor(); //setTimeout is very similar to setInterval which repeats something over and over, set timeout is going to do something once after a certain number of milliseconds
   setTimeout(() => {
     if (order[flash] == 1) playSound1(); //if condition is true run one function and so on
     if (order[flash] == 2) playSound2();
     if (order[flash] == 3) playSound3();
     if (order[flash] == 4) playSound4();
     flash++; //the computer goes up one flash after every 200 milliseconds
   }, 200);//I changed from 200 to 1500
 }
}


//link game photo tiles with corresponding game sounds and blink capability//
function playSound1() {
    // console.log("Hello!");
    document.getElementById("game-photo-1").style.outline =
        "#ffff00 solid 10px";
    document.getElementById("beluga-sound").play();
    blink("game-photo-1");
}

function playSound2() {
    document.getElementById("game-photo-2").style.outline =
        "#ffff00 solid 10px";
    document.getElementById("orca-sound").play();
    blink("game-photo-2");
}

function playSound3() {
    document.getElementById("game-photo-3").style.outline =
        "#ffff00 solid 10px";
    document.getElementById("rightwhale-sound").play();
    blink("game-photo-3");
}

function playSound4() {
    document.getElementById("game-photo-4").style.outline =
        "#ffff00 solid 10px";
    document.getElementById("spermwhale-sound").play();
    blink("game-photo-4");
}

/*function init() to provide event listeners to make game buttons clickable and to playsound 
and blink when player presses game button*/
function init() {
    document
        .getElementById("game-photo-1")
        .addEventListener("click", playSound1);
    document
        .getElementById("game-photo-2")
        .addEventListener("click", playSound2);
    document
        .getElementById("game-photo-3")
        .addEventListener("click", playSound3);
    document
        .getElementById("game-photo-4")
        .addEventListener("click", playSound4);
}

/*blink function creates yellow outline border appear when player clicks a gameboard button and 
then the border disappears after 1 second*/
function blink(id) {
    var f = document.getElementById(id);
    // setTimeout(function() {
    //    f.style.display = (f.style.display == 'none' ? '' : 'none');
    // }, 500);
    new Promise((resolve, reject) => {
        f.style.outline = "#ffff00 solid 10px";
        setTimeout(() => {
            f.style.outline = "";
            setTimeout(() => {
                resolve();
            }, 250);
        }, 1000);
    });
}

//add playerSequence to convert player game clicks to numbers in sequence array;
// function playerSequence() {
//     let playerClick = $(this).attr("id");
//     switch (playerClick) {
//         case "topleft":
//             playerOrder.push(1);//my code
//             startGame(0);
//             break;
//         case "topright":
//             playerOrder.push(2);//my code
//             startGame(1);
//             break;

//         case "bottomleft":
//             playerOrder.push(3);//my code
//             startGame(2);
//             break;

//         case "bottomright":
//             playerOrder.push(4);//my code
//             startGame(3);
//             break;
//     }
//     playerSequence();
// }

// function compareSequences() {
//     if (playerSequence.indexOf(playerClick) === gameSequence().indexOf(n)) {
//         nextSequence();
//         score = +1;
//         console.log("Excellent!");
//     }
// }

  function clearColor() {
    topLeft.style.outline = "#00ffff"; 
    topRight.style.outline = "#00ffff"; 
    bottomLeft.style.outline = "#00ffff"; 
    bottomRight.style.outline = "#00ffff"; 
  }
  
  function flashColor() {
    topLeft.style.backgroundColor = "#ffff00";
    topRight.style.backgroundColor = "#ffff00";
    bottomLeft.style.backgroundColor = "#ffff00";
    bottomRight.style.backgroundColor = "#ffff00";
  }
  
  //now copy paste above for every corner
  //free code camp
  topLeft.addEventListener('click', (event) => {
      playerOrder.push(1);//playerOrder is an array of the sections that the player has clicked
      check();//a function to check if the player was right
      playSound1();//my code - replaced free code camp's one()//this is the same function the computer called that lights up a color.
      if(!win) { //if the player has not won yet, then we are going to set the timeout
        setTimeout(() => {
          clearColor(); //make sure the color the user clicked is going t oclear after 300 milliseconds
        }, 300);
      }
  });
  topRight.addEventListener('click', (event) => {
      playerOrder.push(2);
      check();
      playSound2();//my code - replaced free code camp's two(); //this is the same function the computer called that lights up a color.
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
  });
  
  bottomLeft.addEventListener('click', (event) => {
      playerOrder.push(3);
      check();
      playSound3();//my code - replaced free code camp's three(); //this is the same function the computer called that lights up a color.
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
  });
  
  bottomRight.addEventListener('click', (event) => {
      playerOrder.push(4);
      check();
      playSound4();//my code - replaced free code camp's four(); //this is the same function the computer called that lights up a color.
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
  })
  

  //the above 4 corner functions all call the check() function which is the more compicated function
function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
      good = false;
  
    if (playerOrder.length == 20 && good) { //condition if player wins the game - you can change 3 to 20 to make the game harder so player wins after 20 rounds
      winGame();
    }
  //condition if player is wrong
    if (good == false) { //if the player got something wrong
      flashColor();
      turnCounter.innerHTML = "NO!";
      setTimeout(() => {
        turnCounter.innerHTML = turn;
        clearColor();
  
        // if (strict) {
          play();//repeating the whole game starting the game over
        // } else { //if we are not in strict mode then we can repeat the round instead of starting over.
        //   compTurn = true;
        //   flash = 0;
        //   playerOrder = [];
        //   good = true;
        //   intervalId = setInterval(gameTurn, 800); //setting setIntrval just like the game function
        // }
      }, 800);
  
      noise = false; //still in the good == false if statement meaning if the player got something wrong then we are not going to play a noise. we only play a noise if the player got the right thing. functions one, two, three, four check if noise=true
        
    }
       //now there is the condition that the player got it wrong and has not won the game yet
  
    if (turn == playerOrder.length && good && !win) {
      turn++;
      playerOrder = [];
      compTurn = true;
      flash = 0;
      turnCounter.innerHTML = turn;
      intervalId = setInterval(gameTurn, 800);
    }
  
  }
  
  //if someone has won the game
  function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false; //user cannot click anything because on = false
    win = true;
  }
  
  
  // JavaScript Document