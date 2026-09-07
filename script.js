/* =====================================================
   JANMAT CHHATTISGARH
   Public Opinion & Election Intelligence Dashboard
   ===================================================== */


/* =====================================================
   1. CONSTITUENCY MASTER DATA
   ===================================================== */

const constituencies = [

    { no: 1, name: "Bharatpur-Sonhat", region: "Sarguja" },
    { no: 2, name: "Manendragarh", region: "Sarguja" },
    { no: 3, name: "Baikunthpur", region: "Sarguja" },
    { no: 4, name: "Premnagar", region: "Sarguja" },
    { no: 5, name: "Bhatgaon", region: "Sarguja" },
    { no: 6, name: "Pratappur", region: "Sarguja" },
    { no: 7, name: "Ramanujganj", region: "Sarguja" },
    { no: 8, name: "Samri", region: "Sarguja" },
    { no: 9, name: "Lundra", region: "Sarguja" },
    { no: 10, name: "Ambikapur", region: "Sarguja" },
    { no: 11, name: "Sitapur", region: "Sarguja" },
    { no: 12, name: "Jashpur", region: "Sarguja" },
    { no: 13, name: "Kunkuri", region: "Sarguja" },
    { no: 14, name: "Pathalgaon", region: "Sarguja" },

    { no: 15, name: "Lailunga", region: "Sarguja" },
    { no: 16, name: "Raigarh", region: "Plain" },
    { no: 17, name: "Sarangarh", region: "Plain" },
    { no: 18, name: "Kharsia", region: "Plain" },
    { no: 19, name: "Dharamjaigarh", region: "Sarguja" },
    { no: 20, name: "Rampur", region: "Plain" },
    { no: 21, name: "Korba", region: "Plain" },
    { no: 22, name: "Katghora", region: "Plain" },
    { no: 23, name: "Pali-Tanakhar", region: "Plain" },
    { no: 24, name: "Marwahi", region: "Plain" },

    { no: 25, name: "Kota", region: "Plain" },
    { no: 26, name: "Lormi", region: "Plain" },
    { no: 27, name: "Mungeli", region: "Plain" },
    { no: 28, name: "Takhatpur", region: "Plain" },
    { no: 29, name: "Bilha", region: "Plain" },
    { no: 30, name: "Bilaspur", region: "Plain" },
    { no: 31, name: "Beltara", region: "Plain" },
    { no: 32, name: "Masturi", region: "Plain" },
    { no: 33, name: "Akaltara", region: "Plain" },
    { no: 34, name: "Janjgir-Champa", region: "Plain" },
    { no: 35, name: "Sakti", region: "Plain" },
    { no: 36, name: "Chandrapur", region: "Plain" },
    { no: 37, name: "Jaijaipur", region: "Plain" },
    { no: 38, name: "Pamgarh", region: "Plain" },

    { no: 39, name: "Saraipali", region: "Plain" },
    { no: 40, name: "Basna", region: "Plain" },
    { no: 41, name: "Khallari", region: "Plain" },
    { no: 42, name: "Mahasamund", region: "Plain" },
    { no: 43, name: "Bilaigarh", region: "Plain" },
    { no: 44, name: "Kasdol", region: "Plain" },
    { no: 45, name: "Baloda Bazar", region: "Plain" },
    { no: 46, name: "Bhatapara", region: "Plain" },
    { no: 47, name: "Dharsiwa", region: "Plain" },
    { no: 48, name: "Raipur Rural", region: "Plain" },
    { no: 49, name: "Raipur City West", region: "Plain" },
    { no: 50, name: "Raipur City North", region: "Plain" },
    { no: 51, name: "Raipur City South", region: "Plain" },
    { no: 52, name: "Arang", region: "Plain" },

    { no: 53, name: "Abhanpur", region: "Plain" },
    { no: 54, name: "Rajim", region: "Plain" },
    { no: 55, name: "Bindranawagarh", region: "Plain" },
    { no: 56, name: "Sihawa", region: "Plain" },
    { no: 57, name: "Kurud", region: "Plain" },
    { no: 58, name: "Dhamtari", region: "Plain" },
    { no: 59, name: "Sanjari Balod", region: "Plain" },
    { no: 60, name: "Dondi Lohara", region: "Plain" },
    { no: 61, name: "Gunderdehi", region: "Plain" },
    { no: 62, name: "Balod", region: "Plain" },
    { no: 63, name: "Durg Rural", region: "Plain" },
    { no: 64, name: "Durg City", region: "Plain" },
    { no: 65, name: "Bhilai Nagar", region: "Plain" },
    { no: 66, name: "Vaishali Nagar", region: "Plain" },
    { no: 67, name: "Ahiwara", region: "Plain" },
    { no: 68, name: "Saja", region: "Plain" },
    { no: 69, name: "Bemetara", region: "Plain" },
    { no: 70, name: "Nawagarh", region: "Plain" },

    { no: 71, name: "Pandariya", region: "Plain" },
    { no: 72, name: "Kawardha", region: "Plain" },
    { no: 73, name: "Khairagarh", region: "Plain" },
    { no: 74, name: "Dongargarh", region: "Plain" },
    { no: 75, name: "Rajnandgaon", region: "Plain" },
    { no: 76, name: "Dongargaon", region: "Plain" },
    { no: 77, name: "Khujji", region: "Plain" },
    { no: 78, name: "Mohla-Manpur", region: "Bastar" },

    { no: 79, name: "Antagarh", region: "Bastar" },
    { no: 80, name: "Bhanupratappur", region: "Bastar" },
    { no: 81, name: "Kanker", region: "Bastar" },
    { no: 82, name: "Keshkal", region: "Bastar" },
    { no: 83, name: "Kondagaon", region: "Bastar" },
    { no: 84, name: "Narayanpur", region: "Bastar" },
    { no: 85, name: "Bastar", region: "Bastar" },
    { no: 86, name: "Jagdalpur", region: "Bastar" },
    { no: 87, name: "Chitrakot", region: "Bastar" },
    { no: 88, name: "Dantewada", region: "Bastar" },
    { no: 89, name: "Bijapur", region: "Bastar" },
    { no: 90, name: "Kontta", region: "Bastar" }

];


/* =====================================================
   2. SAMPLE DATA
   ===================================================== */

let surveyData = JSON.parse(
    localStorage.getItem("janmatSurveyData")
) || {};

let candidates = JSON.parse(
    localStorage.getItem("janmatCandidates")
) || [];

let issueData = {

    Employment: 64,

    "Roads & Infrastructure": 58,

    Agriculture: 54,

    Healthcare: 49,

    Education: 46,

    Water: 41,

    Electricity: 37,

    "Women & Safety": 32

};


/* =====================================================
   3. DOM READY
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initialize();

    }
);


/* =====================================================
   4. INITIALIZE
   ===================================================== */

function initialize() {

    setCurrentDate();

    setupNavigation();

    setupTheme();

    populateSeatDropdowns();

    renderConstituencies();

    renderIssues();

    createCharts();

    setupSurvey();

    setupCandidate();

    setupModal();

}


/* =====================================================
   5. DATE
   ===================================================== */

function setCurrentDate() {

    const element =
        document.getElementById("currentDate");

    if (!element) return;

    const date =
        new Date();

    element.textContent =
        date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
}


/* =====================================================
   6. NAVIGATION
   ===================================================== */

function setupNavigation() {

    const navItems =
        document.querySelectorAll(".nav-item");

    const pages =
        document.querySelectorAll(".page");

    navItems.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    navItems.forEach(
                        item =>
                            item.classList.remove("active")
                    );

                    pages.forEach(
                        page =>
                            page.classList.remove(
                                "active-page"
                            )
                    );

                    button.classList.add("active");

                    const pageName =
                        button.dataset.page;

                    const page =
                        document.getElementById(
                            pageName
                        );

                    if (page) {

                        page.classList.add(
                            "active-page"
                        );

                    }

                }
            );

        }
    );

}


/* =====================================================
   7. THEME
   ===================================================== */

function setupTheme() {

    const button =
        document.getElementById("themeBtn");

    button.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );

            button.textContent =
                document.body.classList.contains("dark")
                    ? "☀️"
                    : "🌙";

        }
    );

}


/* =====================================================
   8. DROPDOWNS
   ===================================================== */

function populateSeatDropdowns() {

    const dropdowns = [

        document.getElementById("surveySeat"),

        document.getElementById("candidateSeat"),

        document.getElementById("modalSeat")

    ];


    dropdowns.forEach(
        dropdown => {

            if (!dropdown) return;

            dropdown.innerHTML =
                `<option value="">
                    Select Constituency
                 </option>`;

            constituencies.forEach(
                seat => {

                    const option =
                        document.createElement(
                            "option"
                        );

                    option.value =
                        seat.no;

                    option.textContent =
                        `${seat.no}. ${seat.name}`;

                    dropdown.appendChild(
                        option
                    );

                }
            );

        }
    );

}


/* =====================================================
   9. CONSTITUENCY DATA
   ===================================================== */

function getSeatData(seat) {

    const saved =
        surveyData[seat.no];

    if (saved) {

        return saved;

    }


    /*
       Demo values only.
       Replace with actual survey database
       when backend is connected.
    */

    const party =
        42 +
        ((seat.no * 7) % 10);

    const competitor =
        37 +
        ((seat.no * 5) % 9);

    const change =
        35 +
        ((seat.no * 11) % 35);


    return {

        party: party,

        competitor: competitor,

        change: change,

        status: getStatus(change)

    };

}


/* =====================================================
   10. STATUS
   ===================================================== */

function getStatus(change) {

    if (change <= 40) {

        return "positive";

    }

    if (change <= 65) {

        return "competitive";

    }

    return "risk";

}


/* =====================================================
   11. RENDER CONSTITUENCIES
   ===================================================== */

function renderConstituencies() {

    const table =
        document.getElementById(
            "constituencyTable"
        );

    if (!table) return;

    table.innerHTML = "";


    const search =
        (
            document.getElementById(
                "seatSearch"
            )?.value || ""
        ).toLowerCase();


    const region =
        document.getElementById(
            "regionFilter"
        )?.value || "all";


    const status =
        document.getElementById(
            "statusFilter"
        )?.value || "all";


    constituencies
        .filter(
            seat =>
                seat.name
                    .toLowerCase()
                    .includes(search) ||
                String(seat.no)
                    .includes(search)
        )
        .filter(
            seat =>
                region === "all" ||
                seat.region === region
        )
        .forEach(
            seat => {

                const data =
                    getSeatData(seat);

                const seatStatus =
                    data.status ||
                    getStatus(data.change);


                if (
                    status !== "all" &&
                    status !== seatStatus
                ) {

                    return;

                }


                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `

                    <td>${seat.no}</td>

                    <td>
                        <strong>
                            ${seat.name}
                        </strong>
                    </td>

                    <td>
                        ${seat.region}
                    </td>

                    <td>
                        ${Number(data.party).toFixed(1)}%
                    </td>

                    <td>
                        ${Number(data.competitor).toFixed(1)}%
                    </td>

                    <td>
                        ${Number(data.change).toFixed(1)}%
                    </td>

                    <td>
                        ${statusBadge(seatStatus)}
                    </td>

                `;


                table.appendChild(row);

            }
        );

}


/* =====================================================
   12. STATUS BADGE
   ===================================================== */

function statusBadge(status) {

    const labels = {

        positive: "Positive",

        competitive: "Competitive",

        risk: "High Risk"

    };


    return `
        <span class="badge badge-${status}">
            ${labels[status]}
        </span>
    `;

}


/* =====================================================
   13. FILTER EVENTS
   ===================================================== */

document.addEventListener(
    "input",
    event => {

        if (
            event.target.id === "seatSearch"
        ) {

            renderConstituencies();

        }

    }
);


document.addEventListener(
    "change",
    event => {

        if (
            event.target.id === "regionFilter" ||
            event.target.id === "statusFilter"
        ) {

            renderConstituencies();

        }

    }
);


/* =====================================================
   14. ISSUES
   ===================================================== */

function renderIssues() {

    const list =
        document.getElementById(
            "issueList"
        );

    const ranking =
        document.getElementById(
            "issueRanking"
        );


    const sorted =
        Object.entries(issueData)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            );


    if (list) {

        list.innerHTML = "";

        sorted.forEach(
            ([issue, value]) => {

                list.innerHTML += `

                    <div class="issue-row">

                        <span class="issue-name">
                            ${issue}
                        </span>

                        <div class="issue-progress">

                            <span
                                style="
                                width:${value}%
                                "
                            ></span>

                        </div>

                        <span class="issue-value">
                            ${value}%
                        </span>

                    </div>

                `;

            }
        );

    }


    if (ranking) {

        ranking.innerHTML = "";

        sorted.forEach(
            ([issue, value], index) => {

                ranking.innerHTML += `

                    <div class="issue-rank">

                        <div class="issue-rank-number">
                            ${index + 1}
                        </div>

                        <div class="issue-rank-info">

                            <strong>
                                ${issue}
                            </strong>

                            <small>
                                Reported by
                                ${value}%
                                of respondents
                            </small>

                        </div>

                    </div>

                `;

            }
        );

    }

}


/* =====================================================
   15. CHARTS
   ===================================================== */

function createCharts() {

    const partyCanvas =
        document.getElementById(
            "partyChart"
        );

    const issueCanvas =
        document.getElementById(
            "issuesChart"
        );


    if (partyCanvas) {

        new Chart(
            partyCanvas,
            {

                type: "bar",

                data: {

                    labels: [
                        "BJP",
                        "Congress",
                        "Neutral/Others"
                    ],

                    datasets: [
                        {
                            label: "Survey Perception",

                            data: [
                                48,
                                43,
                                9
                            ]
                        }
                    ]

                },

                options: {

                    responsive: true,

                    plugins: {

                        legend: {
                            display: false
                        }

                    },

                    scales: {

                        y: {
                            beginAtZero: true,

                            max: 100
                        }

                    }

                }

            }
        );

    }


    if (issueCanvas) {

        new Chart(
            issueCanvas,
            {

                type: "bar",

                data: {

                    labels:
                        Object.keys(
                            issueData
                        ),

                    datasets: [
                        {
                            label: "Issue %",
                            data:
                                Object.values(
                                    issueData
                                )
                        }
                    ]

                },

                options: {

                    indexAxis: "y",

                    responsive: true,

                    plugins: {

                        legend: {
                            display: false
                        }

                    },

                    scales: {

                        x: {
                            beginAtZero: true,

                            max: 100
                        }

                    }

                }

            }
        );

    }


    const doughnut =
        document.getElementById(
            "issueDoughnut"
        );


    if (doughnut) {

        new Chart(
            doughnut,
            {

                type: "doughnut",

                data: {

                    labels: [
                        "State Government",
                        "Local MLA",
                        "Infrastructure",
                        "Other"
                    ],

                    datasets: [
                        {
                            data: [
                                30,
                                25,
                                28,
                                17
                            ]
                        }
                    ]

                },

                options: {

                    responsive: true

                }

            }
        );

    }

}


/* =====================================================
   16. SURVEY
   ===================================================== */

function setupSurvey() {

    const save =
        document.getElementById(
            "saveSurvey"
        );


    const clear =
        document.getElementById(
            "clearSurvey"
        );


    if (save) {

        save.addEventListener(
            "click",
            saveSurvey
        );

    }


    if (clear) {

        clear.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        "#survey input"
                    )
                    .forEach(
                        input =>
                            input.value = ""
                    );

            }
        );

    }

}


/* =====================================================
   17. SAVE SURVEY
   ===================================================== */

function saveSurvey() {

    const seatNo =
        document.getElementById(
            "surveySeat"
        ).value;


    if (!seatNo) {

        showToast(
            "Please select constituency"
        );

        return;

    }


    const party =
        Number(
            document.getElementById(
                "surveyParty"
            ).value
        );


    const competitor =
        Number(
            document.getElementById(
                "surveyCompetitor"
            ).value
        );


    const undecided =
        Number(
            document.getElementById(
                "surveyUndecided"
            ).value
        );


    if (
        party < 0 ||
        competitor < 0 ||
        undecided < 0
    ) {

        showToast(
            "Please enter valid vote shares"
        );

        return;

    }


    const selectedIssues =
        Array.from(
            document.querySelectorAll(
                "#survey input[type=checkbox]:checked"
            )
        ).map(
            checkbox =>
                checkbox.value
        );


    const govRating =
        Number(
            document.getElementById(
                "govRating"
            ).value
        );


    const mlaRating =
        Number(
            document.getElementById(
                "mlaRating"
            ).value
        );


    const changeDemand =
        document.getElementById(
            "changeDemand"
        ).value;


    let changeIndex;


    if (changeDemand === "high") {

        changeIndex = 75;

    } else if (
        changeDemand === "moderate"
    ) {

        changeIndex = 52;

    } else {

        changeIndex = 30;

    }


    surveyData[seatNo] = {

        party,

        competitor,

        undecided,

        change: changeIndex,

        status:
            getStatus(
                changeIndex
            ),

        govRating,

        mlaRating,

        issues:
            selectedIssues,

        sample:
            Number(
                document.getElementById(
                    "surveySample"
                ).value
            ) || 0,

        date:
            document.getElementById(
                "surveyDate"
            ).value

    };


    localStorage.setItem(
        "janmatSurveyData",
        JSON.stringify(
            surveyData
        )
    );


    renderConstituencies();

    updateDashboard();

    showToast(
        "Survey data saved successfully"
    );

}


/* =====================================================
   18. DASHBOARD UPDATE
   ===================================================== */

function updateDashboard() {

    let positive = 0;

    let competitive = 0;

    let risk = 0;


    constituencies.forEach(
        seat => {

            const data =
                getSeatData(seat);

            const status =
                data.status ||
                getStatus(data.change);


            if (status === "positive") {

                positive++;

            } else if (
                status === "competitive"
            ) {

                competitive++;

            } else {

                risk++;

            }

        }
    );


    document.getElementById(
        "positiveSeats"
    ).textContent = positive;


    document.getElementById(
        "competitiveSeats"
    ).textContent = competitive;


    document.getElementById(
        "riskSeats"
    ).textContent = risk;

}


/* =====================================================
   19. CANDIDATE ANALYSIS
   ===================================================== */

function setupCandidate() {

    const button =
        document.getElementById(
            "saveCandidate"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        calculateCandidate
    );

}


/* =====================================================
   20. CANDIDATE SCORE
   ===================================================== */

function calculateCandidate() {

    const name =
        document.getElementById(
            "candidateName"
        ).value.trim();


    const recognition =
        Number(
            document.getElementById(
                "recognition"
            ).value
        );


    const acceptability =
        Number(
            document.getElementById(
                "acceptability"
            ).value
        );


    const negative =
        Number(
            document.getElementById(
                "negative"
            ).value
        );


    if (!name) {

        showToast(
            "Enter candidate name"
        );

        return;

    }


    if (
        recognition < 0 ||
        acceptability < 0 ||
        negative < 0
    ) {

        showToast(
            "Enter valid candidate scores"
        );

        return;

    }


    /*
       Example analytical index.

       Recognition + Acceptability
       are positive components.

       Negative perception is
       treated as a deduction.
    */

    let score =
        (
            recognition * 0.35
        ) +
        (
            acceptability * 0.45
        ) +
        (
            (100 - negative) * 0.20
        );


    score =
        Math.max(
            0,
            Math.min(
                100,
                score
            )
        );


    let decision;


    if (score >= 75) {

        decision =
            "Strong Candidate";

    } else if (score >= 60) {

        decision =
            "Viable Candidate";

    } else if (score >= 45) {

        decision =
            "Needs Further Review";

    } else {

        decision =
            "High Risk Candidate";

    }


    document.getElementById(
        "candidateScore"
    ).textContent =
        score.toFixed(0);


    document.getElementById(
        "candidateDecision"
    ).textContent =
        decision;


    document.getElementById(
        "candidateDescription"
    ).textContent =
        "Index based on recognition, acceptability and negative-perception inputs. It is an analytical screening metric, not an election prediction.";


    document.getElementById(
        "candidateResult"
    ).classList.remove(
        "hidden"
    );


    candidates.push({

        name,

        recognition,

        acceptability,

        negative,

        score

    });


    localStorage.setItem(
        "janmatCandidates",
        JSON.stringify(
            candidates
        )
    );

}


/* =====================================================
   21. QUICK DATA MODAL
   ===================================================== */

function setupModal() {

    const open =
        document.getElementById(
            "addDataBtn"
        );


    const close =
        document.getElementById(
            "closeModal"
        );


    const modal =
        document.getElementById(
            "dataModal"
        );


    const save =
        document.getElementById(
            "saveQuickData"
        );


    if (open) {

        open.addEventListener(
            "click",
            () => {

                modal.classList.remove(
                    "hidden"
                );

            }
        );

    }


    if (close) {

        close.addEventListener(
            "click",
            () => {

                modal.classList.add(
                    "hidden"
                );

            }
        );

    }


    if (save) {

        save.addEventListener(
            "click",
            saveQuickData
        );

    }

}


/* =====================================================
   22. SAVE QUICK DATA
   ===================================================== */

function saveQuickData() {

    const seat =
        document.getElementById(
            "modalSeat"
        ).value;


    const party =
        Number(
            document.getElementById(
                "modalParty"
            ).value
        );


    const competitor =
        Number(
            document.getElementById(
                "modalCompetitor"
            ).value
        );


    const change =
        Number(
            document.getElementById(
                "modalChange"
            ).value
        );


    if (!seat) {

        showToast(
            "Select constituency"
        );

        return;

    }


    surveyData[seat] = {

        party,

        competitor,

        undecided:
            Math.max(
                0,
                100 -
                party -
                competitor
            ),

        change,

        status:
            getStatus(change)

    };


    localStorage.setItem(
        "janmatSurveyData",
        JSON.stringify(
            surveyData
        )
    );


    document.getElementById(
        "dataModal"
    ).classList.add(
        "hidden"
    );


    renderConstituencies();

    updateDashboard();


    showToast(
        "Constituency data updated"
    );

}


/* =====================================================
   23. REPORT
   ===================================================== */

function generateReport() {

    showToast(
        "Report prepared. Use Print Report to export."
    );

}


/* =====================================================
   24. TOAST
   ===================================================== */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =====================================================
   25. INITIAL DASHBOARD
   ===================================================== */

setTimeout(
    () => {

        updateDashboard();

    },
    100
);
