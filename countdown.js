// Set the target date
const targetDate = new Date("February 8, 2025 00:00:00").getTime();

// Update the countdown every second
const countdownTimer = setInterval(function () {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    // Calculate days, hours, minutes, and seconds
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById("countdown").innerHTML =
        `${hours} hrs, ${minutes} min, ${seconds} sec`;

    // If the countdown is over, display a message
    if (timeLeft < 0) {
        clearInterval(countdownTimer);
        document.getElementById("countdown").innerHTML = "ELECTION DAY";
    }
}, 1000);