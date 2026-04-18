// Sidebar
function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("show");
}

// Sections
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    document.getElementById("sidebar").classList.remove("show");

    // 💾 SAVE CURRENT TAB
    localStorage.setItem("lastTab", id);
}

// Dark mode
document.getElementById("darkToggle").onclick = () => {
    document.body.classList.toggle("dark");
};

// Quiz system
let score = 0;
let answered = {};
let time = 60;
let quizStarted = false;

const correctSound = new Audio("https://www.soundjay.com/buttons/sounds/button-4.mp3");
const wrongSound = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");

function startQuiz() {
    if (quizStarted) return;

    quizStarted = true;
    document.getElementById("startQuizBtn").disabled = true;

    // start timer ONLY when quiz starts
    startTimer();
}

// Timer function
let countdown;

function startTimer() {
    const timer = document.getElementById("timer");

    countdown = setInterval(() => {
        time--;
        timer.innerText = "Time: " + time + "s";

        if (time <= 0) {
            finishQuiz();
        }
    }, 1000);
}

// Quiz answer check
function check(btn, q, correct) {
    if (!quizStarted) return; // block answering before start
    if (answered[q] || time <= 0) return;

    answered[q] = true;

    let buttons = btn.parentElement.querySelectorAll("button");
    buttons.forEach(b => b.disabled = true);

    if (correct) {
        score++;
        btn.style.background = "green";
        correctSound.play();
    } else {
        btn.style.background = "red";
        wrongSound.play();
    }

    document.getElementById("result").innerText =
        "Current Score: " + score + "/5";
}

// DONE button
function finishQuiz() {
    clearInterval(countdown);

    document.querySelectorAll(".quiz button").forEach(b => {
        b.disabled = true;
    });

    document.getElementById("result").innerText =
        "🎯 Final Score: " + score + " / 5";
}

window.onload = function () {
    let savedTab = localStorage.getItem("lastTab");

    if (savedTab) {
        showSection(savedTab);
    } else {
        showSection("home"); // default
    }
};

function showSection(id) {
    const sections = document.querySelectorAll('.section');

    sections.forEach(sec => {
        sec.classList.remove('active');
    });

    const target = document.getElementById(id);

    // small delay for smooth transition
    setTimeout(() => {
        target.classList.add('active');
    }, 50);

    document.getElementById("sidebar").classList.remove("show");

    localStorage.setItem("lastTab", id);
}