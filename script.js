const suggestionSection = document.querySelector('#suggestions');
const suggestionInput = document.querySelector('#cookie-suggestion');
const suggestionButton = document.querySelector('#suggestion-button');
const suggestionMessage = document.querySelector('#suggestion-message');
const suggestionList = document.querySelector('#suggestion-list');

suggestionButton.addEventListener('click', () => {
    const suggestion = suggestionInput.value.trim();
    if (suggestion === '') {
        suggestionMessage.textContent = 'Please enter a cookie suggestion.';
        return;
    }
        
    suggestionMessage.textContent = `Thanks for suggesting ${suggestionInput.value}!`;
    
    const newSuggestion = document.createElement('li');
    newSuggestion.textContent = suggestion;

    newSuggestion.dataset.suggestion = suggestion;

    suggestionList.appendChild(newSuggestion);
});

suggestionInput.addEventListener('input', () => {
    if (suggestionInput.value.trim() !== '') {
        suggestionSection.classList.add('highlighted');
    } else {
        suggestionSection.classList.remove('highlighted');
    }
});

// Cookie Order Form

const orderForm = document.querySelector('#order-form');
const nameInput = document.querySelector('#customer-name');
const emailInput = document.querySelector('#customer-email');
const flavorInput = document.querySelector('#cookie-flavor');
const quantityInput = document.querySelector('#quantity');
const dateInput = document.querySelector('#pickup-date');
const instructionsInput = document.querySelector('#special-instructions');
const confirmInput = document.querySelector('#confirm-order');
const orderMessage = document.querySelector('#order-message');

orderForm.addEventListener('submit', (event) => {
event.preventDefault();

const customerName = nameInput.value.trim();
const customerEmail = emailInput.value.trim();
const cookieFlavor = flavorInput.value;
const quantity = Number(quantityInput.value);
const pickupDate = dateInput.value;
const specialInstructions = instructionsInput.value.trim();
const orderConfirmed = confirmInput.checked;

    // Clear any older message
orderMessage.textContent = '';
orderMessage.classList.remove('error', 'success');

    // Validate
if (customerName === '') {
    orderMessage.textContent = 'Please enter your name.';
    orderMessage.classList.add('error');
    return;
}

if (!customerEmail.includes('@')) {
    orderMessage.textContent = 'Please enter a valid email address.';
    orderMessage.classList.add('error');
    return;
}

if (cookieFlavor === '') {
    orderMessage.textContent = 'Please choose a cookie flavor.';
    orderMessage.classList.add('error');
    return;
}

if (quantity < 1 || quantity > 12) {
    orderMessage.textContent = 'Quantity must be between 1 and 12 cookies.';
    orderMessage.classList.add('error');
    return;
}

if (pickupDate === '') {
    orderMessage.textContent = 'Please choose a pickup date.';
    orderMessage.classList.add('error');
    return;
}

if (!orderConfirmed) {
    orderMessage.textContent = 'Please confirm your order details.';
    orderMessage.classList.add('error');
    return;
}

    // Create the order object
const order = {
    customerName: customerName,
    customerEmail: customerEmail,
    cookieFlavor: cookieFlavor,
    quantity: quantity,
    pickupDate: pickupDate,
    specialInstructions: specialInstructions
};

    // Display object in console
console.log(order);

    // Display success message
orderMessage.textContent = 'Your cookie order is ready to be processed!';
orderMessage.classList.add('success');

    // Reset the form after success
orderForm.reset();

});
