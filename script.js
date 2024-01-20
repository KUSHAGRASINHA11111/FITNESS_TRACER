// Function to format total seconds into HH:MM:SS format
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

document.addEventListener('DOMContentLoaded', function () {
    // Variables for tracking
    let steps = 0;
    let distance = 0;
    let calories = 0;

    // Elements
    const stepsElement = document.getElementById('steps');
    const distanceElement = document.getElementById('distance');
    const caloriesElement = document.getElementById('calories');
    const goalInputElement = document.getElementById('goalInput');
    const setGoalBtn = document.getElementById('setGoalBtn');
    const startBtn = document.getElementById('startBtn');
    const pauseResumeBtn = document.getElementById('pauseResumeBtn');
    const resetBtn = document.getElementById('resetBtn');
    const timerElement = document.getElementById('timer');
    const progressBar = document.getElementById('progressBar');
    const historyList = document.getElementById('historyList');
    const menuToggle = document.getElementById('menuToggle');
    const navListContainer = document.querySelector('.nav-list-container');

    // Tracking variables
    let goal = 0;
    let timerInterval;
    let isPaused = false;

    // Event listeners
    setGoalBtn.addEventListener('click', setGoal);
    startBtn.addEventListener('click', startTracking);
    pauseResumeBtn.addEventListener('click', pauseResumeTracking);
    resetBtn.addEventListener('click', resetTracking);

    function setGoal() {
        goal = parseInt(goalInputElement.value, 10) || 0;
        goalInputElement.value = '';
        updateProgressBar();
    }

    function startTracking() {
        if (goal === 0) {
            alert('Please set a goal first!');
            return;
        }

        if (!timerInterval) {
            timerInterval = setInterval(updateTimer, 1000);
            startBtn.disabled = true;
            pauseResumeBtn.disabled = false;
            resetBtn.disabled = false;
            updateProgressBar();
            trackSessionHistory('Session Started');
        }
    }

    function pauseResumeTracking() {
        isPaused = !isPaused;

        if (isPaused) {
            clearInterval(timerInterval);
            pauseResumeBtn.textContent = 'Resume';
            trackSessionHistory('Session Paused');
        } else {
            timerInterval = setInterval(updateTimer, 1000);
            pauseResumeBtn.textContent = 'Pause';
            trackSessionHistory('Session Resumed');
        }
    }

    function resetTracking() {
        clearInterval(timerInterval);
        steps = 0;
        distance = 0;
        calories = 0;
        goal = 0;
        isPaused = false;
        timerInterval = null;
        startBtn.disabled = false;
        pauseResumeBtn.disabled = true;
        resetBtn.disabled = true;
        updateDisplay();
        updateProgressBar();
        clearSessionHistory();
    }

    function updateTimer() {
        steps++;
        distance += 0.7; // Assuming an average step is 0.7 meters
        calories += 0.05; // Placeholder for calorie calculation

        updateDisplay();
        updateProgressBar();

        if (steps === goal) {
            alert('Goal achieved! Congratulations!');
            resetTracking();
        }
    }

    function updateDisplay() {
        stepsElement.textContent = steps;
        distanceElement.textContent = distance.toFixed(2);
        caloriesElement.textContent = calories.toFixed(2);

        const duration = formatTime(steps);
        timerElement.textContent = duration;

        updateSessionHistory();
    }

    function updateProgressBar() {
        const progress = (steps / goal) * 100;
        progressBar.value = progress > 100 ? 100 : progress;
    }

    function updateSessionHistory() {
        const currentTime = new Date().toLocaleTimeString();
        const sessionInfo = `${currentTime} - Steps: ${steps}, Distance: ${distance.toFixed(2)}m, Calories: ${calories.toFixed(2)}kcal`;

        const listItem = document.createElement('li');
        listItem.textContent = sessionInfo;
        historyList.appendChild(listItem);
    }

    function trackSessionHistory(action) {
        const currentTime = new Date().toLocaleTimeString();
        const historyItem = `${currentTime} - ${action}`;

        const listItem = document.createElement('li');
        listItem.textContent = historyItem;
        historyList.appendChild(listItem);
    }

    function clearSessionHistory() {
        historyList.innerHTML = '';
    }

    // Responsive navigation menu toggle
    menuToggle.addEventListener('click', function () {
        navListContainer.style.display = (navListContainer.style.display === 'none' || navListContainer.style.display === '') ? 'flex' : 'none';
    });
});
