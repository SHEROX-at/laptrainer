const auth = firebase.auth();

// REGISTER
function register() {
  const email = username.value;
  const password = password.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => window.location = "app.html")
    .catch(e => alert(e.message));
}

// LOGIN
function login() {
  const email = username.value;
  const password = password.value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location = "app.html")
    .catch(e => alert(e.message));
}

// CHECK LOGIN
function checkLogin() {
  auth.onAuthStateChanged(user => {
    if (!user) location.href = "index.html";
  });
}

// LOGOUT
function logout() {
  auth.signOut().then(() => location.href = "index.html");
}
