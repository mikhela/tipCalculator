const billinp = document.getElementById("bill--input");
const tipPercentage = document.querySelectorAll(".percentage__container button");
const quantityOfPeople = document.getElementById("people--quantity");
const tipAmount = document.getElementById("tip--amount");
const total = document.getElementById("total");
const resetButton = document.getElementById("reset-button");
const customButton = document.getElementById("custom-button");
const customInputContainer = document.getElementById("custom-input-container");
const customPercentageInput = document.getElementById("custom-percentage");

let billValue = 0;
let percentageValue = 0;
let peopleQuantity = 1;

function getValue(event) {
    billValue = Number(event.target.value).toFixed(2);
    calculateTipAndTotal();
}

function getPeopleQuantity(event) {
    peopleQuantity = parseInt(event.target.value);
    if (peopleQuantity === 0 || isNaN(peopleQuantity)) {
        alert("Number of people cannot be zero or invalid.");
        peopleQuantity = 1;
    }
    calculateTipAndTotal();
}

function selectTipPercentage(event) {
    percentageValue = parseInt(event.target.textContent);
    customInputContainer.style.display = 'none';
    calculateTipAndTotal();
}

function calculateTipAndTotal() {
    if (billValue && percentageValue && peopleQuantity) {
        const tipAmountValue = (billValue * (percentageValue / 100)).toFixed(2);
        const totalValue = (billValue * (1 + percentageValue / 100) / peopleQuantity).toFixed(2);
        tipAmount.textContent = `$${tipAmountValue}`;
        total.textContent = `$${totalValue}`;
    }
}

function resetCalculator() {
    billValue = 0;
    percentageValue = 0;
    peopleQuantity = 1;

    billinp.value = '';
    quantityOfPeople.value = '';
    customPercentageInput.value = '';
    customInputContainer.style.display = 'none';
    tipAmount.textContent = '$0.00';
    total.textContent = '$0.00';
}

function handleCustomButtonClick() {
    customInputContainer.style.display = 'block';
    customPercentageInput.focus();
}

function handleCustomPercentageInput(event) {
    percentageValue = parseInt(event.target.value);
    calculateTipAndTotal();
}

billinp.addEventListener('input', getValue);
quantityOfPeople.addEventListener('input', getPeopleQuantity);
tipPercentage.forEach(button => {
    if (button !== customButton) {
        button.addEventListener("click", selectTipPercentage);
    }
});
customButton.addEventListener("click", handleCustomButtonClick);
customPercentageInput.addEventListener("input", handleCustomPercentageInput);
resetButton.addEventListener("click", resetCalculator);
