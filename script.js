/* =========================================
   CGPSC + ZOMATO DAILY TRACKER
   script.js
========================================= */


/* ---------- SETTINGS ---------- */

const STUDY_TARGET = 3;
const WORK_TARGET = 12;

const STORAGE_KEY = "cgpscZomatoTrackerData";
const NOTES_KEY = "cgpscZomatoTrackerNotes";


/* ---------- VARIABLES ---------- */

let trackerData =
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

let currentDate = new Date();

let selectedDate = getDateKey(new Date());


/* ---------- DOM ELEMENTS ---------- */

const studyHoursInput = document.getElementById("studyHours");
const workHoursInput = document.getElementById("workHours");

const studyProgress = document.getElementById("studyProgress");
const workProgress = document.getElementById("workProgress");

const studyStatus = document.getElementById("studyStatus");
const workStatus = document.getElementById("workStatus");

const summaryStudy = document.getElementById("summaryStudy");
const summaryWork = document.getElementById("summaryWork");
const summaryTotal = document.getElementById("summaryTotal");
const dayStatus = document.getElementById("dayStatus");

const streakCount = document.getElementById("streakCount");

const studyAttendance =
  document.getElementById("studyAttendance");

const workAttendance =
  document.getElementById("workAttendance");

const overallAttendance =
  document.getElementById("overallAttendance");

const calendarMonth =
  document.getElementById("calendarMonth");

const calendarDays =
  document.getElementById("calendarDays");

const historyTable =
  document.getElementById("historyTable");

const noHistory =
  document.getElementById("noHistory");

const dailyNotes =
  document.getElementById("dailyNotes");

const saveMessage =
  document.getElementById("saveMessage");

const notesMessage =
  document.getElementById("notesMessage");

const todayDate =
  document.getElementById("todayDate");


/* ---------- DATE FUNCTIONS ---------- */

/*
  Converts Date object to:
  YYYY-MM-DD
*/

function getDateKey(date) {

  const year = date.getFullYear();

  const month =
    String(date.getMonth() + 1).padStart(2, "0");

  const day =
    String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


/*
  Convert YYYY-MM-DD into readable date
*/

function formatDate(dateKey) {

  const parts = dateKey.split("-");

  const date = new Date(
    Number(parts[0]),
    Number(parts[1]) - 1,
    Number(parts[2])
  );

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}


/*
  Today's date display
*/

function updateTodayDate() {

  const today = new Date();

  todayDate.textContent =
    today.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
}


/* ---------- LOAD TODAY ---------- */

function loadToday() {

  selectedDate = getDateKey(new Date());

  const data = trackerData[selectedDate];

  if (data) {

    studyHoursInput.value =
      data.study || "";

    workHoursInput.value =
      data.work || "";

  } else {

    studyHoursInput.value = "";

    workHoursInput.value = "";
  }

  loadNotes();

  updateProgress();

}


/* ---------- GET INPUT VALUES ---------- */

function getStudyHours() {

  let value =
    parseFloat(studyHoursInput.value);

  if (isNaN(value) || value < 0) {
    value = 0;
  }

  return value;
}


function getWorkHours() {

  let value =
    parseFloat(workHoursInput.value);

  if (isNaN(value) || value < 0) {
    value = 0;
  }

  return value;
}


/* ---------- UPDATE PROGRESS ---------- */

function updateProgress() {

  const study =
    getStudyHours();

  const work =
    getWorkHours();


  /* Study Progress */

  let studyPercent =
    (study / STUDY_TARGET) * 100;

  studyPercent =
    Math.min(studyPercent, 100);

  studyProgress.style.width =
    `${studyPercent}%`;


  /* Work Progress */

  let workPercent =
    (work / WORK_TARGET) * 100;

  workPercent =
    Math.min(workPercent, 100);

  workProgress.style.width =
    `${workPercent}%`;


  /* Study Status */

  if (study >= STUDY_TARGET) {

    studyStatus.textContent =
      "✓ Target Completed";

    studyStatus.classList.add("completed");

  } else {

    studyStatus.textContent =
      `${Math.max(0, STUDY_TARGET - study)}h remaining`;

    studyStatus.classList.remove("completed");
  }


  /* Work Status */

  if (work >= WORK_TARGET) {

    workStatus.textContent =
      "✓ Target Completed";

    workStatus.classList.add("completed");

  } else {

    workStatus.textContent =
      `${Math.max(0, WORK_TARGET - work)}h remaining`;

    workStatus.classList.remove("completed");
  }


  /* Summary */

  summaryStudy.textContent =
    `${study}h`;

  summaryWork.textContent =
    `${work}h`;

  summaryTotal.textContent =
    `${study + work}h`;


  /* Day Status */

  if (
    study >= STUDY_TARGET &&
    work >= WORK_TARGET
  ) {

    dayStatus.textContent =
      "✓ Complete";

  } else if (
    study > 0 ||
    work > 0
  ) {

    dayStatus.textContent =
      "In Progress";

  } else {

    dayStatus.textContent =
      "Pending";
  }

}


/* ---------- SAVE TODAY ---------- */

function saveToday() {

  const study =
    getStudyHours();

  const work =
    getWorkHours();


  trackerData[selectedDate] = {

    study: study,

    work: work,

    notes:
      trackerData[selectedDate]?.notes || ""

  };


  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(trackerData)
  );


  updateProgress();

  updateAttendance();

  updateStreak();

  renderCalendar();

  renderHistory();


  saveMessage.textContent =
    "✓ Today's progress saved!";


  setTimeout(() => {

    saveMessage.textContent = "";

  }, 2500);

}


/* ---------- ATTENDANCE ---------- */

function updateAttendance() {

  const dates =
    Object.keys(trackerData);


  if (dates.length === 0) {

    studyAttendance.textContent = "0%";

    workAttendance.textContent = "0%";

    overallAttendance.textContent = "0%";

    return;
  }


  let studyCompleted = 0;

  let workCompleted = 0;

  let totalCompleted = 0;


  dates.forEach(date => {

    const data =
      trackerData[date];

    const study =
      Number(data.study) || 0;

    const work =
      Number(data.work) || 0;


    if (study >= STUDY_TARGET) {
      studyCompleted++;
    }


    if (work >= WORK_TARGET) {
      workCompleted++;
    }


    if (
      study >= STUDY_TARGET &&
      work >= WORK_TARGET
    ) {
      totalCompleted++;
    }

  });


  const studyPercent =
    Math.round(
      (studyCompleted / dates.length) * 100
    );


  const workPercent =
    Math.round(
      (workCompleted / dates.length) * 100
    );


  const overallPercent =
    Math.round(
      (totalCompleted / dates.length) * 100
    );


  studyAttendance.textContent =
    `${studyPercent}%`;

  workAttendance.textContent =
    `${workPercent}%`;

  overallAttendance.textContent =
    `${overallPercent}%`;

}


/* ---------- STREAK ---------- */

function updateStreak() {

  let streak = 0;

  let date =
    new Date();


  while (true) {

    const key =
      getDateKey(date);

    const data =
      trackerData[key];


    if (
      data &&
      Number(data.study) >= STUDY_TARGET &&
      Number(data.work) >= WORK_TARGET
    ) {

      streak++;

      date.setDate(
        date.getDate() - 1
      );

    } else {

      break;
    }

  }


  streakCount.textContent =
    streak;

}


/* ---------- CALENDAR ---------- */

function renderCalendar() {

  calendarDays.innerHTML = "";


  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();


  calendarMonth.textContent =
    currentDate.toLocaleDateString(
      "en-IN",
      {
        month: "long",
        year: "numeric"
      }
    );


  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();


  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();


  /* Empty spaces before first day */

  for (
    let i = 0;
    i < firstDay;
    i++
  ) {

    const empty =
      document.createElement("div");

    empty.className =
      "calendar-day empty";

    calendarDays.appendChild(empty);
  }


  /* Calendar dates */

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {

    const cell =
      document.createElement("div");

    cell.className =
      "calendar-day";

    cell.textContent =
      day;


    const dateKey =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


    const data =
      trackerData[dateKey];


    if (data) {

      const study =
        Number(data.study) || 0;

      const work =
        Number(data.work) || 0;


      const studyDone =
        study >= STUDY_TARGET;

      const workDone =
        work >= WORK_TARGET;


      if (
        studyDone &&
        workDone
      ) {

        cell.classList.add(
          "both-day"
        );

      } else if (studyDone) {

        cell.classList.add(
          "study-day"
        );

      } else if (workDone) {

        cell.classList.add(
          "work-day"
        );
      }

    }


    /* Highlight today */

    if (
      dateKey ===
      getDateKey(new Date())
    ) {

      cell.classList.add(
        "today"
      );
    }


    /* Click calendar date */

    cell.addEventListener(
      "click",
      () => {

        selectedDate =
          dateKey;

        loadSelectedDate(
          dateKey
        );

      }
    );


    calendarDays.appendChild(cell);

  }

}


/* ---------- LOAD SELECTED DATE ---------- */

function loadSelectedDate(dateKey) {

  const data =
    trackerData[dateKey];


  if (data) {

    studyHoursInput.value =
      data.study || "";

    workHoursInput.value =
      data.work || "";

  } else {

    studyHoursInput.value = "";

    workHoursInput.value = "";
  }


  loadNotesForDate(dateKey);

  updateProgress();


  saveMessage.textContent =
    `Viewing ${formatDate(dateKey)}`;


  setTimeout(() => {

    saveMessage.textContent = "";

  }, 2000);


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ---------- HISTORY ---------- */

function renderHistory() {

  historyTable.innerHTML = "";


  const dates =
    Object.keys(trackerData)
      .sort()
      .reverse();


  if (dates.length === 0) {

    noHistory.style.display =
      "block";

    return;

  }


  noHistory.style.display =
    "none";


  dates.forEach(dateKey => {

    const data =
      trackerData[dateKey];


    const study =
      Number(data.study) || 0;

    const work =
      Number(data.work) || 0;


    const studyDone =
      study >= STUDY_TARGET;

    const workDone =
      work >= WORK_TARGET;


    let status =
      "Pending";


    if (
      studyDone &&
      workDone
    ) {

      status = "✓ Complete";

    } else if (
      study > 0 ||
      work > 0
    ) {

      status = "In Progress";
    }


    const row =
      document.createElement("tr");


    row.innerHTML = `
      <td>${formatDate(dateKey)}</td>
      <td>${study}h</td>
      <td>${work}h</td>
      <td>${status}</td>
    `;


    historyTable.appendChild(row);

  });

}


/* ---------- NOTES ---------- */

function loadNotes() {

  loadNotesForDate(
    selectedDate
  );

}


function loadNotesForDate(dateKey) {

  const data =
    trackerData[dateKey];

  if (data && data.notes) {

    dailyNotes.value =
      data.notes;

  } else {

    dailyNotes.value = "";
  }

}


/* ---------- SAVE NOTES ---------- */

function saveNotes() {

  const notes =
    dailyNotes.value;


  if (!trackerData[selectedDate]) {

    trackerData[selectedDate] = {

      study: 0,

      work: 0,

      notes: notes

    };

  } else {

    trackerData[selectedDate].notes =
      notes;
  }


  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(trackerData)
  );


  notesMessage.textContent =
    "✓ Notes saved!";


  setTimeout(() => {

    notesMessage.textContent = "";

  }, 2000);


  renderHistory();

}


/* ---------- MONTH NAVIGATION ---------- */

document
  .getElementById("prevMonth")
  .addEventListener(
    "click",
    () => {

      currentDate.setMonth(
        currentDate.getMonth() - 1
      );

      renderCalendar();

    }
  );


document
  .getElementById("nextMonth")
  .addEventListener(
    "click",
    () => {

      currentDate.setMonth(
        currentDate.getMonth() + 1
      );

      renderCalendar();

    }
  );


/* ---------- INPUT EVENTS ---------- */

studyHoursInput.addEventListener(
  "input",
  updateProgress
);


workHoursInput.addEventListener(
  "input",
  updateProgress
);


/* ---------- SAVE BUTTON ---------- */

document
  .getElementById("saveTodayBtn")
  .addEventListener(
    "click",
    saveToday
  );


/* ---------- NOTES BUTTON ---------- */

document
  .getElementById("saveNotesBtn")
  .addEventListener(
    "click",
    saveNotes
  );


/* ---------- RESET BUTTON ---------- */

document
  .getElementById("resetBtn")
  .addEventListener(
    "click",
    () => {

      const confirmation =
        confirm(
          "Are you sure you want to delete ALL attendance and notes?"
        );


      if (!confirmation) {
        return;
      }


      trackerData = {};

      localStorage.removeItem(
        STORAGE_KEY
      );


      localStorage.removeItem(
        NOTES_KEY
      );


      selectedDate =
        getDateKey(new Date());


      loadToday();

      updateAttendance();

      updateStreak();

      renderCalendar();

      renderHistory();


      alert(
        "All data has been reset."
      );

    }
  );


/* ---------- BOTTOM NAVIGATION ---------- */

const navItems =
  document.querySelectorAll(
    ".nav-item"
  );


navItems.forEach(item => {

  item.addEventListener(
    "click",
    () => {

      navItems.forEach(
        nav =>
          nav.classList.remove(
            "active"
          )
      );


      item.classList.add(
        "active"
      );


      const section =
        item.dataset.section;


      if (
        section === "top"
      ) {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }


      if (
        section === "calendar"
      ) {

        document
          .querySelector(
            ".calendar-section"
          )
          .scrollIntoView({
            behavior: "smooth"
          });

      }


      if (
        section === "history"
      ) {

        document
          .querySelector(
            ".history-section"
          )
          .scrollIntoView({
            behavior: "smooth"
          });

      }


      if (
        section === "notes"
      ) {

        document
          .querySelector(
            ".notes-section"
          )
          .scrollIntoView({
            behavior: "smooth"
          });

      }

    }
  );

});


/* ---------- INITIALIZE APP ---------- */

function initializeApp() {

  updateTodayDate();

  loadToday();

  updateAttendance();

  updateStreak();

  renderCalendar();

  renderHistory();

}


/* Start */

initializeApp();
