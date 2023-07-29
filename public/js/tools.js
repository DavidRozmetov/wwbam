const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const student = urlParams.get("student");

const quizDiv = document.getElementById("div-quiz");
const scoreDiv = document.getElementById("div-score-board");
const lifeLinesDiv = document.getElementById("div-life-lines");
const webCam = document.getElementById("webCam");

let quizIsVisible = false;
let scoreIsVisible = false;
let lifeLinesIsVisible = false;
let webCamIsVisible = false;

const showQuizDiv = () => {
  quizDiv.style.visibility = "visible";
  quizIsVisible = !quizIsVisible;
};

const hideQuizDiv = () => {
  quizDiv.style.visibility = "hidden";
  quizIsVisible = !quizIsVisible;
};

const showScoreDiv = () => {
  scoreDiv.style.visibility = "visible";
  scoreIsVisible = !scoreIsVisible;

  setTimeout(() => {
    hideScoreDiv();
  }, 3000);
};

const hideScoreDiv = () => {
  scoreDiv.style.visibility = "hidden";
  scoreIsVisible = !scoreIsVisible;
};
const showLifeLinesDiv = () => {
  lifeLinesDiv.style.visibility = "visible";
  lifeLinesIsVisible = !lifeLinesIsVisible;
  setTimeout(() => {
    hideLifeLinesDiv();
  }, 3000);
};

const hideLifeLinesDiv = () => {
  lifeLinesDiv.style.visibility = "hidden";
  lifeLinesIsVisible = !lifeLinesIsVisible;
};

const showWebCam = () => {
  webCam.style.visibility = "visible";
};

const hideWebCam = () => {
  webCam.style.visibility = "hidden";
};

document.addEventListener("keydown", function (event) {
  if (event.key === "q") {
    if (quizIsVisible) {
      hideQuizDiv();
    } else {
      showQuizDiv();
    }
  }

  if (event.key === "w") {
    if (scoreIsVisible) {
      hideScoreDiv();
    } else {
      showScoreDiv();
    }
  }

  if (event.key === "e") {
    if (lifeLinesIsVisible) {
      hideLifeLinesDiv();
    } else {
      showLifeLinesDiv();
    }
  }

  if (event.key === "/") {
    if (!webCamIsVisible) {
      showWebCam();
    } else {
      hideWebCam();
    }
    webCamIsVisible = !webCamIsVisible;
  }
});
