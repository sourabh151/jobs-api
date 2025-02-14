const loginBtn = document.querySelector(".login");
const signupBtn = document.querySelector(".signup");
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");
const formLoginbutton = document.querySelector(".login-form button");
const formSignupbutton = document.querySelector(".signup-form button");
const statusDOM = document.querySelector(".status");

let token;
function loginUser() {
  window.location.href = "/dashboard.html";
}
token = localStorage.getItem("token");
if (token.length > 0) {
  loginUser();
}
loginBtn.addEventListener("click", () => {
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
});
signupBtn.addEventListener("click", () => {
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
});
formLoginbutton.addEventListener("click", async (e) => {
  e.preventDefault();
  const result = await fetch("/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: loginForm.email.value,
      password: loginForm.password.value,
    }),
  });
  const data = await result.json();

  if (!data.success) {
    statusDOM.innerHTML = "Invalid Credentials";
    statusDOM.classList.toggle("invisible");
    statusDOM.classList.add("failure");
    setTimeout(() => {
      statusDOM.innerHTML = "";
      statusDOM.classList.toggle("invisible");
      statusDOM.classList.remove("failure");
    }, 2000);
    console.log("error");

  }
  else {
    statusDOM.innerHTML = "Login Successful";
    statusDOM.classList.toggle("invisible");
    statusDOM.classList.add("success");
    setTimeout(() => {
      statusDOM.innerHTML = "";
      statusDOM.classList.toggle("invisible");
      statusDOM.classList.remove("failure");
    }, 2000);
    token = data.token;
    localStorage.setItem("token", token);
    loginUser()
  }


})
