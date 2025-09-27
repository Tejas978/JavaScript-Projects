const form = document.getElementById('bmi-form');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const resultContainer = document.getElementById('result-container');
const initialMessage = document.getElementById('result-message').outerHTML;

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting the traditional way

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    
    // Clear previous results
    resultContainer.innerHTML = '';
    
    // Input Validation
    if (isNaN(height) || height <= 0) {
        displayError('Please enter a valid height.');
        return;
    }
    if (isNaN(weight) || weight <= 0) {
        displayError('Please enter a valid weight.');
        return;
    }

    // BMI Calculation (height in cm to meters)
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    displayResult(bmi);
});

// Function to display the final result
function displayResult(bmi) {
    const bmiValue = bmi.toFixed(1);
    let category = '';
    let colorClass = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        colorClass = 'text-yellow-500';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Normal weight';
        colorClass = 'text-green-500';
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = 'Overweight';
        colorClass = 'text-orange-500';
    } else {
        category = 'Obese';
        colorClass = 'text-red-500';
    }
    
    const resultHTML = `
        <p class="text-slate-600 dark:text-slate-300">Your BMI is</p>
        <p class="text-5xl font-bold ${colorClass}">${bmiValue}</p>
        <p class="font-semibold text-lg ${colorClass}">${category}</p>
    `;
    
    resultContainer.innerHTML = resultHTML;
}

// Function to display an error message
function displayError(message) {
    const errorHTML = `
        <p id="result-message" class="text-lg text-red-500 h-16 flex items-center justify-center">${message}</p>
    `;
    resultContainer.innerHTML = errorHTML;
}

// Clear results when user starts typing again
heightInput.addEventListener('input', clearResult);
weightInput.addEventListener('input', clearResult);

function clearResult() {
    // Check if the result container has more than the initial message
    if(resultContainer.children.length > 1 || resultContainer.querySelector('.text-red-500')) {
         resultContainer.innerHTML = initialMessage;
    }
}
