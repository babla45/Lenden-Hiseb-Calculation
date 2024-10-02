// Function to calculate and update total amounts for each section
function updateSectionTotal(parentDiv) {
    // Select all input elements within the specific parent div
    const inputs = parentDiv.querySelectorAll('input[type="number"]');
    
    // Initialize the total amount for the parent div
    let sectionTotal = 0;
    
    // Loop through each input and add its value to sectionTotal
    inputs.forEach(input => {
        const value = parseFloat(input.value) || 0;  // If the value is empty, treat it as 0
        sectionTotal += value;
    });
    
    // Find the total element in the parent div and update it
    const totalElement = parentDiv.querySelector('.total-amount');
    if (totalElement) {
        totalElement.innerHTML = `Total: ${sectionTotal}`;
    }

    // Now calculate the global total and the actual total (global total - debt)
    calculateGlobalAndActualTotal();
}

// Function to calculate global total and actual total
function calculateGlobalAndActualTotal() {
    // Get all inputs across the sections (including mobile banking, bank, cash, receivable, and debt)
    const allInputs = document.querySelectorAll('input[type="number"]');
    let globalTotal = 0;
    
    // Loop through all inputs and calculate the global total
    allInputs.forEach(input => {
        globalTotal += parseFloat(input.value) || 0;
    });

    // Get the debt amount specifically (assuming debt is inside a .debt section)
    const debtInput = document.querySelector('.debt input[type="number"]');
    const debtAmount = parseFloat(debtInput.value) || 0;  // If the debt value is empty, treat it as 0
    globalTotal-=debtAmount;
    // Calculate actual total as global total minus debt
    const actualTotal = globalTotal - debtAmount;

    // Update the summary section
    document.getElementById('total').textContent = `Total Amount: ${globalTotal}`;
    document.getElementById('actual').textContent = `Actual Amount: ${actualTotal}`;
}

// Attach event listeners to all input fields inside their respective sections
document.querySelectorAll('.container > div').forEach(section => {
    const inputs = section.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', () => updateSectionTotal(section));
    });
});

// Initialize totals on page load
window.onload = () => {
    document.querySelectorAll('.container > div').forEach(section => {
        updateSectionTotal(section);  // Calculate initial total for each section
    });
};
