//VARIABLE DECLARATION PART

let frontpage = document.querySelector(".front-page");
let playbutton = document.querySelector(".play");
let levelpage = document.querySelector(".levelpg");
let startbtn = document.querySelector(".startbtn");
let maingame = document.querySelector(".maingame");
let easybtn = document.querySelector(".easy");
let mediumbtn = document.querySelector(".medium");
let hardbtn = document.querySelector(".hard");
let nextbtn = document.querySelector(".nextbtn");
let pagecount = document.querySelector('.gamepagecount');
let getnumberdiv = document.querySelector('.numberbtn').children;
let resultpg = document.querySelector('.resultpage');
let backhome = document.querySelector('.backhome');
let finalscore = document.querySelector('.score');
let resulttext = resultpg.children[1];
let changeimg = document.querySelector('.resultpage img');


// PLAYBUTTON CLICK

playbutton.addEventListener("click", () => {
  frontpage.classList.add("hidden");
  levelpage.classList.remove("hidden");
  levelpage.classList.add("visibility");
});

//GAME START FUNCTION

function startGame(level) {
  if (level == "easy") {
    mediumbtn.disabled = true;
    hardbtn.disabled = true;
    easybtn.disabled = true;
    easybtn.classList.add('levelcolor');

    startbtn.addEventListener("click", () => {
      pagecount.innerHTML = `1 of 10`;
      nextbtn.disabled = true

      levelChange(4);
      gameInterfaceChange()
      mainGame(10);

      //NEXTBUTTON FUNCTION 

      nextbtn.addEventListener('click', () => {

        enableBtn(4)
        pageCount(10);
        mainGame(10);
      })

    });
  }
  else if (level == "medium") {
    mediumbtn.disabled = true;
    hardbtn.disabled = true;
    easybtn.disabled = true;
    mediumbtn.classList.add('levelcolor');


    startbtn.addEventListener("click", () => {
      pagecount.innerHTML = `1 of 15`;
      nextbtn.disabled = true

      levelChange(8);
      gameInterfaceChange();
      maingame.style.top = "20%";
      mainGame(20);

      //NEXTBUTTON FUNCTION 

      nextbtn.addEventListener('click', () => {

        enableBtn(8)
        pageCount(15)
        mainGame(20);

      })
    });
  }
  else if (level == "hard") {
    mediumbtn.disabled = true;
    hardbtn.disabled = true;
    easybtn.disabled = true;
    hardbtn.classList.add('levelcolor');


    startbtn.addEventListener("click", () => {
      pagecount.innerHTML = `1 of 20`;
      nextbtn.disabled = true

      levelChange(12);
      gameInterfaceChange();
      maingame.style.top = "12%";
      mainGame(30);

      //NEXTBUTTON FUNCTION 

      nextbtn.addEventListener('click', () => {

        enableBtn(12)
        pageCount(20)
        mainGame(30);

      })
    });
  }
}

//PAGE SLIDING FUNCTION

function gameInterfaceChange() {
  levelpage.classList.remove("hidden");
  levelpage.classList.add("hidden");
  maingame.classList.remove("hidden");
  maingame.style.top = "25%";
  maingame.classList.add("visibility");
}


// FUNCTION OF RANDOM INPUTING NUMBER IN DIV 

function mainGame(maxnum) {

  let numboxlen = getnumberdiv.length;
  let wrongnum = Math.floor(Math.random() * maxnum) + 1;
  let getnumber = [];

  //DUPLICATE RANDOM NUMBER CHECKING

  for (let i = 0; i < numboxlen; i++) {
    let check = getnumber.includes(wrongnum);

    if (check === false) {
      getnumber.push(wrongnum);

    }
    else {
      while (check === true) {
        wrongnum = Math.floor(Math.random() * maxnum) + 1;
        check = getnumber.includes(wrongnum);
        if (check === false) {
          getnumber.push(wrongnum);
        }
      }
    }
  }

  // NUMBER PUTTING IN InnerHtml

  for (var j = 0; j < numboxlen; j++) {
    if (getnumber[j] < 10) {
      getnumberdiv[j].innerHTML = '0' + getnumber[j];

    }
    else {
      getnumberdiv[j].innerHTML = getnumber[j];
    }
  }

}

// BUTTON ADDING ACCORDING TO THE LEVEL 

function levelChange(divnum) {
  for (let index = 0; index < divnum; index++) {
    let newBtn = document.createElement('button');
    let newbtnNode = document.createTextNode('');
    newBtn.appendChild(newbtnNode);
    let gamebtn = document.getElementById('numbrbtn');
    gamebtn.appendChild(newBtn);
    newBtn.setAttribute("onclick", `numberClick(${index},${divnum})`);

  }
}

//RIGHT - WRONG CHECKING FUNTION 

var right = 0;
var wrong = 0;


function numberClick(index, divnum) {

  let rightnumberindex = Math.floor(Math.random() * divnum);

  if (index == rightnumberindex) {

    nextbtn.disabled = false
    right++;

    //RIGHT AND WRONG BACKGROUND ADDING AND BUTTON DISABLE

    getnumberdiv[index].classList.add("rightans");

    for (let i = 0; i < divnum; i++) {
      getnumberdiv[i].disabled = true;
    }
  }
  else {

    nextbtn.disabled = false
    wrong++;

    //RIGHT AND WRONG BACKGROUND ADDING AND BUTTON DISABLE

    getnumberdiv[rightnumberindex].classList.add("rightans");
    getnumberdiv[index].classList.add("wrongans");

    for (let i = 0; i < divnum; i++) {
      getnumberdiv[i].disabled = true;
    }
  }
}

// BUTTON ENABLE ON NEXT BUTTION CLICK

function enableBtn(divnum) {

  for (let i = 0; i < divnum; i++) {

    nextbtn.disabled = true
    getnumberdiv[i].disabled = false;
    getnumberdiv[i].classList.remove("wrongans");
    getnumberdiv[i].classList.remove("rightans");

  }
}


//PAGE COUNTING ACCORDING TO THE LEVEL

let currentpg = 1;

function pageCount(levelPg) {

  currentpg++;

  if (currentpg <= levelPg) {
    if (currentpg == levelPg) {
      nextbtn.innerHTML = 'Result'
      pagecount.innerHTML = `${currentpg} of ${levelPg}`;
    }
    else {
      pagecount.innerHTML = `${currentpg} of ${levelPg}`;
    }
  }
  else {
    result();
  }

}

//FINAL RESULT FUNTION

function result() {

  maingame.classList.remove("visibility");
  maingame.classList.add("hidden");
  resultpg.classList.remove('hidden')
  resultpg.classList.add('visibility')

  if (right > wrong) {
    changeimg.setAttribute('src', 'trophy.png')
    resulttext.innerHTML = `You Win`;
    finalscore.innerHTML = `Your Right Score  is : ${right} out of ${right + wrong}`;
  }

  else if (right == wrong) {
    changeimg.setAttribute('src', 'draw.png')
    resulttext.innerHTML = `It's Draw`;
    finalscore.innerHTML = `Your Right Score  is : ${right} out of ${right + wrong}`;
  }

  else if (right < wrong) {
    changeimg.setAttribute('src', 'lose.png')
    resulttext.innerHTML = `You Lose`;
    finalscore.innerHTML = `Your Right Score  is : ${right} out of ${right + wrong}`;
  }
}


//BACK TO THE HOME FUNCTION

backhome.addEventListener('click', () => {
  frontpage.classList.add("visibility");
  frontpage.classList.remove("hidden");
  resultpg.classList.add('hidden')
  resultpg.classList.remove('visibility')

  window.location.reload();

})