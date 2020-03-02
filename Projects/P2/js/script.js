"use strict";

/*****************

R.K.B.V.G. (Random Keywords Based Video Generator)
Yichen Wang

In the near future (retro), Random Keywords Based Video Generator is the new way to produce videos on the Internet.
It is the most advanced AI-HUMAN intergated system. By randomly generating keywords, the system will
create a prfessional video using unique, commercial-use resources.

It is widely used by all of the amateur and professional video makers around the globe. The pricing for
this service is also really reasonable for anyone who wants to make videos for a living.

So what are you waiting for? Come and get the R.K.B.V.G. software right now and start making some videos!
******************/

// colors
const RED = "#ff6464";
const ORANGE = "#ffaf4b";
const YELLOW = "#ffe600";
const GREEN = "#33de7a";
const BLUE = "#4bafff";
const PURPLE = "#af4bff";

// for calculating user rank
const MOST_VIEWS = 3000000; // 3M (just a number)
const ACTIVE_USERS = 1000001; // 1M (just a number)

// costs
const COST_CARD = 10; // swap one card
const COST_ALL_CARDS = 50; // swap all cards
const COST_MONTHLY = 500; // subscription
const COST_FINE = 100; // fine

const FRAMES_PER_DAY = 120; // framecounts for one day

// tutorial page 1
const INTRO = "If this is your first time using this system, please read the instruction." +
  "\n\n1) R.K.B.V.G. is the new way to make an online video. By choosing" +
  "\nany 5 keywords provided, you can ask the advanced A.I. to generate" +
  "\na professional video for you based on those random keywords" +
  "\nusing unique, commercial-use resources." +
  "\n\n2) Keywords are provided as cards because it is fun. You will" +
  "\nget free 5 keyword cards for each video making session, but any" +
  "\nadditional cards will be charged. You also will get some free special" +
  "\ncards because we give our royal users a lot of benefits." +
  "\n\n3) You will have to play around the system to fully grasp the" +
  "\ntrick of how it works. So good luck!" +
  "\n\n4) And be sure not to violate the Online Content Policy, and" +
  "\nany of those violations will have consequences. But do not" +
  "\nworry. We will provide guidance throughout your whole video" +
  "\nproduction adventure." +
  "\n\n5) R.K.B.V.G. is a subscription service which is charged $" + COST_MONTHLY + "/month." +
  "\nMake sure that you have enough money in your account before" +
  "\nthe next billing cycle.";
// tutorial page 2
const OTHER_INFO = "1) Each video is composed of 5 keywords. The video's value and" +
  "\nthe risk of violating the Online Content Policy will be estimated" +
  "\nbased on these keywords." +
  "\n\n2) You will have 5 keyword cards each time. Select one and press SPACE" +
  "\nwill swap the card, which will give you a new card." +
  "\nHowever, it will cost $10." +
  "\n\n3) You can also use the SWAP ALL button to swap all the cards," +
  "\nwhich will cost $50." +
  "\n\n4) After you gather your desire keywords, press the ACCEPT button" +
  "\nto generate and upload the video." +
  "\n\nVideo's VALUE: decides how many views and fans you will get" +
  "\n\nVideo's RISK LEVEL: decides your rating and the chance of you" +
  "\ngetting a violation (3 violations MAX)" +
  "\n\nWEEKLY INCOME: depends on the total views from the past week" +
  "\nand your rating" +
  "\n\nHISTORY: where you can see all your uploaded videos";
let tutorialIndex = 0; // current tutorial page index

// messages in the ending
const MESSAGE_TO_USER = [
  "we found that your account did not have sufficient fund for this" +
  "\nmonth's charge. We believe there must be some reason of why you" +
  "\ndid not hold sufficient fund in your account. Unfortunately, we" +
  "\ndo not tolerate such discreditability due to company policy." +
  "\n\nTherefore, you must agree on these terms:" +
  "\n\n1) Your account will be terminated. This includes the erasement" +
  "\nof the record of your views, fans, rating, and videos." +
  "\n\n2) You shall not sue Good Media Inc. or we will sue you." +
  "\n\n3) Click the \"I AGREE\" button." +
  "\n\nIt has been a pleasure working with you. We look forward to seeing you" +
  "\nagain in the futrue." +
  "\n\n\n\nGood Media Inc.",
  "your account reached the maximum violations (3), which" +
  "\nindicated that some of your videos failed to satisfy the terms" +
  "\nof the Online Content Policy. We ask our users to create a healthy," +
  "\nkid-friendly online environment, and it is your responsibility to comply" +
  "\nthe Online Content Policy." +
  "\n\nTherefore, you must agree on these terms:" +
  "\n\n1) Your account will be terminated. This includes the erasement" +
  "\nof the record of your views, fans, rating, and videos." +
  "\n\n2) You shall not sue Good Media Inc. or we will sue you." +
  "\n\n3) Click the \"I AGREE\" button." +
  "\n\nIt has been a pleasure working with you. We look forward to seeing you" +
  "\nagain in the futrue." +
  "\n\n\n\nGood Media Inc."
]
let endingId = 0; // decide ending

// const lines for the voice to speak
const voice = [
  "Weclome user. R.K.B.V.G. is now booted. Please read the instruction if this is your first time using the system.",
  "You can learn how to make a video in this page. For more clarity, please proceed to the next interface.",
  "All cards swap completed.",
  "Card swap completed.",
  "History loaded.",
  "Video generating.",
  "Video uploaded.",
  "You've received one message."
];

let time = ""; // time to display in the status bar
// current month week day
let monthNum = 3;
let weekNum = 1;
let dayNum = 1;

// determine current display content
let State = "START";

// focus attributes
// position
let focusPosX = 0;
let focusPosY = 0;
// size
let focusWidth = 0;
let focusHeight = 0;
// index
let focusXAxis = 0;
let focusYAxis = 0;

// keyword cards
let card;
let card1;
let card2;
let card3;
let card4;
let cards = []; // array for keyword cards
let cardIndex = 0; // remember the current index of card
let noCardsAvailable = false; // if there's no cards in the interface

let phraseFormat; // keyword phrase format

// ui elements
let note;
let stats;
let videoInterface;
let history;

let startProgressBar; // progress bar in the start screen

let money = 1000; // money in user account
let fundDepleted = false; // if money is <= 0

let keywords; // keywords phrase

let totalValue = 0; // total value of keywords
let pastTotalViews = 0; //
let pastRating = 100; // last week rating
let weeklyIncome = 0; // income from the weekly views

let displayMessage = false; // display the message each week
let weekChange = false; // if the week changes
let monthChange = false; // if the month changes

let removedVideoNum = 0; // num of removed red videos

// JSON files
var nounsJSON;
var verbsJSON;
var adjsJSON;

// custom font
// https://webfonts.ffonts.net/04b03.font.download
let myFont;

// preload()
//
// load resources
function preload() {
  // font
  myFont = loadFont("assets/webfonts_04b03/04b03.ttf.woff");
  // JSON
  nounsJSON = loadJSON("assets/Nouns.json");
  verbsJSON = loadJSON("assets/Verbs.json");
  adjsJSON = loadJSON("assets/Adjectives.json");
}

// setup()
//
// set up the game
function setup() {
  // theme
  createCanvas(windowHeight, windowHeight);
  background(0);
  noStroke();
  textFont(myFont);
  textSize(32);
  textAlign(CENTER, CENTER);

  // set up focus and cards
  setupFocus();
  setupCards();

  // set up ui element objects
  note = new Notification(0, 1);
  stats = new Stats();
  videoInterface = new Interface();
  history = new History();

  // start screen progress bar
  startProgressBar = new ProgressBar(width / 2, height / 2 + height / 8, RED);
  startProgressBar.start = true;
}

// setupFocus()
//
// set initial position and size to the focus
function setupFocus() {
  focusPosX = width / 2;
  focusPosY = height / 2 + height / 8;
  focusWidth = width / 4;
  focusHeight = height / 12;
}

// setupCards()
//
// prepare card objects for game
function setupCards() {
  // create card objects
  card = new Card(0);
  card1 = new Card(1);
  card2 = new Card(2);
  card3 = new Card(3);
  card4 = new Card(4);
  // put them in the array
  cards.push(card);
  cards.push(card1);
  cards.push(card2);
  cards.push(card3);
  cards.push(card4);
  // give all cards keywords
  randomizeCards();
}

// randomizeACard(id)
//
// randomize a card by its index
function randomizeACard(id) {
  // temp variables
  let word;
  let colorId;
  let value;
  // if it needs to be an adj
  if (phraseFormat[id] === "a") {
    let randomIndex = int(random(0, adjsJSON.adjs.length)); // random index
    // get the word using the index
    word = adjsJSON.adjs[randomIndex].word;
    colorId = adjsJSON.adjs[randomIndex].colorId;
    value = adjsJSON.adjs[randomIndex].value;
    cards[id].setCardAttributes(word, colorId, value); // set the word to the card
    // if it needs to be a noun
  } else if (phraseFormat[id] === "n") {
    let randomIndex = int(random(0, nounsJSON.nouns.length));
    word = nounsJSON.nouns[randomIndex].word;
    colorId = int(nounsJSON.nouns[randomIndex].colorId);
    value = int(nounsJSON.nouns[randomIndex].value);
    cards[id].setCardAttributes(word, colorId, value);
    // if it needs to be a verb
  } else if (phraseFormat[id] === "v") {
    let randomIndex = int(random(0, verbsJSON.verbs.length));
    word = verbsJSON.verbs[randomIndex].word;
    colorId = int(verbsJSON.verbs[randomIndex].colorId);
    value = int(verbsJSON.verbs[randomIndex].value);
    cards[id].setCardAttributes(word, colorId, value);
  }
  let p = random(0, 1); // random 0 - 1
  // 10% chance
  if (p >= 0.9) {
    cards[id].setSpecial(); // set this a special card
  }
}

// randomizeCards()
//
// randomize all the cards
function randomizeCards() {
  // randomize the format
  randomizeFormat();
  // 10% chance to have a special card in a random index
  let p = random(0, 1);
  let randomCard = -1;
  if (p >= 0.9) {
    randomCard = int(random(0, 5));
  }
  // read the JSON to set words to all the cards
  for (let i = 0; i < cards.length; i++) {
    let word;
    let colorId;
    let value;
    if (phraseFormat[i] === "a") {
      let randomIndex = int(random(0, adjsJSON.adjs.length));
      word = adjsJSON.adjs[randomIndex].word;
      colorId = adjsJSON.adjs[randomIndex].colorId;
      value = adjsJSON.adjs[randomIndex].value;
      cards[i].setCardAttributes(word, colorId, value);
    } else if (phraseFormat[i] === "n") {
      let randomIndex = int(random(0, nounsJSON.nouns.length));
      word = nounsJSON.nouns[randomIndex].word;
      colorId = int(nounsJSON.nouns[randomIndex].colorId);
      value = int(nounsJSON.nouns[randomIndex].value);
      cards[i].setCardAttributes(word, colorId, value);
    } else if (phraseFormat[i] === "v") {
      let randomIndex = int(random(0, verbsJSON.verbs.length));
      word = verbsJSON.verbs[randomIndex].word;
      colorId = int(verbsJSON.verbs[randomIndex].colorId);
      value = int(verbsJSON.verbs[randomIndex].value);
      cards[i].setCardAttributes(word, colorId, value);
    }
  }
  // set up the special card
  if (randomCard >= 0) {
    cards[randomCard].setSpecial();
  }
}

// randomizeFormat(
//
// randomize keyword phrase format
function randomizeFormat() {
  let p = random(0, 1);
  // 30% chance
  if (p >= 0 && p < 0.3) {
    phraseFormat = ["n", "v", "a", "a", "n"]; // noun verb adj adj noun
  } else if (p >= 0.3 && p < 0.6) {
    phraseFormat = ["a", "n", "v", "a", "n"]; // adj noun verb adj noun
    // 40% chance
  } else if (p >= 0.6 && p < 1) {
    phraseFormat = ["a", "a", "n", "v", "n"]; // adj adj noun verb noun
  }
}

// draw()
//
// display everything
function draw() {
  // start screen
  if (State === "START") {
    startScreen();
    // tutorial
  } else if (State === "TUTORIAL") {
    displayTutorial();
    displayFocus();
    // gameplay
  } else if (State === "PLAY") {
    displayStaticUI();
    displayDynamicUI();
    displayFocus();
    // if player has 3 violations
    if (videoInterface.violations >= 3) {
      // display notification and decide ending
      note.setMessageType(2, -1);
      State = "NOTE";
      changeFocus(note.buttonX, note.buttonY, 1);
      endingId = 1;
      // if player doesn't have money for the monthly fee
    } else if (fundDepleted) {
      note.setMessageType(2, -1);
      State = "NOTE";
      changeFocus(note.buttonX, note.buttonY, 1);
      endingId = 0;
    }
    // notification
  } else if (State === "NOTE") {
    // display game interface under the notification
    displayStaticUI();
    displayDynamicUI();
    note.display();
    displayFocus();
    // history
  } else if (State === "HISTORY") {
    history.display();
    displayFocus();
    // end screen
  } else if (State === "END") {
    endScreen();
    displayFocus();
  }
  displayStatusBar();
}

// startScreen()
//
// display content for the start screen
function startScreen() {
  push();
  // BG
  rectMode(CENTER);
  fill("#262626");
  rect(width / 2, height / 2, height, height);

  // title
  fill(RED);
  textSize(64);
  text("R.K.B.V.G.", width / 2, height / 2 - 48);
  fill(255);
  textSize(16);
  text("Random Keywords Based Video Generator", width / 2, height / 2);

  startProgressBar.display(); // progress bar
  // display the RUN button after the progress is completed
  if (startProgressBar.done) {
    fill(255);
    rect(width / 2, height / 2 + height / 8, width / 4, height / 12);
    fill(0);
    textSize(32);
    text("RUN", width / 2, height / 2 + height / 8);
    displayFocus();
  }

  // other small texts
  fill(255);
  textSize(16);
  text("* a keyboard only navigation system *", width / 2, height / 2 + height / 4);
  text("version 2.0.2", width / 2, height / 2 - height / 4);
  fill(ORANGE);
  text("DEVELOPED BY GOOD MEDIA INC.", width / 2, height / 2 - height / 4 - 24);
  // user input
  fill(GREEN);
  text("left - up - right - down - space", width / 2, height / 2 + height / 4 + 24);
  pop();
}

// displayStatusBar()
//
// display status bar on the top
function displayStatusBar() {
  push();
  // the bar (BG)
  rectMode(CORNER);
  textSize(32);
  fill(255);
  rect(0, 0, width, height / 20);
  fill(0);
  // info
  textAlign(LEFT, CENTER);
  text("@GM", 48, height / 48);
  textAlign(RIGHT, CENTER);
  time = "";
  // convert month into string
  if (monthNum === 1) {
    time += "JAN";
  } else if (monthNum === 2) {
    time += "FEB";
  } else if (monthNum === 3) {
    time += "MAR";
  } else if (monthNum === 4) {
    time += "APR";
  } else if (monthNum === 5) {
    time += "MAY";
  } else if (monthNum === 6) {
    time += "JUN";
  } else if (monthNum === 7) {
    time += "JUL";
  } else if (monthNum === 8) {
    time += "AUG";
  } else if (monthNum === 9) {
    time += "SEP";
  } else if (monthNum === 10) {
    time += "OCT";
  } else if (monthNum === 11) {
    time += "NOV";
  } else if (monthNum === 12) {
    time += "DEC";
  }
  // add week and day to the time
  time += " W" + weekNum + " D" + dayNum;
  text(time, width - 48, height / 48);
  pop();

  // keep the time flowing only it's in gameplay state
  if (State === "PLAY") {
    runTime();
  }
}

// runTime()
//
// run the time in the game
function runTime() {
  let time = frameCount; // set current framecount
  // every 120 frames, it's one day
  if (time % FRAMES_PER_DAY === 0 && time != 0) {
    dayNum++;
    // if it's day 4, clear the in-game message
    if (dayNum === 4) {
      weekChange = false;
      monthChange = false;
      displayMessage = false;
      pastRating = stats.rating;
    }
  }
  // if end of week
  if (dayNum > 7) {
    displayMessage = true; // display in-game message
    weekChange = true;
    weekNum++; // next week
    dayNum = 1; // reset day
    // calculate income using last week views and rating
    let thisWeekViews = stats.views - pastTotalViews;
    weeklyIncome = int((thisWeekViews / 50) * (stats.rating / 100));
    money += weeklyIncome; // add income
    pastTotalViews = stats.views; // upload total views

    // if week 4
    if (weekNum === 4) {
      // possibility
      let p = random(0, 1);
      // 50% chance will have a video inspection
      if (p > 0.5) {
        systemSpeaks(7);
        p = random(0, 1);
        let msgId = -1;
        // 50/50 for a standard or deep inspection
        if (p > 0.5) {
          monthlyInspection(1);
          msgId = 1;
        } else {
          monthlyInspection(0);
          msgId = 0;
        }
        selectCard(-1); // give up focus on the card
        changeFocus(note.buttonX, note.buttonY, 1); // change focus to notification button
        note.setMessageType(msgId, removedVideoNum); // set messgae type and content
        money -= COST_FINE * removedVideoNum; // fine the player if possible
        State = "NOTE"; // change state to notification
      }
    }
  }
  // if end of month
  if (weekNum > 4) {
    monthChange = true;
    monthNum++; // update month
    weekNum = 1; // reset week
    // charge player for monthly fee
    if (money < COST_MONTHLY) {
      // if not enough money, game over
      fundDepleted = true;
    } else {
      money -= COST_MONTHLY;
    }
  }
  // if end of year
  if (monthNum > 12) {
    monthNum = 1; // reset month
  }
}

// displayTutorial()
//
// display the tutorial
function displayTutorial() {
  push();
  // BG
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  fill("#262626");
  rect(width / 2, height / 2, height, height);
  // title
  fill(RED);
  textSize(48);
  text("ABOUT R.K.B.V.G.", width / 2, height / 8 - 16);
  // buttons
  fill(255);
  textSize(16);
  // if first page, display NEXT
  if (tutorialIndex === 0) {
    text(INTRO, width / 2, height / 2);
    rect(width / 2, height - height / 12, width / 4, height / 12);
    textSize(32);
    fill(0);
    text("NEXT", width / 2, height - height / 12);
    // if second page, display OKAY and PREV
  } else {
    rect(width / 2, height - height / 12, width / 4, height / 12);
    text(OTHER_INFO, width / 2, height / 2);
    textSize(32);
    text("PREV", width / 8, height - height / 12);
    fill(0);
    text("OKAY", width / 2, height - height / 12);
  }
  pop();
}

// displayStaticUI()
//
// display static ui elements, user info bar, buttons
function displayStaticUI() {
  push();
  rectMode(CENTER);
  // BG
  fill("#262626");
  rect(width / 2, height / 2, height, height);

  // red info bar display money
  rectMode(CORNER);
  textSize(32);
  fill(RED);
  rect(0, height / 20, width, height / 12);
  fill(255);
  textAlign(CENTER, CENTER);
  text("USER | $" + money + " |", width / 2, height / 20 + height / 24);

  // 3 buttons
  rectMode(CENTER);
  fill(255);
  rect(width / 2 - width / 4 - width / 24, height - height / 4, width / 4, height / 12);
  rect(width / 2, height - height / 4, width / 4, height / 12);
  fill(255, 100);
  rect(width / 2 + width / 4 + width / 24, height - height / 4, width / 4, height / 12);
  fill(0);
  textSize(32);
  text("SWAP ALL", width / 2 - width / 4 - width / 24, height - height / 4);
  text("ACCEPT", width / 2, height - height / 4);
  fill(255);
  text("HISTORY", width / 2 + width / 4 + width / 24, height - height / 4);
  pop();
}

// displayDynamicUI()
//
// display dynamic ui elements, stats, video interface, cards
function displayDynamicUI() {
  // views, fans, rating, videos
  stats.display();
  if (State === "PLAY") {
    stats.addView();
    stats.addFan();
  }
  // interface
  videoInterface.display();
  updateInterface();
  // cards
  keywords = "";
  for (let i = 0; i < cards.length; i++) {
    cards[i].display();
    //
    if (i === cards.length - 1) {
      keywords += cards[i].word;
    } else {
      keywords += cards[i].word + " ";
    }
  }
  applySpecialCards();

  push();
  textAlign(CENTER, CENTER);
  textSize(24);
  if (videoInterface.risk === 0) {
    fill(GREEN);
  } else if (videoInterface.risk === 1) {
    fill(ORANGE);
  } else if (videoInterface.risk === 2) {
    fill(RED);
  }
  text("< " + keywords + " >", width / 2, height / 2 + height / 8 + 12);
  pop();

  showMessage();
}

function showMessage() {
  let msg = "";
  if (displayMessage) {
    // weekly income
    if (weekChange) {
      msg += "Income +$" + weeklyIncome;
      // monthly charge
    }
    if (monthChange) {
      msg += " | Fee -$" + COST_MONTHLY;
      // rating change
    }
    let change = stats.rating - pastRating;
    if (change >= 0) {
      msg += " | Rating +" + change + "%";
    } else {
      msg += " | Rating " + change + "%";
    }
  }
  push();
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(255);
  text(msg, width / 2, height / 2 - height / 6 - height / 48);
  pop();
}

function endScreen() {
  push();
  rectMode(CENTER);
  fill("#262626");
  rect(width / 2, height / 2, height, height);

  fill(YELLOW);
  textSize(32);
  textAlign(LEFT, CENTER)
  text("DEAR OUR ROYAL USER: ", width / 16, height / 2 - height / 3);
  textSize(16);
  fill(255);
  text("On " + time + ",\n\n" + MESSAGE_TO_USER[endingId], width / 16, height / 2);
  textAlign(CENTER, CENTER)
  rect(width / 2, height - height / 12, width / 4, height / 12);
  textSize(32);
  fill(0);
  text("I AGREE", width / 2, height - height / 12);
  pop();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (State === "PLAY") {
      // if focusing on cards, change to focusing on ACCEPT
      if (focusYAxis === 0) {
        focusYAxis = 1;
        focusXAxis = 1;
        changeFocus(width / 2, height - height / 4, 0);
        selectCard(-1);
      }
    }
  } else if (keyCode === DOWN_ARROW) {
    if (State === "PLAY") {
      // if focusing on buttons, change to focusing on CARD 0
      if (focusYAxis === 1 && !noCardsAvailable) {
        focusYAxis = 0;
        focusXAxis = 2;
        changeFocus(card.x, card.yFocused, 2);
        selectCard(focusXAxis);
      }
    }
  } else if (keyCode === LEFT_ARROW) {
    // if focusing on OKAY in TUTORIAL 1, change to focusing on PREV
    if (State === "TUTORIAL" && tutorialIndex === 1) {
      if (focusXAxis === 1) {
        focusXAxis = 0;
        changeFocus(width / 8, height - height / 12, 1);
      }
    } else if (State === "PLAY") {
      // if focusing on buttons
      if (focusYAxis === 1) {
        // if focusing on ACCEPT, change to focusing on SWAP ALL
        if (focusXAxis === 2) {
          focusXAxis = 1;
          changeFocus(width / 2, height - height / 4, 0);
          // if focusing on HISTORY, change to focusing on ACCEPT
        } else if (focusXAxis === 1) {
          focusXAxis = 0;
          changeFocus(width / 2 - width / 4 - width / 24, height - height / 4, 0);
        }
        // cards
      } else if (focusYAxis === 0) {
        if (focusXAxis > 0) {
          focusXAxis--;
          selectCard(focusXAxis);
        }
      }
    } else if (State === "HISTORY") {
      // if focusing on NEXT, change to focusing on PREV
      if (focusXAxis === 2) {
        focusXAxis = 1;
        changeFocus(width - width / 8 - width / 6 - 16, height - height / 12, 1);
        // if focusing on PREV, change to focusing on CLOSE
      } else if (focusXAxis === 1) {
        focusXAxis = 0;
        changeFocus(width / 6, height - height / 12, 0);
      }
    }
  } else if (keyCode === RIGHT_ARROW) {
    // if focusing on PREV in TUTORIAL 1, change to focusing on OKAY
    if (State === "TUTORIAL" && tutorialIndex === 1) {
      if (focusXAxis === 0) {
        focusXAxis = 1;
        changeFocus(width / 2, height - height / 12, 0);
      }
    }
    if (State === "PLAY") {
      // if focusing on SWAP ALL, change to focusing on ACCEPT
      if (focusYAxis === 1) {
        if (focusXAxis === 0) {
          focusXAxis = 1;
          changeFocus(width / 2, height - height / 4, 0);
          // if focusing on ACCEPT, change to focusing on HISTORY
        } else if (focusXAxis === 1) {
          focusXAxis = 2;
          changeFocus(width / 2 + width / 4 + width / 24, height - height / 4, 0);
        }
        // cards
      } else if (focusYAxis === 0) {
        if (focusXAxis < 4) {
          focusXAxis++;
          selectCard(focusXAxis);
        }
      }
    } else if (State === "HISTORY") {
      // if focusing on PREV, change to focusing on NEXT
      if (focusXAxis === 1) {
        focusXAxis = 2;
        changeFocus(width - width / 8, height - height / 12, 1);
        // if focusing on CLOSE, change to focusing on PREV
      } else if (focusXAxis === 0) {
        focusXAxis = 1;
        changeFocus(width - width / 8 - width / 6 - 16, height - height / 12, 1);
      }
    }
    // Pressing SPACE
  } else if (keyCode === 32) {
    // if focusing on RUN in START, change to focusing on NEXT
    if (State === "START") {
      if (startProgressBar.done) {
        State = "TUTORIAL";
        changeFocus(width / 2, height - height / 12, 0);
        systemSpeaks(0);
      }
      // if focusing on RUN in TUTORIAL -
    } else if (State === "TUTORIAL") {
      // TUTORIAL 0, change to focusing on OKAY
      if (tutorialIndex === 0) {
        tutorialIndex = 1;
        focusXAxis = 1;
        changeFocus(width / 2, height - height / 12, 0);
        systemSpeaks(1);
        // TUTORIAL 1
      } else if (tutorialIndex === 1) {
        // if focusing on PREV, change to focusing on OKAY in TUTORIAL 1
        if (focusXAxis === 0) {
          tutorialIndex = 0;
          changeFocus(width / 2, height - height / 12, 0);
          // if focusing on OKAY, change to focusing on - in PLAY
        } else if (focusXAxis === 1) {
          State = "PLAY";
          focusYAxis = 0;
          focusXAxis = 0;
          selectCard(0);
        }
      }
    } else if (State === "PLAY") {
      // if focusing on buttons
      if (focusYAxis === 1) {
        if (focusXAxis === 2) {
          history.resetView();
          State = "HISTORY";
          focusXAxis = 0;
          changeFocus(width / 6, height - height / 12, 0);
          // if focusing on ACCEPT
        } else if (focusXAxis === 1) {
          // if uploading is finished
          if (!videoInterface.uploading && !noCardsAvailable) {
            videoInterface.progressBar.reset(); // reset progress bar
            videoInterface.upload(); // play the upload animation
            acceptAllCards(); // play the card animtion
            setTimeout(resetCards, 2500); // reset cards
            systemSpeaks(5);
          }
        } else if (focusXAxis === 0) {
          swapAllCards();
          systemSpeaks(2);
          money -= COST_ALL_CARDS;
        }
      } else if (focusYAxis === 0) {
        if (!cards[cardIndex].swaped) {
          swapCard(cardIndex);
          systemSpeaks(3);
          money -= COST_CARD;
        }
        // solve the issue which the card stays selected after the player change to another card before the previous card resets
        let lastCard = cardIndex;
        setTimeout(function() {
          if (cardIndex === lastCard) {
            selectCard(lastCard);
          } else {
            selectCard(cardIndex);
          }
        }, 300);
      }
      // if focusing on CLOSE in NOTE, change to focusing on ACCEPT
    } else if (State === "NOTE") {
      if (note.id === 0 || note.id === 1) {
        State = "PLAY";
        focusXAxis = 1;
        focusYAxis = 1;
        changeFocus(width / 2, height - height / 4, 0);
      } else if (note.id === 2) {
        State = "END";
        changeFocus(width / 2, height - height / 12, 0);
      }
    } else if (State === "HISTORY") {
      // focusing on CLOSE
      if (focusXAxis === 0) {
        State = "PLAY";
        focusYAxis = 1;
        focusXAxis = 1;
        changeFocus(width / 2, height - height / 4, 0);
        // if focusing on PREV
      } else if (focusXAxis === 1) {
        history.prevPage();
        // if focusing on NEXT
      } else if (focusXAxis === 2) {
        history.nextPage();
      }
    } else if (State === "END") {
      alert("User account terminated.");
      location.reload();
    }
  }
  return false;
}

// selectCard(id)
//
// select a card and focus on it
function selectCard(id) {
  // before update current card index, remember the last card
  let lastCard = cardIndex;
  cardIndex = id;
  // give up the focus on the last card
  if (lastCard === 0) {
    card.focus = false; // if false, card will go back down
  } else if (lastCard === 1) {
    card1.focus = false;
  } else if (lastCard === 2) {
    card2.focus = false;
  } else if (lastCard === 3) {
    card3.focus = false;
  } else if (lastCard === 4) {
    card4.focus = false;
  }
  // focus on the card by its index
  if (id === 0) {
    card.focus = true; // if true, card will rise up
    changeFocus(card.x, card.yFocused, 2);
  } else if (id === 1) {
    card1.focus = true;
    changeFocus(card1.x, card1.yFocused, 2);
  } else if (id === 2) {
    card2.focus = true;
    changeFocus(card2.x, card2.yFocused, 2);
  } else if (id === 3) {
    card3.focus = true;
    changeFocus(card3.x, card3.yFocused, 2);
  } else if (id === 4) {
    card4.focus = true;
    changeFocus(card4.x, card4.yFocused, 2);
  }
  // give up focus on all the cards
  if (id === -1) {
    card.focus = false;
    card1.focus = false;
    card2.focus = false;
    card3.focus = false;
    card4.focus = false;
  }
}

// swapCard(id)
//
// swap a card by its index
function swapCard(id) {
  if (id === 0) {
    card.swap(); // play the animation
  } else if (id === 1) {
    card1.swap();
  } else if (id === 2) {
    card2.swap();
  } else if (id === 3) {
    card3.swap();
  } else if (id === 4) {
    card4.swap();
  }
  // randomize the card after the animation
  setTimeout(function() {
    randomizeACard(id);
  }, 300);
}

// swapAllCards()
//
// swap all the cards
function swapAllCards() {
  // play the animation
  if (!cards[0].swaped) {
    for (let i = 0; i < cards.length; i++) {
      cards[i].swap();
    }
    noCardsAvailable = true; // prevent user focus on any card
    // randomize all the cards after the animtion
    setTimeout(function() {
      randomizeCards();
      noCardsAvailable = false; // reset
    }, 300);
  }
}

// acceptAllCards()
//
// when player click the ACCEPT button
function acceptAllCards() {
  totalValue = 0; // reset
  // play animations
  for (let i = 0; i < cards.length; i++) {
    cards[i].accept();
    totalValue += cards[i].value; // calculate the total value of cards
  }
  noCardsAvailable = true;
}

// resetCards()
//
// reset all the cards after accepting all of them
function resetCards() {
  // play the animation
  for (let i = 0; i < cards.length; i++) {
    cards[i].reset();
  }
  noCardsAvailable = false;

  uploadVideo(); // update stats and history
  randomizeCards(); // randomize them
}

// applySpecialCards()
//
// update the stats if there's a special card
function applySpecialCards() {
  // check for special card(s)
  for (let i = 0; i < cards.length; i++) {
    // if it's special (purple)
    if (cards[i].colorId === 3) {
      // -1 risk
      if (cards[i].specialId === 0) {
        // update the risk
        videoInterface.risk -= 1;
        videoInterface.risk = constrain(videoInterface.risk, 0, 2);
        // -2 risk
      } else if (cards[i].specialId === 1) {
        videoInterface.risk -= 2;
        videoInterface.risk = constrain(videoInterface.risk, 0, 2);
      }
    }
  }
}

// uploadVideo()
//
// upload video after the player press ACCEPT
function uploadVideo() {
  // update stats
  stats.addVideo(videoInterface.risk); // update video rating array
  stats.addViewsRate(totalValue); // update the rate of getting views and fans
  stats.updateRating(); // calculate rating
  history.addVideoToRecord(keywords, videoInterface.risk, totalValue); // add video info to the history
  systemSpeaks(6);
}

// updateInterface()
//
// update the interface info based on current video keywords
function updateInterface() {
  let riskLevel = 0;
  let value = 0;
  // get riskLevel
  for (let i = 0; i < cards.length; i++) {
    // if orange
    if (cards[i].colorId === 1) {
      riskLevel += 15;
      // if red
    } else if (cards[i].colorId === 2) {
      riskLevel += 30;
    }
    value += cards[i].value; // get total value
  }
  // convert riskLevel into colors
  if (riskLevel >= 0 && riskLevel < 33) {
    videoInterface.setRisk(0);
  } else if (riskLevel >= 33 && riskLevel < 66) {
    videoInterface.setRisk(1);
  } else if (riskLevel >= 66) {
    videoInterface.setRisk(2);
  }
  videoInterface.setValue(value); // update value
  // calculate and update rank
  let rank = map(stats.views, 0, MOST_VIEWS, 1, ACTIVE_USERS, true);
  videoInterface.setRank(ACTIVE_USERS - rank);
}

// monthlyInspection(id)
//
// check for violation
function monthlyInspection(id) {
  removedVideoNum = 0; // reset
  // if deep inspection
  if (id === 1) {
    for (let i = 0; i < history.record.length; i++) {
      // every red video will be removed
      if (history.record[i].color === RED) {
        stats.addViewsRate(-(history.record[i].value)); // update rate of getting views and fans
        history.removeVideo(i); // remove the video info in history
        removedVideoNum++; // update number of removed video
      }
    }
    // if standard inspection
  } else if (id === 0) {
    for (let i = 0; i < history.record.length; i++) {
      // every red video with a value of 75 or more will be removed
      if (history.record[i].color === RED && history.record[i].value >= 75) {
        stats.addViewsRate(-(history.record[i].value));
        history.removeVideo(i);
        removedVideoNum++;
      }
    }
  }
  // if has removed video, update number of violation
  if (removedVideoNum > 0) {
    videoInterface.addViolation();
  }
}

// changeFocus(targetX, targetY, sizeId)
//
// change focus to given position and size
function changeFocus(targetX, targetY, sizeId) {
  // set position
  focusPosX = targetX;
  focusPosY = targetY;
  // different sizes for ui element
  // button
  if (sizeId === 0) {
    focusWidth = width / 4;
    focusHeight = height / 12;
    // button text only
  } else if (sizeId === 1) {
    focusWidth = width / 4 - 64;
    focusHeight = height / 12;
    // card
  } else if (sizeId === 2) {
    focusWidth = width / 6;
    focusHeight = height / 4;
  }
}

// displayFocus()
//
// display the focus ui
function displayFocus() {
  push();
  rectMode(CENTER);
  stroke(BLUE);
  strokeWeight(8);
  fill(255, 0);
  rect(focusPosX, focusPosY, focusWidth, focusHeight);
  pop();
}

// systemSpeaks(index)
//
// let the voice speak based on given index of the array
function systemSpeaks(index) {
  responsiveVoice.speak(voice[index], "UK English Female");
}
