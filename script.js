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

// API Tester

const postsEndpoint = 'https://jsonplaceholder.typicode.com/posts';

const getStatus = document.querySelector('#api-get-status');
const postList = document.querySelector('#api-post-list');
const loadPostsButton = document.querySelector('#load-posts-button');
const apiPostForm = document.querySelector('#api-post-form');
const apiPostTitle = document.querySelector('#api-post-title');
const apiPostBody = document.querySelector('#api-post-body'); 
const createPostButton = document.querySelector('#create-post-button'); 
const postStatus = document.querySelector('#api-post-status'); 
const createdPostResult = document.querySelector('#created-post-result');

// Request five posts from the API

async function loadPosts() { 
    getStatus.textContent = 'Loading posts...';
    getStatus.classList.remove('error', 'success'); 
    postList.textContent = ''; 
    loadPostsButton.disabled = true;

    try { 
        const response = await fetch(postsEndpoint + '?_limit=5');
        if (!response.ok) { throw new Error(`Request failed: ${response.status}`); }

        const posts = await response.json();

if (posts.length === 0) {
    getStatus.textContent = 'No posts found.';
} else {
    renderPosts(posts);
    getStatus.textContent = `Loaded ${posts.length} posts successfully.`;
    getStatus.classList.add('success');
}
} catch (error) {
    console.error('Error loading posts:', error);

    getStatus.textContent = 'Could not load posts. Please try again.';
    getStatus.classList.add('error');
} finally {
    loadPostsButton.disabled = false;
}
}

// Render the returned posts on the page.
function renderPosts(posts) {
    postList.textContent = '';

    for (const post of posts) {
        const item = document.createElement('li');
        item.classList.add('api-post');

        const title = document.createElement('h4');
        title.textContent = post.title;

        const body = document.createElement('p');
        body.textContent = post.body;

        item.append(title, body);
        postList.append(item);
    }
}

// POST: Send a new post to the API.
async function createPost(post) {
    const response = await fetch(postsEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
}

// Handle the new post form submission.
apiPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = apiPostTitle.value.trim();
    const body = apiPostBody.value.trim();

    if (title === '' || body === '') {
        postStatus.textContent = 'Please enter a title and message.';
        postStatus.classList.remove('success');
        postStatus.classList.add('error');
        return;
    }

const post = { title: title, body: body, userId: 1 };

    postStatus.textContent = 'Sending post...';
    postStatus.classList.remove('error', 'success');
    createdPostResult.textContent = '';
    createPostButton.disabled = true;

    try {
        const createdPost = await createPost(post);

        const heading = document.createElement('h4');
        heading.textContent = 'API Response';

        const titleText = document.createElement('p');
        titleText.textContent = `Title: ${createdPost.title}`;

        const bodyText = document.createElement('p');
        bodyText.textContent = `Message: ${createdPost.body}`;

        const idText = document.createElement('p');
        idText.textContent = `Returned ID: ${createdPost.id}`;

        createdPostResult.append(heading, titleText, bodyText, idText);

        postStatus.textContent = 'Post created successfully!';
        postStatus.classList.add('success');

        apiPostForm.reset();
    } catch (error) {
        console.error('Error creating post:', error);

        postStatus.textContent = 'Could not submit your post. Please try again.';
        postStatus.classList.add('error');
    } finally {
        createPostButton.disabled = false;
    }
});

// Connect the reload button and load posts when the page opens.
loadPostsButton.addEventListener('click', loadPosts);

loadPosts();