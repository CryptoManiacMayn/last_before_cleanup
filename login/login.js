if (window.location.pathname.includes('user.html') && !localStorage.getItem('currentUser')) {
    window.location.href = 'index.html';
} else if (window.location.pathname.includes('user.html')) {
    displayUser();
    loadAddresses();
}

function displayUser() {
const currentUser = localStorage.getItem("currentUser");
if (currentUser) {
    document.getElementById("user-name").innerText = currentUser
}
}

document.getElementById("login-form").addEventListener("submit", function(event){
event.preventDefault();
login();
});

document.getElementById("register-form").addEventListener("submit", function(event){
event.preventDefault();
register();
});
// Function to toggle between login and register forms
function toggleForms() {
var loginForm = document.getElementById("login-form");
var registerForm = document.getElementById("register-form");
loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
registerForm.style.display = registerForm.style.display === "none" ? "block" : "none";
}


function login() {
var username = document.getElementById("login-username").value;
var password = document.getElementById("login-password").value;
var user = localStorage.getItem(username);
var rememberMe = document.getElementById("remember-me").checked;

if (user && JSON.parse(user).password === password) {
    localStorage.setItem("currentUser", username); // Keep using session storage for current session
    
    if (rememberMe) {
        localStorage.setItem("rememberedUser", username); // Remember username for autofill
    } else {
        localStorage.removeItem("rememberedUser"); // Do not remember the user
    }

    window.location.href = "user.html"; // Redirect to user dashboard page on successful login
} else {
    alert("Incorrect username or password!");
}
}


// Modified register function to use the original element IDs
function register() {
var username = document.getElementById("register-username").value;
var password = document.getElementById("register-password").value;
var confirmPassword = document.getElementById("confirm-password").value;

if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
}

if (localStorage.getItem(username)) {
    alert('Username already exists.');
    return;
}

localStorage.setItem(username, JSON.stringify({ username, password, addresses: [] }));
alert("Registration successful! You can now login.");
toggleForms(); // Switch back to the login form after successful registration
}




// Add address function modified to use session storage and align with your HTML structure
function addAddress() {
const address = document.getElementById('cryptoAddress').value;
if (!address) {
    alert('Please enter a crypto address.');
    return;
}
const currentUser = localStorage.getItem('currentUser');
const user = JSON.parse(localStorage.getItem(currentUser));
 
user.addresses.push(address);
localStorage.setItem(currentUser, JSON.stringify(user));
document.getElementById('cryptoAddress').value = ''; // Clear input field after adding
loadAddresses(); // Refresh the list of addresses
}

// Remove address function to delete a specific address from the user's list
function removeAddress(index) {
const currentUser = localStorage.getItem('currentUser');
const user = JSON.parse(localStorage.getItem(currentUser));
if (!user || !user.addresses) return; // Check if user or addresses array exists
user.addresses.splice(index, 1);
localStorage.setItem(currentUser, JSON.stringify(user));
loadAddresses(); // Refresh the list of addresses after removal
}

// Load addresses from local storage and display them on the dashboard

function loadAddresses() {
const currentUser = localStorage.getItem('currentUser');
const user = JSON.parse(localStorage.getItem(currentUser));
const addressList = document.getElementById('addressList');
addressList.innerHTML = ''; // Clear existing list

user.addresses.forEach((address, index) => {
    const row = addressList.insertRow(-1); // Insert a row at the end of the table

    const cell1 = row.insertCell(0); // Insert order number cell
    const cell2 = row.insertCell(1); // Insert address cell
    const cell3 = row.insertCell(2); // Insert button cell

    cell1.innerHTML = index + 1;
    cell2.innerHTML = address;
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => removeAddress(index));
    cell3.appendChild(removeBtn);
});
}



// Example initialization
document.addEventListener('DOMContentLoaded', loadAddresses);


// Function to logout and clear session storage
function logout() {
localStorage.removeItem("currentUser");
window.location.href = "login.html"; // Redirect back to the login page
}

// Check if user is already logged in and redirect if necessary
document.addEventListener('DOMContentLoaded', function() {
if (window.location.pathname.includes('user.html') && !localStorage.getItem('currentUser')) {
    window.location.href = 'login.html';
} else if (window.location.pathname.includes('user.html')) {
    displayUser();
}
})