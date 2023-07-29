const sound = {
  lvl1_5: document.getElementById("level-1-5"),
  lvl_11_15: document.getElementById("level-11-15"),
  lvl_6_10: document.getElementById("level-6-10"),
  letsPlay6: document.getElementById("6-let's-play"),
  finalAnswer: document.getElementById("final-answer"),
  win15: document.getElementById("15-win"),
  correct: document.getElementById("correct"),
  levelUp: document.getElementById("level-up"),
  lose: document.getElementById("lose"),
  letsPlay10: document.getElementById("10-let's-play"),
  fullTheme: document.getElementById("full-theme"),
  ata: document.getElementById("music-ata"),
  ff: document.getElementById("music-ff"),
};
const labelText = document.getElementById("text-label");
const pafVideo = document.getElementById("paf-video");

const scoreboard = {
  level1: document.getElementById("li-score-1"),
  level2: document.getElementById("li-score-2"),
  level3: document.getElementById("li-score-3"),
  level4: document.getElementById("li-score-4"),
  level5: document.getElementById("li-score-5"),
  level6: document.getElementById("li-score-6"),
  level7: document.getElementById("li-score-7"),
  level8: document.getElementById("li-score-8"),
  level9: document.getElementById("li-score-9"),
  level10: document.getElementById("li-score-10"),
  level11: document.getElementById("li-score-11"),
  level12: document.getElementById("li-score-12"),
  level13: document.getElementById("li-score-13"),
  level14: document.getElementById("li-score-14"),
  level15: document.getElementById("li-score-15"),
};

const quiz = {
  question: document.getElementById("text-question"),
  a: document.getElementById("text-option-a"),
  b: document.getElementById("text-option-b"),
  c: document.getElementById("text-option-c"),
  d: document.getElementById("text-option-d"),
};

const buttons = {
  a: document.getElementById("div-option-a"),
  b: document.getElementById("div-option-b"),
  c: document.getElementById("div-option-c"),
  d: document.getElementById("div-option-d"),
  label: document.getElementById("div-label"),
  ff: document.getElementById("life-line-5050"),
  paf: document.getElementById("life-line-paf"),
  ata: document.getElementById("life-line-ata"),
};

let stats = {
  level: 0,
  isGameOver: false,
  ffIsUsed: false,
  ataIsUsed: false,
  pafIsUsed: false,
  clickedOption: "",
  musicIsPlaying: false,
  bgMusic: "",
  soundEffect: "",
  soundEffectIsPlaying: false,
  isMuted: false,
  called: false,
};

let questions = {};

const fiftyFifty = () => {
  stats.ffIsUsed = true;
  buttons.ff.classList.remove("fifty-fifty-normal");
  buttons.ff.classList.add("fifty-fifty-used");
  stopMusic();
  sound.ff.play();

  const currentAnswerKey = questions[stats.level].answer;
  const options = ["a", "b", "c", "d"];
  let twoWrongAnswers = [];

  while (twoWrongAnswers.length < 2) {
    const randomIndex = Math.floor(Math.random() * 4);
    const randomOption = options[randomIndex];
    if (
      randomOption !== currentAnswerKey &&
      !twoWrongAnswers.includes(randomOption)
    ) {
      twoWrongAnswers.push(randomOption);
    }
  }

  for (let i = 0; i < 2; i++) {
    quiz[twoWrongAnswers[i]].innerText = "_";
  }
};

const endTheCall = () => {
  pafVideo.pause();
  pafVideo.style.visibility = "hidden";
};

const makeThePhoneCall = () => {
  stopMusic();
  pafVideo.play();
  hideLabel();
  showQuizDiv();
  stats.called = true;
  pafVideo.style.visibility = "visible";
  setTimeout(() => {
    endTheCall();
  }, 45000);
};

const phoneAFriend = () => {
  stats.pafIsUsed = true;
  buttons.paf.classList.remove("paf-normal");
  buttons.paf.classList.add("paf-used");

  showLabel("Phone A friend");

  setTimeout(() => {
    hideLabel();
  }, 2000);
};

const askTheAudience = () => {
  stats.ataIsUsed = true;
  buttons.ata.classList.remove("ata-normal");
  buttons.ata.classList.add("ata-used");

  showLabel("Millioaires, Vote Now!");

  setTimeout(() => {
    hideLabel();
  }, 2000);

  stopMusic();
  sound.ata.play();

  setTimeout(() => {
    playMusic();
  }, 35000);
};

const resetLifeLines = () => {
  buttons.ata.classList.add("ata-normal");
  buttons.ff.classList.add("fifty-fifty-normal");
  buttons.paf.classList.add("paf-normal");
};

const showLabel = (message) => {
  buttons.label.style.visibility = "visible";
  labelText.innerText = message;
  setTimeout(() => {
    hideLabel();
  }, 6000);
};

const hideLabel = (message) => {
  buttons.label.style.visibility = "hidden";
};

const getQuestionsFromStudentName = (studentName) => {
  let questions = {};
  if (window.localStorage.getItem(studentName)) {
    questions = window.localStorage.getItem(studentName);
    questions = JSON.parse(questions);
  }
  return questions;
};

const stopMusic = () => {
  if (stats.bgMusic !== "") {
    sound[stats.bgMusic].pause();
    stats.musicIsPlaying = false;
  }
};

const stopSoundEffect = () => {
  if (stats.soundEffect !== "") {
    sound[stats.soundEffect].pause();
    sound[stats.soundEffect].currentTime = 0;
    stats.soundEffectIsPlaying = false;
    stats.soundEffect = "";
  }
};
const playMusic = () => {
  if (stats.bgMusic !== "") {
    if (!stats.isMuted) {
      sound[stats.bgMusic].play();
      stats.musicIsPlaying = true;
    }
  }
};

const startTheGame = () => {
  //start the game

  questions = getQuestionsFromStudentName(student);
  resetLifeLines();
  showLabel(student);
  sound.levelUp.play();
  // prepare the stats
  //
};

const changeToTheNextLevel = () => {
  if (stats.level % 5 > 0) {
    if (stats.level % 5 === 0) {
      scoreboard["level" + stats.level].classList.add("li-orange");
      scoreboard["level" + stats.level].classList.remove("li-white");
    }

    scoreboard["level" + stats.level].classList.remove("li-active");
    scoreboard["level" + stats.level].classList.add("li-passive");
  }

  if (stats.level < 15) {
    stats.level = stats.level + 1;
  }
  if (stats.level % 5 === 1 && stats.level > 1) {
    scoreboard["level" + (stats.level - 1)].classList.remove("li-active");
    scoreboard["level" + (stats.level - 1)].classList.add("li-passive");
  }
  if (stats.level % 5 === 0) {
    scoreboard["level" + stats.level].classList.remove("li-orange");
    scoreboard["level" + stats.level].classList.add("li-white");
  }
  scoreboard["level" + stats.level].classList.add("li-active");
  scoreboard["level" + stats.level].classList.remove("li-passive");
  if (stats.level % 5 === 1 && stats.level > 1) {
    sound.levelUp.play();
  }

  if (stats.level === 1) {
    stats.bgMusic = "lvl1_5";
    stopMusic();
    setTimeout(() => {
      playMusic();
    }, 6000);
    stats.musicIsPlaying = true;
  } else if (stats.level === 6) {
    stopMusic();
    stats.bgMusic = "lvl_6_10";
    setTimeout(() => {
      playMusic();
    }, 6000);

    stats.musicIsPlaying = true;
  } else if (stats.level === 11) {
    stopMusic();
    stats.bgMusic = "lvl_11_15";
    setTimeout(() => {
      playMusic();
    }, 6000);

    stats.musicIsPlaying = true;
  } else {
    playMusic();
  }
};

resetOptionColors = () => {
  buttons.a.className = "option option-right option-a option-regular";
  buttons.c.className = "option option-right option-b option-regular";
  buttons.b.className = "option option-right option-b option-regular";
  buttons.d.className = "option option-right option-c option-regular";
};

const nextQuestion = () => {
  hideLabel();
  showQuizDiv();
  resetOptionColors();
  changeToTheNextLevel();
  stopSoundEffect();

  quiz.question.innerText = questions[stats.level].question;
  quiz.a.innerText = questions[stats.level].a;
  quiz.b.innerText = questions[stats.level].b;
  quiz.c.innerText = questions[stats.level].c;
  quiz.d.innerText = questions[stats.level].d;

  if (stats.level % 5 == 1 || stats.level == 11) {
    stopMusic();
    sound.letsPlay6.play();
    setTimeout(() => {
      sound.letsPlay6.pause();
      sound.letsPlay6.currentTime = 0;
      playMusic();
    }, 4000);
  } else if (stats.level > 12) {
    stopMusic();
    sound.letsPlay6.play();
    setTimeout(() => {
      sound.letsPlay10.pause();
      sound.letsPlay10.currentTime = 0;
      playMusic();
    }, 4000);
  }
};

const correctAnswer = () => {
  sound[stats.bgMusic].pause();
  if (stats.level % 5 !== 0) {
    sound.correct.play();
    stats.soundEffect = "correct";
    setTimeout(() => {
      showScoreDiv();
      setTimeout(() => {
        hideScoreDiv();
      }, 5000);
    }, 1000);
  } else {
    if (stats.level === 5 || stats.level === 10) {
      sound.levelUp.play();
      stats.soundEffect = "levelUp";
      setTimeout(() => {
        hideQuizDiv();
        showLabel("20");
      }, 1000);
      if (stats.level == 10) {
        hideQuizDiv();
        setTimeout(() => {
          hideQuizDiv();
          showLabel("200");
        }, 1000);
      }
    } else if (stats.level === 15) {
      sound.win15.play();
      stats.soundEffect = "win15";
      setTimeout(() => {
        hideQuizDiv();
        showLabel("Winner! 1000 baht");
      }, 1000);
    }
  }

  resetOptionColors();

  buttons[stats.clickedOption].classList.remove("option-regular");
  buttons[stats.clickedOption].classList.add("option-correct");
};

const incorrectAnswer = () => {
  sound[stats.bgMusic].pause();
  sound.lose.play();
  stats.soundEffect = "lose";

  resetOptionColors();

  buttons[stats.clickedOption].classList.remove("option-regular");
  buttons[stats.clickedOption].classList.add("option-incorrect");
};

const evaluateAnswer = (selectedAnswer, answerKey) => {
  if (selectedAnswer === answerKey) {
    correctAnswer();
  } else {
    incorrectAnswer();
  }
  stats.clickedOption = "";
};

const selectAnswer = (option) => {
  resetOptionColors();
  stopSoundEffect();

  if (option !== stats.clickedOption) {
    sound.finalAnswer.play();
    stats.soundEffect = "finalAnswer";
    sound[stats.bgMusic].pause();

    buttons[option].classList.remove("option-regular");
    buttons[option].classList.add("option-select");
    stats.clickedOption = option;
  } else {
    evaluateAnswer(option, questions[stats.level].answer);
  }
};

document.addEventListener("keydown", function (event) {
  if (event.key === "n") {
    nextQuestion();
  }

  if (event.key == "o") {
    selectAnswer("a");
  } else if (event.key == "p") {
    selectAnswer("b");
  } else if (event.key == "[") {
    selectAnswer("c");
  }
  if (event.key == "]") {
    selectAnswer("d");
  }
  if (event.key == "m") {
    if (stats.musicIsPlaying) {
      stopMusic();
      stats.isMuted = true;
    } else {
      stats.isMuted = false;
      playMusic();
    }
  }
  if (event.key == "t" && !stats.pafIsUsed) {
    phoneAFriend();
  } else if (event.key == "t" && !stats.called) {
    makeThePhoneCall();
  } else if (stats.called && event.key === "f") {
    endTheCall();
  }
  if (event.key == "r" && !stats.ffIsUsed) {
    fiftyFifty();
  }

  if (event.key == "y" && !stats.ataIsUsed) {
    askTheAudience();
  }

  if (event.key == "k") {
    startTheGame();
  }
});
