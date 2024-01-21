// Function to toggle the visibility of diet plan details
function toggleDietPlan(sectionId) {
    var section = document.getElementById(sectionId);
    var details = section.querySelector('.diet-plan-details');

    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}

// Function to toggle the visibility of the navigation menu on smaller screens
function toggleMenu() {
    var navListContainer = document.querySelector('.nav-list-container');
    navListContainer.classList.toggle('show-menu');

    // Toggle diet plan details visibility on smaller screens
    var dietPlanSections = document.querySelectorAll('section');
    dietPlanSections.forEach(function(section) {
        var details = section.querySelector('.diet-plan-details');
        details.style.display = 'none';
    });
}

// Add click event listeners to the diet plan buttons
document.getElementById('btnLoseWeight').addEventListener('click', function() {
    toggleDietPlan('loseWeight');
});

document.getElementById('btnGainWeight').addEventListener('click', function() {
    toggleDietPlan('gainWeight');
});

document.getElementById('btnLoseMuscles').addEventListener('click', function() {
    toggleDietPlan('loseMuscles');
});

document.getElementById('btnGainMuscles').addEventListener('click', function() {
    toggleDietPlan('gainMuscles');
});

document.getElementById('btnManageStress').addEventListener('click', function() {
    toggleDietPlan('manageStress');
});

document.getElementById('btnIncreaseStepsCount').addEventListener('click', function() {
    toggleDietPlan('increaseStepsCount');
});

// Add click event listener to the menu toggle button
document.getElementById('menuToggle').addEventListener('click', function() {
    toggleMenu();
});
