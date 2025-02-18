// User data
const users = [
    { name: "Daniel Grech", username: "dan_grec", password: "lejber" },
    { name: "1", username: "1", password: "1" },
    { name: "John Gatt", username: "John_LLTK", password: "rutartsinimmaawqal" },
    { name: "Daniel Vella", username: "danielrix08", password: "Iamgay17" },
    { name: "Matteo Camilleri", username: "Matteo", password: "12bucklemyshoe" },
    { name: "Kenneth Micallef", username: "Kennybat1n1", password: "abbatinikjddm" },
    { name: "Jake Sacco", username: "jake_sax", password: "kondoljanzi" },
    { name: "Gabriel Xerri", username: "gabriel_bokli", password: "gabriel06" },
    { name: "Kieran Calleja", username: "kieran_kiskis", password: "kiskis1908" },
    { name: "Denzil Bugeja", username: "denzil", password: "denzil21" },
    { name: "Keith Sultana", username: "keithsultana16", password: "ticklemeuncle" },
    { name: "Kiran Camilleri", username: "Kiran_PsPs21", password: "(zzobbUGhoxx813)"}
];

function login() {
    // Show login modal
    document.getElementById("loginModal").style.display = "flex";
    document.getElementById("loginContent").innerHTML = `
        <h2>Login</h2>
        <input type="text" id="username" placeholder="Username" style="padding: 10px; width: 80%; margin-bottom: 10px; font-size: 16px; border: 2px solid #00ff00; border-radius: 5px; text-align: center;"><br>
        <input type="password" id="password" placeholder="Password" style="padding: 10px; width: 80%; margin-bottom: 5px; font-size: 16px; border: 2px solid #00ff00; border-radius: 5px; text-align: center;"><br>
        <p style="font-size: 16px; color: #ff0000; margin-bottom: 20px;">
            No account / Forgot password?<br>
            Contact <strong>Daniel Grech</strong>
        </p>
        <buttonTwo onclick="validateLogin()" style="background-color: #00ff00; color: #000; padding: 14px 25px; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 50%; transition: background-color 0.3s, color 0.3s; margin: 0 auto; margin-bottom: 10px;">Log In</buttonTwo><br>
        <buttonTwo onclick="closeLogin()" style="background-color: #ff0000; color: #fff; padding: 14px 25px; font-size: 18px; font-weight: bold; border: 0px; cursor: pointer; width: 50%; margin-top: 10px; transition: background-color 0.3s, color 0.3s; margin: 0 auto;">Cancel</buttonTwo>
    `;
}

function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}

let loggedInUser = null;
function validateLogin() {
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

// Check if the entered username & password match any user
const user = users.find(user => user.username === username && user.password === password);
const loginContent = document.getElementById("loginContent");

    if (user) {
        // Successful login
        document.querySelector("button[onclick='login()']").disabled = true;
        document.querySelector("button[onclick='login()']").innerText = "Logged In";
        loggedInUser = user.username;
        loginContent.innerHTML = `
            <h2>Welcome, ${user.name}!</h2>
            <button onclick="showGameSection()" style="background-color: #00ff00; color: #000; padding: 14px 25px; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 50%; transition: background-color 0.3s, color 0.3s; margin: 0 auto;">Continue</button>
        `;

    } else {
        // Failed login
        document.querySelector("button[onclick='login()']").disabled = false;
        document.querySelector("button[onclick='login()']").innerText = "Log In";
        loginContent.innerHTML = `
            <h2>No Account Found.</h2>
            <button onclick="login()" style="background-color: #00ff00; color: #fff; padding: 14px 25px; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 50%; margin-top: 10px; transition: background-color 0.3s, color 0.3s; margin: 0 auto; margin-bottom: 10px;">Try Again</button>
            <button onclick="closeLogin()" style="background-color: #ff0000; color: #fff; padding: 14px 25px; font-size: 18px; font-weight: bold; border: 0px; cursor: pointer; width: 50%; margin-top: 10px; transition: background-color 0.3s, color 0.3s; margin: 0 auto;">Cancel</button>
        `;
    }    
}

// Function to show the game section when "Continue" is pressed
function showGameSection() {
    document.getElementById("gameSection").style.display = "flex";
    document.getElementById("timer").style.display = "block";
    closeLogin(); // Close the login modal after continuing
}

// Play as Guest - shows the game section immediately
function playAsGuest() {
    loggedInUser = null;
    document.querySelector("button[onclick='login()']").disabled = false;
    document.querySelector("button[onclick='login()']").innerText = "Log In";
    document.getElementById("gameSection").style.display = "flex";
    document.getElementById("timer").style.display = "block";
}