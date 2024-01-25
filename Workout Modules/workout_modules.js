document.addEventListener('DOMContentLoaded', function () {
    let workoutInProgress = false;
    let workoutType = '';
    let workoutTime = 0;
    let timerInterval;

    const startCardioBlastBtn = document.getElementById('startCardioBlast');
    const startCoreStrengthBtn = document.getElementById('startCoreStrength');
    const startUpperBodySculptBtn = document.getElementById('startUpperBodySculpt');
    const startLowerBodyBurnBtn = document.getElementById('startLowerBodyBurn');
    const finishWorkoutBtn = document.getElementById('finishWorkout');

    startCardioBlastBtn.addEventListener('click', function () { startWorkout('Cardio Blast', 300); });
    startCoreStrengthBtn.addEventListener('click', function () { startWorkout('Core Strength', 180); });
    startUpperBodySculptBtn.addEventListener('click', function () { startWorkout('Upper Body Sculpt', 240); });
    startLowerBodyBurnBtn.addEventListener('click', function () { startWorkout('Lower Body Burn', 240); });
    finishWorkoutBtn.addEventListener('click', finishWorkout);

    function startWorkout(type, time) {
        if (!workoutInProgress) {
            workoutInProgress = true;
            workoutType = type;
            workoutTime = time;
            timerInterval = setInterval(updateWorkoutTimer, 1000);
            alert(`Workout started: ${workoutType}`);
        } else {
            alert('Another workout is already in progress. Finish it first.');
        }
    }

    function updateWorkoutTimer() {
        if (workoutInProgress && workoutTime > 0) {
            workoutTime--;
            updateWorkoutDisplay();

            if (workoutTime === 0) {
                finishWorkout();
            }
        }
    }

    function finishWorkout() {
        workoutInProgress = false;
        clearInterval(timerInterval);
        alert(`Workout finished: ${workoutType}`);
        resetWorkoutDisplay();
    }

    function updateWorkoutDisplay() {
        const workoutTimerElement = document.getElementById('workoutTimer');
        workoutTimerElement.textContent = formatTime(workoutTime);
    }

    function resetWorkoutDisplay() {
        const workoutTimerElement = document.getElementById('workoutTimer');
        workoutTimerElement.textContent = '00:00';
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }
});
