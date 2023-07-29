const getQuestionsFromStudentName = (studentName) => {
  let questions = {};
  if (window.localStorage.getItem(selectStudent.value)) {
    questions = window.localStorage.getItem(studentName);
    questions = JSON.parse(questions);
  }
  return questions;
};

const getOneQuestionFromStudentName = (studentName, questionNumber) => {
  let questions = getQuestionsFromStudentName(studentName);
  return questions[questionNumber];
};

const deleteQuestion = (studentName, level) => {
  let questions = getQuestionsFromStudentName(studentName);
  delete questions[level];
  window.localStorage.setItem(studentName, JSON.stringify(questions));
  getMissingLevelsFromStudentName(selectStudent.value);
};

const getMissingLevelsFromStudentName = (studentName) => {
  const levelOptions = document.getElementById("select-level");
  const questions = getQuestionsFromStudentName(studentName);
  const questionNumbersArray = Object.getOwnPropertyNames(questions);
  let questionsList = document.getElementById("ol-questins");
  questionsList.innerHTML = "";
  let missingQuestions = [];
  levelOptions.innerHTML = "";
  for (a = 1; a <= 15; a++) {
    if (!questionNumbersArray.includes(a + "")) {
      missingQuestions.push(a);
      levelOptions.innerHTML += `<option value="${a}">${a}</option>`;
    } else {
      const question = getOneQuestionFromStudentName(studentName, a);
      displayQuestion(question, a);
    }
  }
};

const addQuestionToLocalStorage = (studentName, level, question) => {
  let questions = getQuestionsFromStudentName(studentName);
  questions[level] = question;

  window.localStorage.setItem(studentName, JSON.stringify(questions));
};

const displayQuestion = (question, level) => {
  let questionsList = document.getElementById("ol-questins");

  let questionsElement = document.createElement("li");
  questionsElement.classList.add("li-question");

  const deleteButton = document.createElement("button");
  deleteButton.value = level;
  deleteButton.innerText = "X";
  deleteButton.id = "delete-btn-" + level;

  deleteButton.addEventListener("click", () => {
    deleteQuestion(document.getElementById("student-select").value, level);
  });

  let questionQuestion = document.createElement("p");
  questionQuestion.classList.add("text-question");

  questionQuestion.innerText = question.question;

  let questionOptions = document.createElement("ol");
  questionOptions.classList.add("ol-options");
  questionOptions.type = "a";

  let optionA = document.createElement("li");
  optionA.classList.add("li-option");
  let optionB = document.createElement("li");
  optionB.classList.add("li-option");
  let optionC = document.createElement("li");
  optionC.classList.add("li-option");
  let optionD = document.createElement("li");
  optionD.classList.add("li-option");

  optionA.innerText = question.a;
  questionOptions.append(optionA);

  optionB.innerText = question.b;
  questionOptions.append(optionB);

  optionC.innerText = question.c;
  questionOptions.append(optionC);

  optionD.innerText = question.d;
  questionOptions.append(optionD);

  questionsElement.append(questionQuestion);
  questionsElement.append(deleteButton);

  questionsElement.append(questionOptions);

  questionsList.append(questionsElement);
  // questions.map((question) => {
  //   questionsList.innerHTML += `<li>${question.question}</li>`;
  // });
};

function getQuestions() {
  // Get the text from the textarea
  const studentName = document.getElementById("student-select").value;
  const newQuestion = document.getElementById("question").value;
  const newOptionA = document.getElementById("option-a").value;
  const newOptionB = document.getElementById("option-b").value;
  const newOptionC = document.getElementById("option-c").value;
  const newOptionD = document.getElementById("option-d").value;
  const newCorrectAnswer = document.querySelector(
    'input[name="correct-answer"]:checked'
  ).value;
  const newQuestionLevel = document.getElementById("select-level").value;
  // Initialize the questions object
  let question = {};

  question = {
    question: newQuestion,
    a: newOptionA,
    b: newOptionB,
    c: newOptionC,
    d: newOptionD,
    answer: newCorrectAnswer,
  };

  // Loop through the lines

  // Return the questions object

  addQuestionToLocalStorage(studentName, newQuestionLevel, question);

  document.getElementById("question").value = "";
  document.getElementById("option-a").value = "";
  document.getElementById("option-b").value = "";
  document.getElementById("option-c").value = "";
  document.getElementById("option-d").value = "";
  document.querySelector(
    'input[name="correct-answer"]:checked'
  ).checked = false;
}

const addButton = document.getElementById("btn-add");

addButton.addEventListener("click", (event) => {
  event.preventDefault();
  getQuestions();
  getMissingLevelsFromStudentName(selectStudent.value);
});
//

const selectStudent = document.getElementById("student-select");
selectStudent.addEventListener("change", () => {
  let questions = {};
  questions = getQuestionsFromStudentName(selectStudent.value);
  // console.log(questions);

  getMissingLevelsFromStudentName(selectStudent.value);
});
