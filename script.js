// LocalStorage Data Keys
const ZOMATO_KEY = 'zomato_logs';
const CGPSC_KEY = 'cgpsc_logs';

// App State
let zomatoLogs = JSON.parse(localStorage.getItem(ZOMATO_KEY)) || [];
let cgpscLogs = JSON.parse(localStorage.getItem(CGPSC_KEY)) || [];

// DOM Elements
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const currentDateEl = document.getElementById('current-date');

// Header Stats
const headerEarnings = document.getElementById('header-earnings');
const headerStudyHours = document.getElementById('header-study-hours');

// Dashboard Counters
const totalEarningsEl = document.getElementById('total-earnings');
const totalDeliveriesEl = document.getElementById('total-deliveries');
const totalStudyHoursEl = document.getElementById('total-study-hours');
const totalTopicsEl = document.getElementById('total-topics');

// Chart Instances
let overviewChart, earningsTrendChart, studyTrendChart;

// App Init
document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    setupNavigation();
    setupFormListeners();
    updateUI();
    initCharts();
});

function setCurrentDate() {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    currentDateEl.textContent = new Date().toLocaleDateString('en-IN', options);
}

// Navigation Handler
function setupNavigation() {
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            navBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');

            if (tabId === 'analytics') {
                updateAnalyticsCharts();
            }
        });
    });
}

// Forms Handlers
function setupFormListeners() {
    // Zomato Entry Submit
    document.getElementById('zomato-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newLog = {
            id: Date.now(),
            date: document.getElementById('zomato-date').value,
            hours: parseFloat(document.getElementById('zomato-hours').value) || 0,
            deliveries: parseInt(document.getElementById('zomato-deliveries').value) || 0,
            earnings: parseFloat(document.getElementById('zomato-earnings').value) || 0
        };

        zomatoLogs.push(newLog);
        saveData();
        e.target.reset();
        setDefaultDates();
    });

    // CGPSC Entry Submit
    document.getElementById('cgpsc-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const newLog = {
            id: Date.now(),
            date: document.getElementById('cgpsc-date').value,
            subject: document.getElementById('cgpsc-subject').value,
            hours: parseFloat(document.getElementById('cgpsc-hours').value) || 0,
            topic: document.getElementById('cgpsc-topic').value
        };

        cgpscLogs.push(newLog);
        saveData();
        e.target.reset();
        setDefaultDates();
    });

    setDefaultDates();
}

function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('zomato-date').value = today;
    document.getElementById('cgpsc-date').value = today;
}

function saveData() {
    localStorage.setItem(ZOMATO_KEY, JSON.stringify(zomatoLogs));
    localStorage.setItem(CGPSC_KEY, JSON.stringify(cgpscLogs));
    updateUI();
}

function updateUI() {
    renderZomatoTable();
    renderCgpscTable();
    updateKPIs();
    updateOverviewChart();
}

// Render Tables
function renderZomatoTable() {
    const tbody = document.getElementById('zomato-table-body');
    tbody.innerHTML = '';

    zomatoLogs.slice().reverse().forEach(log => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${log.date}</td>
            <td>${log.hours} hrs</td>
            <td>${log.deliveries}</td>
            <td>₹${log.earnings}</td>
            <td><button class="delete-btn" onclick="deleteZomatoLog(${log.id})"><i class="fa-solid fa-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });
}

function renderCgpscTable() {
    const tbody = document.getElementById('cgpsc-table-body');
    tbody.innerHTML = '';

    cgpscLogs.slice().reverse().forEach(log => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${log.date}</td>
            <td>${log.subject}</td>
            <td>${log.hours} hrs</td>
            <td>${log.topic}</td>
            <td><button class="delete-btn" onclick="deleteCgpscLog(${log.id})"><i class="fa-solid fa-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });
}

// Global Delete Methods
window.deleteZomatoLog = function(id) {
    zomatoLogs = zomatoLogs.filter(log => log.id !== id);
    saveData();
};

window.deleteCgpscLog = function(id) {
    cgpscLogs = cgpscLogs.filter(log => log.id !== id);
    saveData();
};

// Calculations
function updateKPIs() {
    const totalEarnings = zomatoLogs.reduce((sum, log) => sum + log.earnings, 0);
    const totalDeliveries = zomatoLogs.reduce((sum, log) => sum + log.deliveries, 0);
    const totalStudyHours = cgpscLogs.reduce((sum, log) => sum + log.hours, 0);
    const totalTopics = cgpscLogs.length;

    totalEarningsEl.textContent = `₹${totalEarnings.toLocaleString('en-IN')}`;
    totalDeliveriesEl.textContent = totalDeliveries;
    totalStudyHoursEl.textContent = `${totalStudyHours} hrs`;
    totalTopicsEl.textContent = totalTopics;

    headerEarnings.textContent = `₹${totalEarnings.toLocaleString('en-IN')}`;
    headerStudyHours.textContent = `${totalStudyHours} hrs`;
}

// Chart.js Implementations
function initCharts() {
    const ctxOverview = document.getElementById('overviewChart').getContext('2d');
    const ctxEarnings = document.getElementById('earningsTrendChart').getContext('2d');
    const ctxStudy = document.getElementById('studyTrendChart').getContext('2d');

    overviewChart = new Chart(ctxOverview, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Earnings (₹)',
                    backgroundColor: '#e23744',
                    data: [],
                    yAxisID: 'y'
                },
                {
                    label: 'Study Hours',
                    backgroundColor: '#6366f1',
                    data: [],
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'linear',
                    position: 'left',
                    ticks: { color: '#94a3b8' },
                    grid: { color: '#334155' }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    ticks: { color: '#94a3b8' },
                    grid: { drawOnChartArea: false }
                },
                x: {
                    ticks: { color: '#94a3b8' },
                    grid: { color: '#334155' }
                }
            },
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            }
        }
    });

    earningsTrendChart = new Chart(ctxEarnings, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Earnings (₹)',
                borderColor: '#e23744',
                backgroundColor: 'rgba(226, 55, 68, 0.2)',
                fill: true,
                data: [],
                tension: 0.3
            }]
        },
        options: getChartOptions()
    });

    studyTrendChart = new Chart(ctxStudy, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Study Hours',
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                fill: true,
                data: [],
                tension: 0.3
            }]
        },
        options: getChartOptions()
    });

    updateOverviewChart();
}

function getChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
            x: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } }
        },
        plugins: {
            legend: { labels: { color: '#f8fafc' } }
        }
    };
}

function updateOverviewChart() {
    if (!overviewChart) return;

    const dates = [...new Set([...zomatoLogs.map(l => l.date), ...cgpscLogs.map(l => l.date)])].sort();
    const recentDates = dates.slice(-7);

    const earningsData = recentDates.map(date => {
        const log = zomatoLogs.find(l => l.date === date);
        return log ? log.earnings : 0;
    });

    const studyData = recentDates.map(date => {
        const logs = cgpscLogs.filter(l => l.date === date);
        return logs.reduce((sum, l) => sum + l.hours, 0);
    });

    overviewChart.data.labels = recentDates;
    overviewChart.data.datasets[0].data = earningsData;
    overviewChart.data.datasets[1].data = studyData;
    overviewChart.update();
}

function updateAnalyticsCharts() {
    if (!earningsTrendChart || !studyTrendChart) return;

    const zomatoSorted = [...zomatoLogs].sort((a, b) => new Date(a.date) - new Date(b.date));
    earningsTrendChart.data.labels = zomatoSorted.map(l => l.date);
    earningsTrendChart.data.datasets[0].data = zomatoSorted.map(l => l.earnings);
    earningsTrendChart.update();

    const studyByDate = cgpscLogs.reduce((acc, log) => {
        acc[log.date] = (acc[log.date] || 0) + log.hours;
        return acc;
    }, {});

    const sortedStudyDates = Object.keys(studyByDate).sort();
    studyTrendChart.data.labels = sortedStudyDates;
    studyTrendChart.data.datasets[0].data = sortedStudyDates.map(date => studyByDate[date]);
    studyTrendChart.update();
}
