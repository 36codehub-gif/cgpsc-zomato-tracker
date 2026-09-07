/* =====================================================
   CGPSC PREP
   Frontend JavaScript
   ===================================================== */


/* ================================
   PAGE NAVIGATION
================================ */

const menuItems =
    document.querySelectorAll(".menu-item");

const pages =
    document.querySelectorAll(".page");

const pageTitle =
    document.getElementById("pageTitle");

const pageSubtitle =
    document.getElementById("pageSubtitle");


const pageInfo = {

    dashboard: {
        title: "Good Morning, Aspirant 👋",
        subtitle:
            "Let's make today count for your CGPSC preparation."
    },

    quiz: {
        title: "Daily Quiz",
        subtitle:
            "Practice smart. Improve your accuracy."
    },

    pyq: {
        title: "PYQ Practice",
        subtitle:
            "Master previous year questions."
    },

    mock: {
        title: "Mock Tests",
        subtitle:
            "Simulate the real examination."
    },

    subjects: {
        title: "Subjects",
        subtitle:
            "Track your preparation topic by topic."
    },

    revision: {
        title: "Revision Planner",
        subtitle:
            "Revise topics at the right time."
    },

    weak: {
        title: "Weak Topic Analysis",
        subtitle:
            "Focus your time where improvement is needed."
    },

    current: {
        title: "Current Affairs",
        subtitle:
            "Stay updated with exam-oriented information."
    },

    analytics: {
        title: "My Analytics",
        subtitle:
            "Understand your preparation scientifically."
    },

    settings: {
        title: "Settings",
        subtitle:
            "Manage your preparation preferences."
    }

};


function openPage(pageName) {

    pages.forEach(page => {

        page.classList.remove("active");

    });


    menuItems.forEach(item => {

        item.classList.remove("active");

    });


    const selectedPage =
        document.getElementById(pageName);

    const selectedMenu =
        document.querySelector(
            `[data-page="${pageName}"]`
        );


    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    if (selectedMenu) {

        selectedMenu.classList.add("active");

    }


    if (pageInfo[pageName]) {

        pageTitle.textContent =
            pageInfo[pageName].title;

        pageSubtitle.textContent =
            pageInfo[pageName].subtitle;

    }


    document.getElementById("sidebar")
        .classList.remove("open");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


menuItems.forEach(item => {

    item.addEventListener("click", () => {

        openPage(item.dataset.page);

    });

});


/* ================================
   BUTTON PAGE LINKS
================================ */

document
    .querySelectorAll("[data-open]")
    .forEach(button => {

        button.addEventListener("click", () => {

            openPage(
                button.dataset.open
            );

        });

    });


/* ================================
   MOBILE SIDEBAR
================================ */

const mobileMenu =
    document.getElementById("mobileMenu");

const sidebar =
    document.getElementById("sidebar");


mobileMenu.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle("open");

    }
);


/* ================================
   TOAST
================================ */

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");


function showToast(title, message) {

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* ================================
   NOTIFICATION
================================ */

document
    .getElementById("notificationBtn")
    .addEventListener("click", () => {

        showToast(
            "All Caught Up",
            "You have no new notifications."
        );

    });


/* ================================
   PRO BUTTON
================================ */

document
    .getElementById("upgradeBtn")
    .addEventListener("click", () => {

        showToast(
            "CGPSC Pro",
            "Subscription system can be connected here."
        );

    });


/* ================================
   PERFORMANCE PERIOD
================================ */

document
    .getElementById("period")
    .addEventListener("change", function () {

        showToast(
            "Performance Updated",
            this.value + " selected."
        );

    });


/* ================================
   QUIZ DATA
================================ */

const questions = [

    {
        category: "CHHATTISGARH GK",

        question:
            "Which river is known as the lifeline of Chhattisgarh?",

        options: [
            "A. Mahanadi",
            "B. Shivnath",
            "C. Hasdeo",
            "D. Indravati"
        ],

        answer: 0
    },


    {
        category: "INDIAN POLITY",

        question:
            "Which Article deals with equality before law?",

        options: [
            "A. Article 12",
            "B. Article 14",
            "C. Article 16",
            "D. Article 19"
        ],

        answer: 1
    },


    {
        category: "HISTORY",

        question:
            "Who founded the Maurya Empire?",

        options: [
            "A. Ashoka",
            "B. Bindusara",
            "C. Chandragupta Maurya",
            "D. Harshavardhana"
        ],

        answer: 2
    },


    {
        category: "GEOGRAPHY",

        question:
            "Which is the largest river basin in India?",

        options: [
            "A. Godavari",
            "B. Ganga",
            "C. Krishna",
            "D. Narmada"
        ],

        answer: 1
    },


    {
        category: "ECONOMY",

        question:
            "Which institution is India's central bank?",

        options: [
            "A. SBI",
            "B. NABARD",
            "C. RBI",
            "D. SEBI"
        ],

        answer: 2
    }

];


let currentQuestion = 0;

let selectedAnswer = null;

let score = 0;

let timeLeft = 1200;

let timerInterval;


/* ================================
   QUIZ ELEMENTS
================================ */

const quizModal =
    document.getElementById("quizModal");

const question =
    document.getElementById("question");

const questionCategory =
    document.getElementById("questionCategory");

const options =
    document.getElementById("options");

const questionCount =
    document.getElementById("questionCount");

const questionProgress =
    document.getElementById("questionProgress");

const timer =
    document.getElementById("timer");


/* ================================
   START QUIZ
================================ */

document
    .getElementById("startQuiz")
    .addEventListener("click", startQuiz);


function startQuiz() {

    currentQuestion = 0;

    selectedAnswer = null;

    score = 0;

    timeLeft = 1200;


    quizModal.classList.add("show");


    loadQuestion();

    startTimer();

}


/* ================================
   LOAD QUESTION
================================ */

function loadQuestion() {

    const data =
        questions[currentQuestion];


    selectedAnswer = null;


    question.textContent =
        data.question;


    questionCategory.textContent =
        data.category;


    questionCount.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    questionProgress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    options.innerHTML = "";


    data.options.forEach(
        (optionText, index) => {

            const button =
                document.createElement("button");


            button.className = "option";


            button.textContent =
                optionText;


            button.addEventListener(
                "click",
                () => {

                    selectOption(
                        button,
                        index
                    );

                }
            );


            options.appendChild(button);

        }
    );


    document
        .getElementById("nextQuestion")
        .textContent =
        currentQuestion === questions.length - 1
            ? "Finish Quiz ✓"
            : "Next Question →";

}


/* ================================
   SELECT OPTION
================================ */

function selectOption(button, index) {

    document
        .querySelectorAll(".option")
        .forEach(option => {

            option.classList.remove("selected");

        });


    button.classList.add("selected");


    selectedAnswer = index;

}


/* ================================
   NEXT QUESTION
================================ */

document
    .getElementById("nextQuestion")
    .addEventListener("click", () => {


        if (selectedAnswer === null) {

            showToast(
                "Select an Answer",
                "Please choose an option first."
            );

            return;

        }


        if (
            selectedAnswer ===
            questions[currentQuestion].answer
        ) {

            score++;

        }


        if (
            currentQuestion <
            questions.length - 1
        ) {

            currentQuestion++;

            loadQuestion();

        } else {

            finishQuiz();

        }

    });


/* ================================
   FINISH QUIZ
================================ */

function finishQuiz() {

    clearInterval(timerInterval);


    quizModal.classList.remove("show");


    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    showToast(
        `Quiz Completed — ${score}/${questions.length}`,
        `Your accuracy was ${percentage}%.`
    );

}


/* ================================
   TIMER
================================ */

function startTimer() {

    clearInterval(timerInterval);


    updateTimer();


    timerInterval =
        setInterval(() => {

            timeLeft--;

            updateTimer();


            if (timeLeft <= 0) {

                finishQuiz();

            }

        }, 1000);

}


function updateTimer() {

    const minutes =
        Math.floor(timeLeft / 60)
            .toString()
            .padStart(2, "0");


    const seconds =
        (timeLeft % 60)
            .toString()
            .padStart(2, "0");


    timer.textContent =
        `${minutes}:${seconds}`;

}


/* ================================
   CLOSE QUIZ
================================ */

document
    .getElementById("closeQuiz")
    .addEventListener("click", () => {

        clearInterval(timerInterval);

        quizModal.classList.remove("show");

    });


/* ================================
   PRACTICE BUTTONS
================================ */

document
    .querySelectorAll(".practice")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showToast(
                    "Practice Session",
                    "Personalized questions will open here."
                );

            }
        );

    });


/* ================================
   OTHER ACTION BUTTONS
================================ */

document
    .querySelectorAll(
        ".card-btn, .subject-card button, .revision-card button, .priority button, .small-btn"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showToast(
                    "Module Ready",
                    "Question bank can be connected here."
                );

            }
        );

    });


/* ================================
   DARK MODE
================================ */

const darkMode =
    document.getElementById("darkMode");


const savedTheme =
    localStorage.getItem("cgpsc-theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    darkMode.checked = true;

}


darkMode.addEventListener(
    "change",
    () => {

        if (darkMode.checked) {

            document.body.classList.add("dark");

            localStorage.setItem(
                "cgpsc-theme",
                "dark"
            );

        } else {

            document.body.classList.remove("dark");

            localStorage.setItem(
                "cgpsc-theme",
                "light"
            );

        }

    }
);


/* ================================
   ESCAPE KEY
================================ */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            quizModal.classList.remove("show");

            sidebar.classList.remove("open");

            clearInterval(timerInterval);

        }

    }
);


/* ================================
   INITIALIZE
================================ */

openPage("dashboard");
