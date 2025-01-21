function vote(color) {
// Store the vote in local storage
    localStorage.setItem('favoriteColor', color);
// Display a message to the user
    document.getElementById('message').innerText = `You voted for ${color}!`;
}

// Check if the user has already voted
    const previousVote = localStorage.getItem('favoriteColor');
    if (previousVote) {
    document.getElementById('message').innerText = `You already voted for ${previousVote}!`;
}