// User data
const users = [
    { name: "Daniel Grech", username: "dan_grec", password: "lejber", coins: "58" },
    { name: "1", username: "1", password: "1", coins: "100" },
    { name: "John Gatt", username: "John_LLTK", password: "rutartsinimmaawqal", coins: "15" },
    { name: "Daniel Vella", username: "danielrix08", password: "Iamgay17", coins: "45" },
    { name: "Matteo Camilleri", username: "Matteo", password: "12bucklemyshoe", coins: "15" },
    { name: "Kenneth Micallef", username: "Kennybat1n1", password: "abbatinikjddm", coins: "30" },
    { name: "Jake Sacco", username: "jake_sax", password: "kondoljanzi", coins: "35" },
    { name: "Gabriel Xerri", username: "gabriel_bokli", password: "gabriel06", coins: "37" },
    { name: "Ethan Refalo", username: "Ethan", password: "1234", coins: "10" },
    { name: "Kieran Calleja", username: "kieran_kiskis", password: "kiskis1908", coins: "33" },
    { name: "Denzil Bugeja", username: "denzil", password: "denzil21", coins: "65" },
    { name: "Keith Sultana", username: "keithsultana16", password: "ticklemeuncle", coins: "0" },
    { name: "Kiran Camilleri", username: "Kiran_PsPs21", password: "(zzobbUGhoxx813)", coins: "0"},
    { name: "David Grima", username: "david_g", password: "EmanuelOnTop", coins: "0"},
    { name: "Lucas Micallef", username: "Lucas M", password: "wwww", coins: "0"},
    { name: "Sebastian Portelli", username: "Sebastian_06", password: "Sebi", coins: "0"},
    { name: "Ryan Curmi", username: "Ryan curmi", password: "123456", coins: "0"},
    { name: "Zack Theuma", username: "zack_theuma", password: "ciksi123", coins: "0"},
    { name: "Elisa Buttigieg", username: "elisabuttigieg", password: "ilovebatini", coins: "0"},
    { name: "Kaitlyn Vella", username: "kaitvella", password: "reeshuno1fan", coins: "0"}
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
        <button onclick="validateLogin()" style="background-color: #00ff00; color: #000; padding: 14px 25px; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 50%; transition: background-color 0.3s, color 0.3s; margin: 0 auto; margin-bottom: 10px;">Log In</button><br>
        <button onclick="closeLogin()" style="background-color: #ff0000; color: #fff; padding: 14px 25px; font-size: 18px; font-weight: bold; border: 0px; cursor: pointer; width: 50%; margin-top: 10px; transition: background-color 0.3s, color 0.3s; margin: 0 auto;">Cancel</button>
    `;
}

function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}

let loggedInUser = null;
let coins = null;
function validateLogin() {
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

// Check if the entered username & password match any user
const user = users.find(user => user.username === username && user.password === password);
const loginContent = document.getElementById("loginContent");

    if (user) {
        // Successful login
        document.querySelector("button[onclick='login()']").innerText = "Logged In";
        loggedInUser = user.username;
        coins = user.coins;
        loginContent.innerHTML = `
            <h2>Welcome, ${user.name}!</h2>
            <button onclick="showGameSection()" style="background-color: #00ff00; color: #000; padding: 14px 25px; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 50%; transition: background-color 0.3s, color 0.3s; margin: 0 auto;">Continue</button>
        `;

    } else {
        // Failed login
        document.querySelector("button[onclick='login()']").innerText = "Log In";
        loginContent.innerHTML = `
            <h2>No Account Found.</h2>
            <button onclick="login()" style="background-color: #00ff00; color: #fff; padding: 14px 25px; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 50%; margin-top: 10px; transition: background-color 0.3s, color 0.3s; margin: 0 auto; margin-bottom: 10px;">Try Again</button>
            <button onclick="closeLogin()" style="background-color: #ff0000; color: #fff; padding: 14px 25px; font-size: 18px; font-weight: bold; border: 0px; cursor: pointer; width: 50%; margin-top: 10px; transition: background-color 0.3s, color 0.3s; margin: 0 auto;">Cancel</button>
        `;
    }    
}

function showGameSection() {
    closeLogin();
    const gameSection = document.getElementById("gameSection");
    if (gameSection) gameSection.style.display = "block";

    const coinsContainer = document.getElementById("coinsContainer");
    if (coinsContainer) coinsContainer.innerText = `You have ${coins} BĀT1N1 Coins`;

    const timer = document.getElementById("timer");
    if (timer) timer.style.display = "block";

    const score = document.getElementById("score");
    if (score) score.style.display = "block";

    const grid = document.querySelector(".grid-wrapper");
    if (grid) grid.style.display = "block";

    if (loggedInUser && typeof displayUserCollection === "function") {
        displayUserCollection(loggedInUser);
    }
}

function playAsGuest() {
    loggedInUser = null;
    document.querySelector("button[onclick='login()']").disabled = false;
    document.querySelector("button[onclick='login()']").innerText = "Log In";
    const gameSection = document.getElementById("gameSection");
    if (gameSection) gameSection.style.display = "block";

    const timer = document.getElementById("timer");
    if (timer) timer.style.display = "block";

    const score = document.getElementById("score");
    if (score) score.style.display = "block";

    const grid = document.querySelector(".grid-wrapper");
    if (grid) grid.style.display = "block";
}