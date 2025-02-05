// User data
const users = [
    { name: "Daniel Grech", username: "danielg_17", password: "apples" },
    { name: "John Gatt", username: "john_Majna", password: "bananas" },
    { name: "Daniel Vella", username: "danielosaurus", password: "murica" }
];

function login() {
    document.getElementById("loginModal").style.display = "flex";
    document.getElementById("loginContent").innerHTML = `
        <h2>Login</h2>
        <input type="text" id="username" placeholder="Username" style="padding: 10px; width: 80%; margin-bottom: 10px; font-size: 16px; border: 2px solid #00ff00; border-radius: 5px; text-align: center;"><br>
        <input type="password" id="password" placeholder="Password" style="padding: 10px; width: 80%; margin-bottom: 20px; font-size: 16px; border: 2px solid #00ff00; border-radius: 5px; text-align: center;"><br>
        <buttonTwo onclick="validateLogin()" style="background-color: #00ff00; color: #000; padding: 14px 25px; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 50%; transition: background-color 0.3s, color 0.3s; margin: 0 auto; margin-bottom: 10px;">Submit</buttonTwo><br>
        <buttonTwo onclick="closeLogin()" style="background-color: #ff0000; color: #fff; padding: 14px 25px; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 50%; margin-top: 10px; transition: background-color 0.3s, color 0.3s; margin: 0 auto;">Cancel</buttonTwo>
    `;
}

function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}

function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if the entered username & password match any user
    const user = users.find(user => user.username === username && user.password === password);
    const loginContent = document.getElementById("loginContent");

    if (user) {
        // Successful login
        loginContent.innerHTML = `
            <h2>Welcome, ${user.name}!</h2>
            <buttonTwo onclick="closeLogin()" style="background-color: #00ff00; color: #000; padding: 14px 25px; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 50%; transition: background-color 0.3s, color 0.3s; margin: 0 auto;">Continue</buttonTwo>
        `;
    } else {
        // Failed login
        loginContent.innerHTML = `
            <h2>No Account Found.</h2>
            <buttonTwo onclick="login()" style="background-color: #00ff00; color: #fff; padding: 14px 25px; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 50%; margin-top: 10px; transition: background-color 0.3s, color 0.3s; margin: 0 auto; margin-bottom: 10px;">Try Again</buttonTwo>
            <buttonTwo onclick="closeLogin()" style="background-color: #ff0000; color: #fff; padding: 14px 25px; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 50%; margin-top: 10px; transition: background-color 0.3s, color 0.3s; margin: 0 auto;">Cancel</buttonTwo>
        `;
    }
}