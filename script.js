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


