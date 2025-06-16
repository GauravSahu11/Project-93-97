// Importing and configuring Firebase (using script tag method)
const firebaseConfig = {
  apiKey: "AIzaSyAv8VZVs3uAScXbpgL9RVdBHaNwI2i0n6g",
  authDomain: "chat-app-1942d.firebaseapp.com",
  databaseURL: "https://chat-app-1942d-default-rtdb.firebaseio.com",
  projectId: "chat-app-1942d",
  storageBucket: "chat-app-1942d.firebasestorage.app",
  messagingSenderId: "1070702214572",
  appId: "1:1070702214572:web:24ba88c7b17dbf44760e09"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get user name from localStorage
let user_name = localStorage.getItem("user_name");

// Show user name on page load
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("user_name")) {
    document.getElementById("user_name").innerText = user_name;
  }

  // Load messages from Firebase
  firebase.database().ref("messages").on("child_added", (snapshot) => {
    const data = snapshot.val();
    const output = document.getElementById("output");
    const messageElement = document.createElement("p");
    messageElement.innerHTML = `<strong>${data.name}:</strong> ${data.message}`;
    output.appendChild(messageElement);
  });
});

// Redirect after login
function addUser() {
  let input = document.getElementById("user_name").value;
  localStorage.setItem("user_name", input);
  window.location = "chat.html";
}

// Send message to Firebase
function send() {
  const msg = document.getElementById("msg").value;
  firebase.database().ref("messages").push({
    name: user_name,
    message: msg
  });
  document.getElementById("msg").value = "";
}
