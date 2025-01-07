// Start over goes back to the lounge
// CLUE Doesn't work


const choicesDiv = document.querySelector(".choices");
const cannotJoinError = document.getElementById("cannot-join-error");
const notContainer = document.getElementById("not-container");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatContainer = document.getElementById("chat-container");
const toInput = document.getElementById("to-input");
const disconnectModal = document.getElementById("disconnect-modal");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("chatMessage", {
    text: chatInput.value,
    to: toInput.value
  })
  chatInput.value = "";
  chatInput.focus()
});

const { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});
const socket = io();
socket.on("disconnect", () => {
  disconnectModal.style.display = "block";
})

socket.emit("joinRoom", { username });
socket.on("sameUsername", () => {
  cannotJoinError.style.display = "block";
  cannotJoinError.innerHTML = `Sorry, there is already someone named ${username} in this game. Please go back and choose another name.`
  notContainer.style.display = "none";
})

socket.on("people", ({ people }) => {
  let choicesHTML = "";
  people.forEach(person => {
    choicesHTML += `<div class="image-choice" id=${person}><img src="images/${person}.png" alt="${person}" height="200"></div>`
  });
  choicesDiv.innerHTML = choicesHTML;
  document.querySelectorAll(".image-choice").forEach(choice => {
    choice.addEventListener("click", () => {
      init(choice.id, username)
    });
  })
})
socket.on("chatMessage", ({ text, user, private }) => {
  console.log(chatOn);
  if(!chatOn){
    console.log("chat none")
    chatNumber++;
    notificationNumber.style.display = "inline-block";
    notificationNumber.innerHTML = chatNumber;
  }
  if (private == false) {
    chatContainer.innerHTML += `
        <div class="chat-message">
            <span class="user-chat"> <img src="images/${user.suspect}-stand.png" alt="" height="16"> ${user.username}</span>
            <p class="message">
                ${text}
            </p>
        </div>
        `
  }
  else {
    if (user.username == username) {
      chatContainer.innerHTML += `
            <div class="chat-message">
                <span class="user-chat"> <img src="images/${user.suspect}-stand.png" alt="" height="16"> ${user.username} <span class="private"> (privately to ${private.username})</span></span>
                <p class="message">
                    ${text}
                </p>
            </div>
            `
    }
    else {
      chatContainer.innerHTML += `
            <div class="chat-message">
                <span class="user-chat"> <img src="images/${user.suspect}-stand.png" alt="" height="16"> ${user.username} <span class="private"> (privately to me)</span></span>
                <p class="message">
                    ${text}
                </p>
            </div>
            `
    }
  }
  chatContainer.scrollTop = chatContainer.scrollHeight;

})
socket.on("cannotJoin", () => {
  cannotJoinError.style.display = "block";
  notContainer.style.display = "none";
})

socket.on("rejoin", () => {
  
})
let chatNumber = 0;
let chatOn = false;
const notificationNumber = document.getElementById("notification-number");



function init(person, username) {
  socket.emit("personChosen", ({ username, person }));
  const content = document.getElementById("content");
  const wholeContainer = document.querySelector(".whole-container");
  wholeContainer.style.display = "none";
  content.style.display = "block";

  const error = document.getElementById("error");
  const leave = document.getElementById("leave-game")
  const canvas = document.getElementById("board-canvas");
  canvas.height = window.innerHeight - 200
  canvas.width = canvas.height;
  const arrows = document.getElementById("arrows");
  const up = document.getElementById("arrow-up");
  const down = document.getElementById("arrow-down");
  const left = document.getElementById("arrow-left");
  const right = document.getElementById("arrow-right");
  const viewNotes = document.getElementById("view-notes");
  const notes = document.querySelector(".notepad");
  const start = document.getElementById("start-game");
  const gameContent = document.getElementById("game-content");
  const suggestModal = document.getElementById("suggest-modal");
  const suggest = document.getElementById("suggest");
  const suggestX = document.getElementById("suggest-x");
  const suggestPicker = document.getElementById("suggest-picker");
  const suggestNow = document.getElementById("suggest-now");
  const suggestDisplay = document.getElementById("suggest-display");
  const suggestionImages = document.getElementById("suggestion-images");
  const suggestionLabel = document.getElementById("suggestion-label");
  const cardRoll = document.getElementById("card-roll");
  const userList = document.getElementById("users");
  const steps = document.getElementById("steps");
  const showDiceButton = document.getElementById("show-dice");
  const diceModal = document.getElementById("dice-modal");
  const diceX = document.getElementById("dice-x");
  const stepsLeft = document.getElementById("steps-left")
  const controls = document.getElementById("controls");
  const submitPosition = document.getElementById("submit-position");
  const startOver = document.getElementById("start-over");
  const gameStatus = document.getElementById("game-status");
  const hasShow = document.getElementById("has-show");
  const rolledDisplay = document.getElementById("rolled-display");
  const rolledLabel = document.getElementById("rolled-label");
  const diceImages = document.getElementById("dice-images");
  const placeDisplay = document.getElementById("place-display");
  const placeName = document.getElementById("place-name");
  const secretPassage = document.getElementById("secret-passage");
  const noteX = document.getElementById("notepad-x");
  const symbolSelect = document.getElementById("symbol-select");
  const clueNum = document.getElementById("clues");
  const clueContainer = document.getElementById("clue-container");
  const clueImage = document.getElementById("clue-card-image");
  const clueCardInner = document.getElementById("clue-card-inner");
  const clueCard = document.getElementById("clue-card-back");
  const flipMessage = document.getElementById("flip-message");
  const diceSound = document.getElementById("dice-sound");
  const arrowRightPeople = document.getElementById("arrow-right-people");
  const arrowLeftPeople = document.getElementById("arrow-left-people");
  const leftAreaPeople = document.getElementById("left-area-people");
  const rightAreaPeople = document.getElementById("right-area-people");
  const suggestRowPeople = document.getElementById("people-suggest-row");
  const arrowRightWeapon = document.getElementById("arrow-right-weapon");
  const arrowLeftWeapon = document.getElementById("arrow-left-weapon");
  const leftAreaWeapon = document.getElementById("left-area-weapon");
  const rightAreaWeapon = document.getElementById("right-area-weapon");
  const suggestRowWeapon = document.getElementById("weapon-suggest-row");
  const revealPlace = document.getElementById("reveal-place");
  const revealPlaceSubmit = document.getElementById("reveal-place-submit");
  const arrowRightPlace = document.getElementById("arrow-right-place");
  const arrowLeftPlace = document.getElementById("arrow-left-place");
  const leftAreaPlace = document.getElementById("left-area-place");
  const rightAreaPlace = document.getElementById("right-area-place");
  const suggestRowPlace = document.getElementById("place-suggest-row");
  const placeSuggested = document.getElementById("place-suggested");
  const chat = document.getElementById("chat");
  const chatToggle = document.getElementById("chat-toggle");
  const accuse = document.getElementById("accuse");
  const suggestHeading = document.getElementById("suggest-heading");
  const accuseContainer = document.getElementById("accuse-container");
  const suspectAccuse = document.getElementById("suspect-accuse");
  const weaponAccuse = document.getElementById("weapon-accuse");
  const placeAccuse = document.getElementById("place-accuse");
  const suspectEnvelope = document.getElementById("suspect-envelope");
  const weaponEnvelope = document.getElementById("weapon-envelope");
  const placeEnvelope = document.getElementById("place-envelope");
  const accuseUsername = document.getElementById("accuse-username");
  const zoomIn = document.getElementById("zoom-in");
  const zoomOut = document.getElementById("zoom-out");
  const suspectRow = document.getElementById("suspect-row");
  const weaponRow = document.getElementById("weapon-row");
  const revealHeading = document.getElementById("reveal-heading");
  const clueSecretPassage = document.getElementById("clue-secret-passage");
  const userPicker = document.getElementById("user-picker");
  const userPickerForm = document.getElementById("pick-user-form");
  const pickUserSelect = document.getElementById("pick-user-select");
  const endButton = document.getElementById("end-turn");
  const diceWav = new Audio('sounds/dice.wav');
  const log = document.getElementById("log");
  const hideOrShowChat = document.getElementById("hide-or-show-chat");
  const chatChevron = document.getElementById("chat-chevron");
  function playerPosition(person) {
    if (person === "Mustard") {
      return ([17, 0])
    } else if (person === "Green") {
      return ([0, 14])
    } else if (person === "Orchid") {
      return ([0, 9])
    } else if (person === "Plum") {
      return ([19, 23])
    } else if (person === "Peacock") {
      return ([7, 23])
    } else if (person === "Scarlett") {
      return ([24, 7])
    }
  }
  var isAccuse = false;
  var revealing = [];
  var userCards = [];
  var whoseTurn = null;
  var clueNow = false;
  var clueReveal = false;
  var passageClue = null;
  var allUsers = [];
  var userClue = null;
  var from = null;
  let numberOfClues = 0;
  const people = ["Green", "Mustard", "Orchid", "Peacock", "Plum", "Scarlett"];
  const weapons = ["Candlestick", "Dagger", "Rope", "Revolver", "LeadPipe", "Wrench"];
  const places = ["Ballroom", "BilliardRoom", "Conservatory", "DiningRoom", "Hall", "Kitchen", "Library", "Lounge", "Study"];
  var currentPlace = places[0];
  var currentPerson = people[0];
  var currentWeapon = weapons[0];
  const boardImg = document.getElementById("board-img");
  const Icon = document.getElementById(`${person.toLowerCase()}-icon`);

  const rooms = [
    {
      name: "DiningRoom",
      spaceName: "Dining Room",
      squares: [
        [15, 0], [14, 0], [13, 0], [12, 0], [11, 0], [10, 0], [9, 0],
        [15, 1], [14, 1], [13, 1], [12, 1], [11, 1], [10, 1], [9, 1],
        [15, 2], [14, 2], [13, 2], [12, 2], [11, 2], [10, 2], [9, 2],
        [15, 3], [14, 3], [13, 3], [12, 3], [11, 3], [10, 3], [9, 3],
        [15, 4], [14, 4], [13, 4], [12, 4], [11, 4], [10, 4], [9, 4],
        [15, 5], [14, 5], [13, 5], [12, 5], [11, 5], [10, 5],
        [15, 6], [14, 6], [13, 6], [12, 6], [11, 6], [10, 6],
        [15, 7], [14, 7], [13, 7], [12, 7], [11, 7], [10, 7],
      ],
      entrances: [[[15, 6], [16, 6]], [[12, 7], [12, 8]]],
      passage: null,
      newPassage: null
    },
    {
      name: "Lounge",
      spaceName: false,
      squares: [
        [19, 6], [20, 6], [21, 6], [22, 6], [23, 6],
        [19, 5], [20, 5], [21, 5], [22, 5], [23, 5], [24, 5],
        [19, 4], [20, 4], [21, 4], [22, 4], [23, 4], [24, 4],
        [19, 3], [20, 3], [21, 3], [22, 3], [23, 3], [24, 3],
        [19, 2], [20, 2], [21, 2], [22, 2], [23, 2], [24, 2],
        [19, 1], [20, 1], [21, 1], [22, 1], [23, 1], [24, 1],
        [19, 0], [20, 0], [21, 0], [22, 0], [23, 0], [24, 0],
      ],
      entrances: [[[19, 6], [18, 6]]],
      passage: "Conservatory",
      newPassage: null
    },
    {
      name: "Hall",
      spaceName: false,
      squares: [
        [18, 9], [19, 9], [20, 9], [21, 9], [22, 9], [23, 9], [24, 9],
        [18, 10], [19, 10], [20, 10], [21, 10], [22, 10], [23, 10], [24, 10],
        [18, 11], [19, 11], [20, 11], [21, 11], [22, 11], [23, 11], [24, 11],
        [18, 12], [19, 12], [20, 12], [21, 12], [22, 12], [23, 12], [24, 12],
        [18, 13], [19, 13], [20, 13], [21, 13], [22, 13], [23, 13], [24, 13],
        [18, 14], [19, 14], [20, 14], [21, 14], [22, 14], [23, 14], [24, 14],
      ],
      entrances: [[[18, 11], [17, 11]], [[18, 12], [17, 12]]],
      passage: null,
      newPassage: null
    },
    {
      name: "Study",
      spaceName: false,
      squares: [
        [21, 17], [22, 17], [23, 17],
        [21, 18], [22, 18], [23, 18], [24, 18],
        [21, 19], [22, 19], [23, 19], [24, 19],
        [21, 20], [22, 20], [23, 20], [24, 20],
        [21, 21], [22, 21], [23, 21], [24, 21],
        [21, 22], [22, 22], [23, 22], [24, 22],
        [21, 23], [22, 23], [23, 23], [24, 23],
      ],
      entrances: [[[21, 17], [20, 17]]],
      passage: "Kitchen",
      newPassage: null
    },
    {
      name: "Library",
      spaceName: false,
      squares: [
        [15, 17], [16, 17], [17, 17],
        [14, 18], [15, 18], [16, 18], [17, 18], [18, 18],
        [14, 19], [15, 19], [16, 19], [17, 19], [18, 19],
        [14, 20], [15, 20], [16, 20], [17, 20], [18, 20],
        [14, 21], [15, 21], [16, 21], [17, 21], [18, 21],
        [14, 22], [15, 22], [16, 22], [17, 22], [18, 22],
        [15, 23], [16, 23], [17, 23],
      ],
      entrances: [[[16, 17], [16, 16]], [[14, 20], [13, 20]]],
      passage: null,
      newPassage: null
    },
    {
      name: "BilliardRoom",
      spaceName: "Billiard Room",
      squares: [
        [8, 18], [9, 18], [10, 18], [11, 18], [12, 18],
        [8, 19], [9, 19], [10, 19], [11, 19], [12, 19],
        [8, 20], [9, 20], [10, 20], [11, 20], [12, 20],
        [8, 21], [9, 21], [10, 21], [11, 21], [12, 21],
        [8, 22], [9, 22], [10, 22], [11, 22], [12, 22],
        [8, 23], [9, 23], [10, 23], [11, 23], [12, 23]
      ],
      entrances: [[[9, 18], [9, 17]], [[12, 22], [13, 22]]],
      passage: null,
      newPassage: null
    }, {
      name: "Conservatory",
      spaceName: false,
      squares: [
        [1, 18], [2, 18], [3, 18], [4, 18], [5, 18],
        [1, 19], [2, 19], [3, 19], [4, 19], [5, 19],
        [1, 20], [2, 20], [3, 20], [4, 20], [5, 20],
        [1, 21], [2, 21], [3, 21], [4, 21], [5, 21],
        [1, 22], [2, 22], [3, 22], [4, 22], [5, 22],
        [1, 23], [2, 23], [3, 23], [4, 23]
      ],
      entrances: [[[5, 18], [6, 18]]],
      passage: "Lounge",
      newPassage: null
    },
    {
      name: "Ballroom",
      spaceName: false,
      squares: [
        [2, 15], [3, 15], [4, 15], [5, 15], [6, 15], [7, 15],
        [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14],
        [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13],
        [1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12],
        [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11],
        [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10],
        [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9],
        [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8],
      ],
      entrances: [[[5, 8], [5, 7]], [[7, 9], [8, 9]], [[7, 14], [8, 14]], [[5, 15], [5, 16]]],
      passage: null,
      newPassage: null
    },
    {
      name: "Kitchen",
      spaceName: false,
      squares: [
        [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5],
        [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4],
        [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
        [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
        [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
        [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]
      ],
      entrances: [[[6, 4], [7, 4]]],
      passage: "Study",
      newPassage: null
    },
  ]
  if (person == "Scarlett") {
    canvas.style.transform = "rotateZ(90deg)";
    arrows.style.transform = "rotateZ(90deg)"
  }
  else if (person == "Plum" || person == "Peacock") {
    canvas.style.transform = "rotateZ(180deg)";
    arrows.style.transform = "rotateZ(180deg)";
  } else if (person == "Green" || person == "Orchid") {
    canvas.style.transform = "rotateZ(270deg)";
    arrows.style.transform = "rotateZ(270deg)";
  }

  const noSquares = [[16, 0], [18, 0], [24, 6], [24, 8], [8, 0], [6, 0], [1, 6], [0, 7], [0, 8], [0, 10], [0, 13], [0, 15], [0, 16], [1, 17], [6, 23], [13, 23], [14, 23], [18, 23], [20, 23], [24, 17], [24, 15],
  [10, 10], [11, 10], [12, 10], [13, 10], [14, 10], [15, 10], [16, 10],
  [10, 11], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11], [16, 11],
  [10, 12], [11, 12], [12, 12], [13, 12], [14, 12], [15, 12], [16, 12],
  [10, 13], [11, 13], [12, 13], [13, 13], [14, 13], [15, 13], [16, 13],
  [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14], [16, 14],
  ]
  chatToggle.addEventListener("click", () => {
    if(!chatOn) notificationNumber.style.display = "none";
    chatNumber = 0;
    if(chatOn){
      hideOrShowChat.innerText = "Show";
      chatChevron.classList.remove("fa-chevron-up");
      chatChevron.classList.add("fa-chevron-down");
    } else {
      hideOrShowChat.innerText = "Hide";
      chatChevron.classList.remove("fa-chevron-down");
      chatChevron.classList.add("fa-chevron-up");
    }
    chatOn ? chat.style.display = "none" : chat.style.display = "block";
    chatOn = !chatOn;

  });
  viewNotes.addEventListener("click", () => {
    notes.style.display = "block";
    viewNotes.style.display = "none";
  });
  noteX.addEventListener("click", () => {
    notes.style.display = "none";
    viewNotes.style.display = "block";
  });
  accuse.addEventListener("click", () => {
    placeSuggested.innerHTML = `<div class="image-choice" id="${player.room.name}"><img src="images/${player.room.name}.png" alt="" height="200"></div>`
    suggestNow.innerHTML = "Accuse";
    suggestModal.style.display = "block";
    suggestPicker.style.display = "block";
    isAccuse = true;
    suggestHeading.innerHTML = "Accuse";
  });
  function evaluatePerson(newPerson) {
    people.indexOf(newPerson) != 0 ? leftAreaPeople.innerHTML = `<img src="images/${people[people.indexOf(newPerson) - 1]}.png" alt="" height="200">` :
      leftAreaPeople.innerHTML = "";
    people.indexOf(newPerson) == 0 ? arrowRightPeople.disabled = true : arrowRightPeople.disabled = false;
    people.indexOf(newPerson) != people.length - 1 ? rightAreaPeople.innerHTML = `<img src="images/${people[people.indexOf(newPerson) + 1]}.png" alt="" height="200">` :
      rightAreaPeople.innerHTML = "";
    people.indexOf(newPerson) == people.length - 1 ? arrowLeftPeople.disabled = true : arrowLeftPeople.disabled = false;
    suggestRowPeople.innerHTML = `<img src="images/${newPerson}.png" alt="" height="200">`
    currentPerson = newPerson;
  }
  evaluatePerson(currentPerson);
  arrowRightPeople.addEventListener("click", () => evaluatePerson(people[people.indexOf(currentPerson) - 1]));
  arrowLeftPeople.addEventListener("click", () => evaluatePerson(people[people.indexOf(currentPerson) + 1]));
  arrowRightWeapon.addEventListener("click", () => evaluateWeapon(weapons[weapons.indexOf(currentWeapon) - 1]));
  arrowLeftWeapon.addEventListener("click", () => evaluateWeapon(weapons[weapons.indexOf(currentWeapon) + 1]));

  function evaluateWeapon(newWeapon) {
    weapons.indexOf(newWeapon) != 0 ? leftAreaWeapon.innerHTML = `<img src="images/${weapons[weapons.indexOf(newWeapon) - 1]}.png" alt="" height="200">` :
      leftAreaWeapon.innerHTML = "";
    weapons.indexOf(newWeapon) == 0 ? arrowRightWeapon.disabled = true : arrowRightWeapon.disabled = false;
    weapons.indexOf(newWeapon) != weapons.length - 1 ? rightAreaWeapon.innerHTML = `<img src="images/${weapons[weapons.indexOf(newWeapon) + 1]}.png" alt="" height="200">` :
      rightAreaWeapon.innerHTML = "";
    weapons.indexOf(newWeapon) == weapons.length - 1 ? arrowLeftWeapon.disabled = true : arrowLeftWeapon.disabled = false;
    suggestRowWeapon.innerHTML = `<img src="images/${newWeapon}.png" alt="" height="200">`
    currentWeapon = newWeapon;
  }
  evaluateWeapon(currentWeapon)


  function evaluatePlace(newPlace) {
    places.indexOf(newPlace) != 0 ? leftAreaPlace.innerHTML = `<img src="images/${places[places.indexOf(newPlace) - 1]}.png" alt="" height="200">` :
      leftAreaPlace.innerHTML = "";
    places.indexOf(newPlace) == 0 ? arrowRightPlace.disabled = true : arrowRightPlace.disabled = false;
    places.indexOf(newPlace) != places.length - 1 ? rightAreaPlace.innerHTML = `<img src="images/${places[places.indexOf(newPlace) + 1]}.png" alt="" height="200">` :
      rightAreaPlace.innerHTML = "";
    places.indexOf(newPlace) == places.length - 1 ? arrowLeftPlace.disabled = true : arrowLeftPlace.disabled = false;
    suggestRowPlace.innerHTML = `<img src="images/${newPlace}.png" alt="" height="200">`
    currentPlace = newPlace;
  }
  evaluatePlace(currentPlace);
  arrowRightPlace.addEventListener("click", () => evaluatePlace(places[places.indexOf(currentPlace) - 1]));
  arrowLeftPlace.addEventListener("click", () => evaluatePlace(places[places.indexOf(currentPlace) + 1]));


  dragElement(notes);
  dragElement(controls);
  dragElement(suggestPicker);
  dragElement(revealPlace);
  dragElement(userPicker);

  //Pick user

  userPickerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    userPicker.style.display = "none";
    if (userClue == "Pick One") {
      socket.emit("revealUser", { user: pickUserSelect.value })
    } else if (userClue == "Both Draw") {
      socket.emit("bothDraw", { user: pickUserSelect.value })
    }
  })
  // Reveal Place Submit
  revealPlaceSubmit.addEventListener("click", () => {
    if (passageClue == null) {
      suggestModal.style.display = "none";
      revealPlace.style.display = "none";
      socket.emit("revealThisCard", { card: currentPlace });
    } else if (passageClue == "rush") {
      suggestModal.style.display = "none";
      revealPlace.style.display = "none";
      allUsers.forEach(user => socket.emit("positionNew", { user: user.suspect, room: currentPlace }));
      // next clue
      setTimeout(() => {
        socket.emit("clueDone", { howManyClues: numberOfClues })
        numberOfClues--;
      }, 3000);

    } else if (passageClue == "from") {
      from = currentPlace;
      revealHeading.innerHTML = "Secret passage to: ";
      revealPlaceSubmit.innerHTML = "Add secret passage";
      passageClue = "to";
    } else if (passageClue == "to") {
      if (currentPlace == from) {
        revealHeading.innerHTML = "Choose a different room";
      } else {
        socket.emit("secretPassage", {
          from,
          to: currentPlace
        });
        suggestModal.style.display = "none";
        revealPlace.style.display = "none";
        revealPlaceSubmit.innerHTML = "Go"
        revealHeading.innerHTML = "Reveal a place";
        setTimeout(() => {
          socket.emit("clueDone", { howManyClues: numberOfClues })
          numberOfClues--;
        }, 3000);

      }
    }

  });
  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
      e = e || window.event;
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  var symbol = "<i class='fas fa-times'></i>";
  symbolSelect.addEventListener("change", (e) => {
    symbol = e.target.value;
  })
  document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", () => {
      if (cell.innerHTML == "") {
        cell.innerHTML = symbol;
      } else {
        cell.innerHTML = "";
      }

    })
  });
  var scale = canvas.width / 2333;
  function boardToCanvas(gridX, gridY) {
    return ([(95 * scale) + (84 * scale * gridX), canvas.height - (169 * scale) - (84 * scale * gridY) - (84 * scale)])
  }


  const ctx = canvas.getContext("2d");

  const board = {
    image: boardImg,
    w: canvas.width,
    h: canvas.height,
    x: 0,
    y: 0
  }
  class Player {
    constructor(img, name, x, y) {
      this.steps = null;
      this.stepsLeft = null;
      this.room = null;
      this.img = img;
      this.name = name;
      this.origX = x;
      this.origY = y;
      this.relX = x;
      this.relY = y;
      this.x = boardToCanvas(this.relX, this.relY)[0];
      this.y = boardToCanvas(this.relX, this.relY)[1];
      this.w = 21 * canvas.width / 780;
      this.h = 21 * canvas.height / 780;
      this.upEnter = false;
      this.downEnter = false;
      this.rightEnter = false;
      this.leftEnter = false;
      this.upExit = false;
      this.downExit = false;
      this.rightExit = false;
      this.leftExit = false;
    }
    render() {
      this.x = boardToCanvas(this.relX, this.relY)[0];
      this.y = boardToCanvas(this.relX, this.relY)[1];
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
  }
  function playerPosition(person) {
    if (person === "Mustard") {
      return ([17, 0])
    } else if (person === "Green") {
      return ([0, 14])
    } else if (person === "Orchid") {
      return ([0, 9])
    } else if (person === "Plum") {
      return ([19, 23])
    } else if (person === "Peacock") {
      return ([7, 23])
    } else if (person === "Scarlett") {
      return ([24, 7])
    }
  }
  let otherUsers = [
    new Player(document.getElementById("mustard-icon"), "Mustard", playerPosition("Mustard")[0], playerPosition("Mustard")[1]),
    new Player(document.getElementById("green-icon"), "Green", playerPosition("Green")[0], playerPosition("Green")[1]),
    new Player(document.getElementById("orchid-icon"), "Orchid", playerPosition("Orchid")[0], playerPosition("Orchid")[1]),
    new Player(document.getElementById("plum-icon"), "Plum", playerPosition("Plum")[0], playerPosition("Plum")[1]),
    new Player(document.getElementById("peacock-icon"), "Peacock", playerPosition("Peacock")[0], playerPosition("Peacock")[1]),
    new Player(document.getElementById("scarlett-icon"), "Scarlett", playerPosition("Scarlett")[0], playerPosition("Scarlett")[1])
  ];
  otherUsers.forEach(oldUser => {
    if (oldUser.name == person) {
      otherUsers.splice(otherUsers.indexOf(oldUser), 1);
    }
  })
  let position = playerPosition(person)
  let player = new Player(Icon, person, position[0], position[1]);
  function compareTwoPairs(array1, array2) {
    if (array1[0] == array2[0] && array1[1] == array2[1]) {
      return true
    }
    return false;
  }
  function arrayInArray(array, element) {

    let output = false;
    array.forEach(ele => {
      if (compareTwoPairs(ele, element)) {
        output = true;
      }
    });
    return output;
  }
  function removeElement(array, element) {
    const index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array
  }
  function checkCollision(oldCoor, coordinates) {
    let output = "unoccupied";
    rooms.forEach(room => {
      if (player.room == room) {
        if (!arrayInArray(room.squares, coordinates)) {
          output = "occupied";
        }
      } else {
        room.squares.forEach(square => {
          if (compareTwoPairs(square, coordinates)) {
            output = "occupied";
          }
        }
        )
      }

      room.entrances.forEach(entrance => {
        if (compareTwoPairs(entrance[0], coordinates) && compareTwoPairs(entrance[1], oldCoor)) {
          output = room;
        } else if (compareTwoPairs(entrance[1], coordinates) && compareTwoPairs(entrance[0], oldCoor)) {
          output = "exit";
        }
      })
    });
    noSquares.forEach(square => {
      if (compareTwoPairs(square, coordinates)) {
        output = "occupied";
      }
    });
    otherUsers.forEach(user => {
      let shouldBlock = true;
      rooms.forEach(room => {
        if (arrayInArray(room.squares, [user.relX, user.relY])) {
          shouldBlock = false;
        }
      });
      if (shouldBlock == true) {
        if (compareTwoPairs(coordinates, [user.relX, user.relY])) {
          output = "occupied";
        }
      }

    })


    return output
  }
  function chooseRandom(array) {
    const num = Math.floor(Math.random() * array.length);
    return array[num]
  }
  var canvasChange = 0;
  zoomIn.addEventListener("mousedown", () => canvasChange = 20);
  zoomIn.addEventListener("mouseup", () => canvasChange = 0);

  zoomOut.addEventListener("mousedown", () => canvasChange = -20);
  zoomOut.addEventListener("mouseup", () => canvasChange = 0);

  function addSpace(word) {
    let newWord = "";
    for (let index = 0; index < word.length; index++) {
      const letter = word[index];
      if (letter === letter.toUpperCase() && index != 0) {
        newWord += " ";
      }
      newWord += letter;

    }
    return newWord
  }
  const veryBigContainer = document.querySelector(".very-big-container");
  const rightContent = document.getElementById("right-content");
  const boardElement = document.querySelector(".board");
  const zoomControls = document.getElementById("zoom-controls");
  const canvasContainer = document.getElementById("canvas-container");
  let screenSize = 790;
  function resize(){
    if(window.innerWidth < 1000){
      notes.style.left = "20%";
      veryBigContainer.style.display = "block";
      rightContent.style.width = "auto";
      if(window.innerWidth < 790){
        // change canvas code
       
        let goodWidth = window.innerWidth * 0.8;
         canvasContainer.style.width = goodWidth + "px";
        canvasContainer.style.height = goodWidth + "px";
        screenSize = goodWidth;
        console.log("HELLOO");
        zoomOut.disabled = false;
        boardElement.style.width = goodWidth + "px";
        boardElement.style.height = goodWidth + "px";
        canvas.setAttribute("width", goodWidth);
        canvas.setAttribute("height", goodWidth);
        board.w = goodWidth;
        board.h = goodWidth;
        player.h = 21 * canvas.height / 780;
        player.w = 21 * canvas.width / 780;
        otherUsers.forEach(user => {
          user.h = 21 * canvas.height / 780;
          user.w = 21 * canvas.width / 780;
        });
        scale = canvas.width / 2333;
        // if (canvas.width <= 780) {
        //   zoomOut.disabled = true;
        //   canvasChange = 0;
        // } else {
        //   zoomOut.disabled = false;
        // }
        zoomControls.style.transform = `translate(${screenSize-30}px, ${screenSize-60}px)`;
      }
    }
    else {
      notes.style.left = "80%";
       canvasContainer.style.width = "790px";
      canvasContainer.style.height = "790px";
      veryBigContainer.style.display = "flex";
      rightContent.style.width = "calc(100% - 880px)";
      boardElement.style.width = "790px";
      boardElement.style.height = "790px";
      zoomControls.style.transform = "translate(700px, 700px)";
      
    }
  }
  window.addEventListener("resize", resize);
  resize();
  function changeCanvas() {
    zoomOut.disabled = false;
    canvas.setAttribute("width", canvas.width + canvasChange);
    canvas.setAttribute("height", canvas.height + canvasChange);
    board.w = canvas.width + canvasChange;
    board.h = canvas.height + canvasChange;
    player.h = 21 * canvas.height / 780;
    player.w = 21 * canvas.width / 780;
    otherUsers.forEach(user => {
      user.h = 21 * canvas.height / 780;
      user.w = 21 * canvas.width / 780;
    });
    scale = canvas.width / 2333;
    if (canvas.width <= screenSize) {
      zoomOut.disabled = true;
      canvasChange = 0;
    } else {
      zoomOut.disabled = false;
    }

  }
  function update() {
    changeCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(boardImg, board.x, board.y, board.w, board.h);
    otherUsers.forEach(user => {
      user.render();
    })
    player.render();
    requestAnimationFrame(update)
  }
  update();
  function checkAllCollision() {
    //console.log(`${player.relX} , ${player.relY}`);
    stepsLeft.innerHTML = `${player.stepsLeft} steps left`;
    player.upEnter = false;
    player.downEnter = false;
    player.rightEnter = false;
    player.leftEnter = false;
    player.upExit = false;
    player.downExit = false;
    player.rightExit = false;
    player.leftExit = false;
    up.disabled = false;
    down.disabled = false;
    left.disabled = false;
    right.disabled = false;
    if (player.stepsLeft == 0) {
      secretPassage.style.display = "none";
      up.disabled = true;
      down.disabled = true;
      left.disabled = true;
      right.disabled = true;
      submitPosition.style.display = "block";
    } else {
      if (checkCollision([player.relX, player.relY], [player.relX, player.relY + 1]) == "occupied" || player.relY == 23) {
        up.disabled = true;
      } else if (checkCollision([player.relX, player.relY], [player.relX, player.relY + 1]) == "exit") {
        player.upExit = true;
      } else if (typeof checkCollision([player.relX, player.relY], [player.relX, player.relY + 1]) == "object") {
        player.upEnter = checkCollision([player.relX, player.relY], [player.relX, player.relY + 1])
      }
      if (checkCollision([player.relX, player.relY], [player.relX, player.relY - 1]) == "occupied" || player.relY == 0) {
        down.disabled = true;
      } else if (checkCollision([player.relX, player.relY], [player.relX, player.relY - 1]) == "exit") {
        player.downExit = true;
      } else if (typeof checkCollision([player.relX, player.relY], [player.relX, player.relY - 1]) == "object") {
        player.downEnter = checkCollision([player.relX, player.relY], [player.relX, player.relY - 1])
      }
      if (checkCollision([player.relX, player.relY], [player.relX - 1, player.relY]) == "occupied" || player.relX == 0) {
        left.disabled = true;
      } else if (checkCollision([player.relX, player.relY], [player.relX - 1, player.relY]) == "exit") {
        player.leftExit = true;
      } else if (typeof checkCollision([player.relX, player.relY], [player.relX - 1, player.relY]) == "object") {
        player.leftEnter = checkCollision([player.relX, player.relY], [player.relX - 1, player.relY])
      }
      if (checkCollision([player.relX, player.relY], [player.relX + 1, player.relY]) == "occupied" || player.relX == 24) {
        right.disabled = true;
      } else if (checkCollision([player.relX, player.relY], [player.relX + 1, player.relY]) == "exit") {
        player.rightExit = true;
      } else if (typeof checkCollision([player.relX, player.relY], [player.relX + 1, player.relY]) == "object") {
        player.rightEnter = checkCollision([player.relX, player.relY], [player.relX + 1, player.relY])
      }
    }





  }
  // Entered Room 
  function enteredRoom() {
    secretPassage.style.display = "none";
    clueSecretPassage.style.display = "none";
    if (player.room != null) {
      suggest.style.display = "block";
      placeDisplay.style.display = "block";
      placeName.innerHTML = `You are in the <span class="bolded-name">${player.room.spaceName ? player.room.spaceName : player.room.name}</span>`;
      if (player.room.passage != null) {
        secretPassage.style.display = "block";
        secretPassage.innerHTML = `<i class="fas fa-door-open"></i> Secret passage to <span class="bolded-name">${player.room.passage}</span>`;
        if (player.room.newPassage == null) {
          secretPassage.style.width = "200%";
        }
      }
      if (player.room.newPassage != null) {

        clueSecretPassage.style.display = "block";
        clueSecretPassage.innerHTML = `<i class="fas fa-door-open"></i> Secret passage to <span class="bolded-name">${player.room.newPassage}</span>`;
        if (player.room.passage != null) {
          clueSecretPassage.style.width = "100%";
          secretPassage.style.width = "100%";
        } else {
          clueSecretPassage.style.width = "200%";
        }
      }
      checkAllCollision();
    } else {
      suggest.style.display = "none";
      placeDisplay.style.display = "none";
    }

  }
  function exitRoom() {
    //console.log("Exiting")
    player.room = null;
    suggest.style.display = "none";
    placeDisplay.style.display = "none";
  }
  up.addEventListener("click", () => {
    if (player.upEnter != false) {
      player.stepsLeft -= 1;
      player.room = player.upEnter;
      enteredRoom()
    } else if (player.upExit == true) {
      exitRoom();
    }
    player.relY += 1;
    if (player.room == null) {
      player.stepsLeft -= 1;
    }
    checkAllCollision();
  });
  down.addEventListener("click", () => {
    if (player.downEnter != false) {
      player.stepsLeft -= 1;
      player.room = player.downEnter;
      enteredRoom()
    } else if (player.downExit == true) {
      exitRoom();
    }
    if (player.room == null) {
      player.stepsLeft -= 1;
    }
    player.relY -= 1;
    checkAllCollision();
  });
  left.addEventListener("click", () => {
    if (player.leftEnter != false) {
      player.stepsLeft -= 1;
      player.room = player.leftEnter;
      enteredRoom();
    } else if (player.leftExit == true) {
      exitRoom();
    }
    if (player.room == null) {
      player.stepsLeft -= 1;
    }
    player.relX -= 1;
    checkAllCollision();
  })
  right.addEventListener("click", () => {
    if (player.rightEnter != false) {
      player.stepsLeft -= 1;
      player.room = player.rightEnter;
      enteredRoom();
    } else if (player.rightExit == true) {
      exitRoom();
    }
    if (player.room == null) {
      player.stepsLeft -= 1;
    }
    player.relX += 1;
    checkAllCollision();
  });

  start.addEventListener("click", () => {
    socket.emit("start")
  });
  // Secret passage event listener
  secretPassage.addEventListener("click", () => {
    checkAllCollision();
    player.stepsLeft -= 1;
    let omgSecretPassage = false;
    rooms.forEach(room => {
      console.log(player.room.passage);
      if (omgSecretPassage == false && room.name == player.room.passage) {
        omgSecretPassage = true;
        player.room = room;
        const newPosition = chooseRandom(player.room.squares);
        player.relX = newPosition[0];
        player.relY = newPosition[1];
        enteredRoom();
      }
    })

  });
  clueSecretPassage.addEventListener("click", () => {
    checkAllCollision();
    player.stepsLeft -= 1;
    rooms.forEach(room => {
      if (room.name == player.room.newPassage) {
        player.room = room;
        const newPosition = chooseRandom(player.room.squares);
        player.relX = newPosition[0];
        player.relY = newPosition[1];
        enteredRoom();
      }
    })
  })

  suggest.addEventListener("click", () => {
    suggestNow.innerHTML = "Suggest"
    suggestHeading.innerHTML = "Suggest";
    suggestModal.style.display = "block";
    suggestPicker.style.display = "block";
    placeSuggested.innerHTML = `<div class="image-choice" id="${player.room.name}"><img src="images/${player.room.name}.png" alt="" height="200"></div>`
    suggest.style.display = "none";
  });
  // Suggest now
  suggestNow.addEventListener("click", () => {
    if (clueReveal == "suspect") {
      suggestPicker.style.display = "none";
      const person = currentPerson;
      socket.emit("revealThisCard", { card: person });
      clueReveal = false;
      suggestHeading.innerHTML = "Suggest";
      placeSuggested.style.display = "block";
      weaponRow.style.display = "block";
      suggestNow.innerHTML = "Suggest";

    } else if (clueReveal == "weapon") {
      suggestPicker.style.display = "none";
      const weapon = currentWeapon;
      socket.emit("revealThisCard", { card: weapon });
      clueReveal = false;
      suggestHeading.innerHTML = "Suggest";
      placeSuggested.style.display = "block";
      suspectRow.style.display = "block";
      suggestNow.innerHTML = "Suggest";
    } else {
      socket.emit("position", { x: player.relX, y: player.relY });
      const person = currentPerson;
      const weapon = currentWeapon;
      suggestModal.style.display = "none";
      suggestPicker.style.display = "none";
      placeDisplay.style.display = "none";
      if (isAccuse == true) {
        socket.emit("accuse", { person, weapon, place: player.room.name })
      } else {
        suggestDisplay.style.display = "block";
        suggestionImages.innerHTML =
          `
            <div class="image-choice"><img src="images/${person}.png" alt="${person}" height="200"></div>
            <div class="image-choice"><img src="images/${weapon}.png" alt="${weapon}" height="200"></div>
            <div class="image-choice"><img src="images/${player.room.name}.png" alt="${player.room.name}" height="200"></div>
            `;
        suggestionLabel.innerHTML = `You suggested:`;
        socket.emit("suggest", { person, weapon, place: player.room.name });
        socket.emit("positionNew", { user: person, room: player.room.name });
      }
    }
  });
  suggestX.addEventListener("click", () => {
    suggestPicker.style.display = "none";
    suggestModal.style.display = "none";
    suggest.style.display = "block";
  });
  // Roll Dice
  showDiceButton.addEventListener("click", () => {
    diceModal.style.display = "block";
    steps.style.display = "none";
    diceX.style.display = "none";

    setTimeout(() => {
      diceWav.play();
      let num1 = Math.floor(Math.random() * 6 + 1);
      let num2 = Math.floor(Math.random() * 6 + 1);

      const dice = [...document.querySelectorAll(".die-list")];
      dice[0].classList.toggle("odd-roll");
      dice[0].classList.toggle("even-roll");
      dice[0].dataset.roll = num1;

      dice[1].classList.toggle("odd-roll");
      dice[1].classList.toggle("even-roll");
      dice[1].dataset.roll = num2;
      setTimeout(() => {
        diceX.style.display = "block";
        let stepNum = num1 + num2;
        player.steps = stepNum;
        player.stepsLeft = stepNum;
        steps.style.display = "block";
        if ((num1 == 1 && num2 != 1) || (num2 == 1 && num1 != 1)) {
          numberOfClues = 1;
          clueNum.style.display = "block";
          clueNum.innerHTML = "One clue";
        } else if (num1 == 1 && num2 == 1) {
          clueNum.style.display = "block";
          clueNum.innerHTML = "Two clues";
          numberOfClues = 2;
        } else {
          numberOfClues = 0;
        }
        steps.innerHTML = `${stepNum} steps`;
        stepsLeft.innerHTML = `${player.steps} steps left`;
        socket.emit("rolled", { num1, num2 })
      }, 1500)
    }, 500)


  });
  diceX.addEventListener("click", () => {
    showDiceButton.style.display = "none";
    diceModal.style.display = "none";
    console.log(numberOfClues)
    if (numberOfClues == 1 || numberOfClues == 2) {
      clueNow = true;
      clueCardInner.style.transform = "rotateY(0deg)";
      clueContainer.style.display = "flex";
      flipMessage.innerHTML = "Flip a clue card";
      flipMessage.style.display = "block";
    } else {
      controls.style.display = "block";
      checkAllCollision();
    }
    clueNum.innerHTML = "";

  });

  //Clue Image event listener */

  clueImage.addEventListener("click", () => {
    if (clueNow == true) {
      socket.emit("gimmeClue");
    }
  });
  // Your clue
  socket.on("yourClue", ({ clue }) => {
    socket.emit("clue", { clue });
    flipMessage.innerHTML = "You got: "
    clueCard.innerHTML = `<img src="images/${clue}.png" alt="" height="200">`;
    clueCardInner.style.transform = "rotateY(180deg)";
    if (clue == "RevealLocationClue") {
      revealPlace.style.display = "block";
    } else if (clue == "RevealSuspectClue") {
      clueReveal = "suspect";
      suggestPicker.style.display = "block";
      weaponRow.style.display = "none";
      placeSuggested.style.display = "none";
      suggestHeading.innerHTML = "Reveal a suspect";
      suggestNow.innerHTML = "Reveal";
    } else if (clue == "RevealWeaponClue") {
      clueReveal = "weapon";
      suggestPicker.style.display = "block";
      suspectRow.style.display = "none";
      placeSuggested.style.display = "none";
      suggestHeading.innerHTML = "Reveal a weapon";
      suggestNow.innerHTML = "Reveal";
    } else if (clue == "SecretPassageClue") {
      revealPlace.style.display = "block";
      revealHeading.innerHTML = "Passage from: ";
      revealPlaceSubmit.innerHTML = "Next";
      passageClue = "from";
    } else if (clue == "AllRushClue") {
      revealPlace.style.display = "block";
      revealHeading.innerHTML = "All player rush to the room: ";
      passageClue = "rush"
    } else if (clue == "OneFaceUpClue") {
      userPicker.style.display = "block";
      userClue = "Pick One"
    } else if (clue == "BothDrawClue") {
      userPicker.style.display = "block";
      userClue = "Both Draw"
    }
    clueNow = false;
  })
  submitPosition.addEventListener("click", () => {
    controls.style.display = "none";
    stepsLeft.innerHTML = "";
    submitPosition.style.display = "none";
    player.origX = player.relX;
    player.origY = player.relY;
    socket.emit("position", {
      x: player.relX,
      y: player.relY
    });
    endButton.style.display = "block";
  });
  startOver.addEventListener("click", () => {
    player.room = null;
    rooms.forEach(room => {
      if (arrayInArray(room.squares, [player.origX, player.origY])) {
        player.room = room;
      }
    });
    enteredRoom();
    submitPosition.style.display = "none";
    player.stepsLeft = player.steps;
    stepsLeft.innerHTML = `${player.stepsLeft} steps left`;
    player.relX = player.origX;
    player.relY = player.origY;
    checkAllCollision(false);
  });
  function showCard(card) {
    hasShow.style.display = "none";
    socket.emit("show", { card });
    cardRoll.innerHTML = "";
    let cardRollHTML = "";
    userCards.forEach(card => {
      cardRollHTML += `<div class="image-choice card" id="${card}-card"><img src="images/${card}.png" alt="${card}" height="200"></div>`
    });
    cardRoll.innerHTML = cardRollHTML;
  }
  socket.on("suggest", ({ user, person, weapon, place }) => {
    suggest.style.display = "none";
    if (user.username != username) {
      rolledDisplay.style.display = "none";
      suggestDisplay.style.display = "block";
      suggestionImages.innerHTML =
        `
        <div class="image-choice"><img src="images/${person}.png" alt="${person}" height="200"></div>
        <div class="image-choice"><img src="images/${weapon}.png" alt="${weapon}" height="200"></div>
        <div class="image-choice"><img src="images/${place}.png" alt="${place}" height="200"></div>
        `;
      suggestionLabel.innerHTML = `${user.username} suggests:`;
      let hasCard = false;
      document.querySelectorAll(".card").forEach(card => {
        card.style.opacity = "0.5";
      })
      userCards.forEach(card => {
        if ((card == person || card == weapon) || card == place) {
          hasCard = true;
          document.getElementById(`${card}-card`).style.opacity = "100%";
          document.getElementById(`${card}-card`).addEventListener("click", () => showCard(card));
        }
      });
      hasShow.style.display = "block";
      if (hasCard == false) {
        //console.log("hasCard is false");
        hasShow.innerHTML = `You do not have something to show ${user.username}`;
        document.querySelectorAll(".card").forEach(card => {
          card.style.opacity = "1";
        })
        socket.emit("show", { card: null });
      } else {
        hasShow.innerHTML = `You have something to show ${user.username}`;
      }
      setTimeout(() => hasShow.style.display = "none", 3000)
    } else {
      controls.style.display = "none";
    }



  })

  socket.on("yourCards", ({ cards }) => {
    userCards = cards;
    socket.emit("position", {
      x: player.relX,
      y: player.relY
    })
    let cardRollHTML = "";
    cards.forEach(card => {
      cardRollHTML += `<div class="image-choice card" id="${card}-card"><img src="images/${card}.png" alt="${card}" height="200"></div>`
    });
    cardRoll.innerHTML = cardRollHTML;
    start.style.display = "none";
    leave.style.display = "block";
    gameContent.style.display = "block";
  });
  // Recieving users
  socket.on("users", ({ users }) => {
    allUsers = users;
    var toInputHTML = `<option value="Everyone" selected>Everyone</option>`;
    let userHTML = "";
    let userPickHTML = "";
    users.forEach(user => {
      userHTML += `<li class="user" id="${user.id}">${user.username} <img src="images/${user.suspect}-stand.png" alt="" height="16"> 
        <div class="speech-bubble">
            <button class="x speech-x">x</button>
            <div class="speech-image">
            <img src="images/Green.png" alt="" height="200"/></div>
        </div>
        <button class="reveal-button"><i class="fas fa-comments"></i></button>
        <div class="revealing speech-bubble"> <button class="reveal-x"><i class="fas fa-times"></i></button><div class="reveal-message">Not showing anything</div><div class="revealing-images"></div>  </div>
    </li>`;
      if (user.username != username) {
        toInputHTML += `<option value="${user.id}">${user.username}</option>`;
        userPickHTML += `<option value="${user.id}">${user.username}</option>`;
      }

    })
    toInput.innerHTML = toInputHTML;
    userList.innerHTML = userHTML;
    pickUserSelect.innerHTML = userPickHTML;
    document.querySelectorAll(".reveal-button").forEach(button => button.addEventListener("click", () => {
      button.parentElement.querySelector(".revealing").style.display = "block";
      button.style.display = "none";
    }));
    document.querySelectorAll(".reveal-x").forEach(button => button.addEventListener("click", () => {
      button.parentElement.style.display = "none";
      button.parentElement.parentElement.querySelector(".reveal-button").style.display = "inline-block";
    }));
  });


  socket.on("position", ({ user, x, y }) => {
    if (user.suspect !== player.name) {
      otherUsers.forEach(oldUser => {
        if (oldUser.name == user.suspect) {
          oldUser.relX = x;
          oldUser.relY = y;
        }
      });
    }

  })

  socket.on("whoseTurn", ({ user }) => {
    rolledDisplay.style.display = "none";
    suggestDisplay.style.display = "none";
    placeDisplay.style.display = "none";
    whoseTurn = user;
    document.querySelectorAll(".user").forEach(user => {
      user.style.backgroundColor = "black";
    })
    document.getElementById(user.id).style.backgroundColor = "#a1a1a1";
    if (user.username == username) {
      gameStatus.innerHTML = "Your Turn";
      showDiceButton.style.display = "block";
    } else {
      endButton.style.display = "none";
      controls.style.display = "none";
      gameStatus.innerHTML = `${user.username}'s Turn`
      showDiceButton.style.display = "none";
    }
  });

  socket.on("showing", ({ card, user }) => {
    // user is UNDEFINED WHATTTTT
    const speechBubble = document.getElementById(user.id).querySelector(".speech-bubble");
    speechBubble.style.display = "block";
    if (whoseTurn.username == username) {
      if (card == null) {
        speechBubble.querySelector(".speech-image").innerHTML = "Nothing to show you";
      } else {
        speechBubble.querySelector(".speech-image").innerHTML = `<img src="images/${card}.png" alt="" height="200"/></div>`;
      }
      speechBubble.querySelector(".x").style.display = "block";
      speechBubble.querySelector(".x").addEventListener("click", () => {
        speechBubble.style.display = "none";
        socket.emit("shown", { user })
      }, { once: true })
    } else {
      speechBubble.querySelector(".speech-x").style.display = "none";
      if (user.username == username) {
        if (card == null) {
          speechBubble.querySelector(".speech-image").innerHTML = `You had nothing to show ${whoseTurn.username}`;
        } else {
          speechBubble.querySelector(".speech-image").innerHTML = `
                <span style="display: block;">You showed this to ${whoseTurn.username}:</span>
                <img src="images/${card}.png" alt="" height="200"/></div>
                `
        }
      } else {
        if (card == null) {
          speechBubble.querySelector(".speech-image").innerHTML = `${user.username} had nothing to show ${whoseTurn.username}`;
        } else {
          speechBubble.querySelector(".speech-image").innerHTML = `
                    ${user.username} showed something to ${whoseTurn.username}
                `
        }
      }

    }
    //socket.emit("next");
  });
  socket.on("showNext", () => {
    endButton.disabled = false;
    endButton.style.display = "block";
  });
  endButton.onclick = () => {
    player.origX = player.relX;
    player.origY = player.relY;
    socket.emit("next");
  }
  // Recieving ecret passage clue
  socket.on("secretPassage", ({ from, to }) => {
    rooms.forEach(room => {
      if (room.name == from) {
        room.newPassage = to;
      } else if (room.name == to) {
        room.newPassage = from;
      }
    });
    flipMessage.innerHTML = `${whoseTurn.username == username ? "You" : whoseTurn.username} added a secret passage from ${addSpace(from)} to ${addSpace(to)}`;
  })
  // Reveal a card
  socket.on("revealUser", ({ user }) => {
    if (user.username == username) {
      flipMessage.innerHTML = `${whoseTurn.username} wants you to reveal a card`;
      hasShow.style.display = "block";
      hasShow.innerHTML = "Please reveal one card";
      userCards.forEach(card => {
        if (revealing.find(element => element == card) == undefined) {
          document.getElementById(`${card}-card`).addEventListener("click", (e) => {
            revealing.push(card)
            hasShow.style.display = "none";
            socket.emit("revealCard", ({ card }));
            cardRoll.innerHTML = "";
            userCards.forEach(card => {
              cardRoll.innerHTML += `<div class="image-choice card" id="${card}-card"><img src="images/${card}.png" alt="${card}" height="200"></div>`
            });
          });
        } else {
          document.getElementById(`${card}-card`).style.opacity = "0.5";
        }

      })
    } else {
      flipMessage.innerHTML = `${whoseTurn.username} wants ${user.username} to reveal a card`;
    }

  });
  // Both Draw
  socket.on("bothDraw", ({ user1, user2 }) => {
    flipMessage.innerHTML = `${user1.username} and ${user2.username} will draw a card at random`
    if (username == user1.username) {
      const card = chooseRandom(userCards);
      socket.emit("randomCard", ({ card, user: user2 }));
      const speechBubble = document.getElementById(user1.id).querySelector(".speech-bubble");
      speechBubble.style.display = "block";
      speechBubble.querySelector(".speech-image").innerHTML = `
        <span style="display: block;">${user2.username} saw this:</span>
        <img src="images/${card}.png" alt="" height="200"/></div>;
        `;
      setTimeout(() => {
        socket.emit("clueDone", {howManyClues: numberOfClues});
         numberOfClues--;
        speechBubble.style.display = "none";
      }
      , 3000);
    } else if (username == user2.username) {
      const card = chooseRandom(userCards);
      socket.emit("randomCard", ({ card, user: user1 }));
      const speechBubble = document.getElementById(user2.id).querySelector(".speech-bubble");
      speechBubble.style.display = "block";
      speechBubble.querySelector(".speech-image").innerHTML = `
        <span style="display: block;">${user1.username} saw this:</span>
        <img src="images/${card}.png" alt="" height="200"/></div>
        `;
      setTimeout(() => speechBubble.style.display = "none", 3000);
    }
  });
  socket.on("shownRandomCard", ({ card, user }) => {
    const speechBubble = document.getElementById(user.id).querySelector(".speech-bubble");
    speechBubble.style.display = "block";
    speechBubble.querySelector(".speech-image").innerHTML = `<img src="images/${card}.png" alt="" height="200"/></div>`;
    speechBubble.querySelector(".x").style.display = "block";
    speechBubble.querySelector(".x").addEventListener("click", () => {
      speechBubble.style.display = "none";
      socket.emit("drawDone");
    }, { once: true })
  })
  // Showing Clue
  socket.on("clueShow", ({ clue }) => {
    if (whoseTurn.username != username) {
      clueContainer.style.display = "flex";
      flipMessage.style.display = "block";
      flipMessage.innerHTML = `${whoseTurn.username} got a clue: `;
      // clueImage.innerHTML = `<img src="images/${clue}.png" alt="" height="200"></img>`;
      clueCard.innerHTML = `<img src="images/${clue}.png" alt="" height="200">`;
      clueCardInner.style.transform = "rotateY(180deg)";
    }
    if (clue == "AllRevealClue") {
      hasShow.style.display = "block";
      hasShow.innerHTML = "Please reveal one card";
      userCards.forEach(card => {
        if (revealing.find(element => element == card) == undefined) {
          document.getElementById(`${card}-card`).addEventListener("click", (e) => {
            revealing.push(card)
            hasShow.style.display = "none";
            socket.emit("revealCard", ({ card }));
            cardRoll.innerHTML = "";
            userCards.forEach(card => {
              cardRoll.innerHTML += `<div class="image-choice card" id="${card}-card"><img src="images/${card}.png" alt="${card}" height="200"></div>`
            });
          });
        } else {
          document.getElementById(`${card}-card`).style.opacity = "0.5";
        }

      })
    }
    else if (clue == "ShowLeftClue") {
      hasShow.style.display = "block";
      for (let index = 0; index < allUsers.length; index++) {
        const element = allUsers[index];
        if (element.username == username) {
          hasShow.innerHTML = `Please show one card to ${allUsers[(index - 1 + allUsers.length) % allUsers.length].username}`;
        }
      }
      userCards.forEach(card => {
        if (revealing.find(element => element == card) == undefined) {
          document.getElementById(`${card}-card`).addEventListener("click", () => {
            hasShow.style.display = "none";
            socket.emit("showLeft", ({ card }));
            cardRoll.innerHTML = "";
            userCards.forEach(card => {
              cardRoll.innerHTML += `<div class="image-choice card" id="${card}-card"><img src="images/${card}.png" alt="${card}" height="200"></div>`
            });
          });
        } else {
          document.getElementById(`${card}-card`).style.opacity = "0.5";
        }

      })
    }

  });
  // Show Left
  socket.on("showLeft", ({ card, user }) => {
    //console.log(user.username);
    //console.log(username)
    if (user.username == username) {

      const speechBubble = document.getElementById(user.id).querySelector(".speech-bubble");
      speechBubble.style.display = "block";
      speechBubble.querySelector(".speech-image").innerHTML = `<img src="images/${card}.png" alt="" height="200"/></div>`;
      speechBubble.querySelector(".x").style.display = "block";
      speechBubble.querySelector(".x").addEventListener("click", () => {
        speechBubble.style.display = "none";
        socket.emit("shownLeft", { user });
      }, { once: true })
    }
  })
  socket.on("startOver", () => {
    userCards = [];
    otherUsers = [];
    position = playerPosition(person);
    player = new Player(Icon, person, position[0], position[1]);
    clueContainer.style.display = "none";
    clueCard.innerHTML = `<img src="images/clue_card_back.png" alt="" height="200">`;
    suggestPicker.style.display = "none";
    controls.style.display = "none";
    gameContent.style.display = "none";
    gameStatus.innerHTML = "Game was ended";
    start.style.display = "block";
    leave.style.display = "none";
    suggestDisplay.style.display = "none";
    rolledDisplay.style.display = "none";

  })
  socket.on("notEnoughPlayers", () => {
    error.style.display = "block";
    setTimeout(() => error.style.display = "none", 3000)
  });
  socket.on("rolled", ({ num1, num2 }) => {
    if (whoseTurn.username != username) {
      rolledDisplay.style.display = "block";
      rolledLabel.innerHTML = `${whoseTurn.username} rolled: `;
      diceImages.innerHTML = `
            <div class="image-choice"><img src="images/dice_${num1}.png" alt="" height="100"></div>
            <div class="image-choice"><img src="images/dice_${num2}.png" alt="" height="100"></div>
        `
    }
  });
  socket.on("shown", ({ user }) => {
    document.getElementById(user.id).querySelector(".speech-bubble").style.display = "none";
  });
  socket.on("newPosition", ({ room }) => {
    console.log("rooMMMMM");
    console.log(room);
    player.room = room;
    let availableSquares = rooms.find(element => element.name == room).squares;

    otherUsers.forEach(otherUser => {
      console.log("arrayINARRay")
      console.log(availableSquares);
      console.log(` [${otherUser.relX}, ${otherUser.relY}]`)
      if (arrayInArray(availableSquares, [otherUser.relX, otherUser.relY])) {
        availableSquares = removeElement(availableSquares, [otherUser.relX, otherUser.relY]);
      }
    })
    const newPosition = chooseRandom(availableSquares);
    player.relX = newPosition[0];
    player.relY = newPosition[1];
    player.origX = newPosition[0];
    player.origY = newPosition[1];
    checkAllCollision();
    socket.emit("position", { x: player.relX, y: player.relY })
  });

  socket.on("revealed", ({ user, card }) => {
    const userE = document.getElementById(user.id);
    const littleCardRoll = userE.querySelector(".revealing-images");
    const revealMessage = userE.querySelector(".reveal-message");
    revealMessage.innerHTML = "";
    littleCardRoll.parentElement.style.display = "block";
    littleCardRoll.innerHTML += `<img src="images/${card}.png" alt="" height="200"/>`;
  });
  socket.on("clueDone", ({ user, howManyClues}) => {
    
    if(howManyClues == "dummy"){
      if(whoseTurn.username == username){
        socket.emit("clueDone", {howManyClues: numberOfClues});
        numberOfClues--;
      }
    }else {
      console.log("CLUE DONE")
      if (whoseTurn.username == username) {
        if (howManyClues == 2) {
          clueCardInner.style.transform = "rotateY(0deg)";
          flipMessage.innerHTML = "You have a second clue";
          clueNow = true;
        } else {
          clueContainer.style.display = "none";
          clueCard.innerHTML = `<img src="images/clue_card_back.png" alt="" height="200">`;
          controls.style.display = "block";
          checkAllCollision();
        }
      } 
      else {
        if (howManyClues == 2) {
          flipMessage.innerHTML = "Second clue";
          clueCard.innerHTML = `<img src="images/clue_card_back.png" alt="" height="200">`;
        } else {
          clueCard.innerHTML = `<img src="images/clue_card_back.png" alt="" height="200">`;
          clueContainer.style.display = "none";
        }

      }
      setTimeout(() => { hasShow.style.display = "none"; }, 2000)
    }
  });
  socket.on("revealThisCard", ({ card }) => {
    flipMessage.innerHTML = `${whoseTurn.username} wants to reveal ${addSpace(card)}`;
    if (userCards.find(element => element == card) == undefined) {
      socket.emit("nothingToReveal", { card });
    } else {
      socket.emit("revealACard", { card });
      socket.emit("revealDone");
    }
  });
  socket.on("nothingToReveal", ({ card }) => {
    hasShow.style.display = "block";
    hasShow.innerHTML = `Nobody has the card ${card}`;

  });
  socket.on("accused", ({ accused, real, user }) => {
    accuseUsername.innerHTML = `${user.username == username ? "You" : user.username} accuse: `
    accuseContainer.style.display = "block";
    suspectAccuse.innerHTML = accused.person;
    weaponAccuse.innerHTML = accused.weapon;
    placeAccuse.innerHTML = accused.place;
    suspectEnvelope.innerHTML = `<img src="images/${real.person}.png" alt="" height="200" width="130" >`;
    weaponEnvelope.innerHTML = `<img src="images/${real.weapon}.png" alt="" height="200" width="130" >`;
    placeEnvelope.innerHTML = `<img src="images/${real.place}.png" alt="" height="200" width="130" >`;
    setTimeout(() => {
      suspectEnvelope.style.display = "block";
      weaponEnvelope.style.display = "block";
      placeEnvelope.style.display = "block";
      document.querySelectorAll(".user").forEach(user => {
        user.style.backgroundColor = "black";
        user.querySelector(".revealing").innerHTML = `<button class="reveal-x"><i class="fas fa-times"></i></button><div class="reveal-message">Not showing anything</div><div class="revealing-images"></div>`;
      });
      userCards = [];
      otherUsers = [];
      position = playerPosition(person);
      player = new Player(Icon, person, position[0], position[1]);
      clueContainer.style.display = "none";
      suggestPicker.style.display = "none";
      controls.style.display = "none";
      gameContent.style.display = "none";
      if (accused.person == real.person && accused.weapon == real.weapon && accused.place == real.place) {
        if (user.username == username) {
          gameStatus.innerHTML = "You Win!";
          socket.emit("W");
        } else {
          gameStatus.innerHTML = `${user.username} Wins`;
        }
      } else {
        if (user.username == username) {
          gameStatus.innerHTML = "You Lose";
          socket.emit("L");
        } else {
          gameStatus.innerHTML = `${user.username} Loses`;
        }
      }
      start.style.display = "block";
      leave.style.display = "none";
      suggestDisplay.style.display = "none";
      rolledDisplay.style.display = "none";
      setTimeout(() => { accuseContainer.style.display = "none" }, 3000)
    }, 1000);
  })
  socket.on("disconnected", ({user}) => {
    console.log(user);
    console.log(allUsers);
    allUsers.forEach(allUs =>{
      if(user.username == allUs.username) {
        console.log(user.username);
        console.log(allUs.id)
        document.getElementById(allUs.id).classList.add("disconnected");
      } 
    } )
  });
  // socket.on("disconnect", () => {
  //   socket.emit("info", {
  //     location: 
  //   })
  // });
  document.getElementById("leave-game").onclick = () => socket.emit("killGame");
  socket.on("log", ({ message }) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.pitch = 1.5;
      speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support the Web Speech API.");
    }
    log.innerHTML += `<div class="log-message">${message}</div>`;
  })
};
