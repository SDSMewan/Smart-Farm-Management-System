const API_URL =
    "https://script.google.com/macros/s/AKfycbxOBIbBIGVAZ8d-Z-7GXJQYhHFUDtIvuMPhkZD7tTXJM9P-uwwAf-5C9rwS2S6EVIVJ/exec";

const loginForm =
    document.getElementById("loginForm");

const loginButton =
    document.getElementById("loginButton");

const message =
    document.getElementById("message");


loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();


    loginButton.disabled = true;

    loginButton.innerText = "Logging in...";

    message.innerText = "";


    try {

        const formData = new URLSearchParams();

        formData.append("username", username);
        formData.append("password", password);


        const response = await fetch(API_URL, {

            method: "POST",

            body: formData

        });


        const result = await response.json();


        if (result.success) {

            message.style.color = "green";

            message.innerText =
                "Login successful!";


            // Save login status
            localStorage.setItem(
                "loggedIn",
                "true"
            );


            // Open empty page
            setTimeout(() => {

                window.location.href =
                    "Main_Dashboard.html";

            }, 500);


        } else {

            message.style.color = "red";

            message.innerText =
                result.message;

            loginButton.disabled = false;

            loginButton.innerText = "Login";
        }


    } catch (error) {

        console.error(error);

        message.style.color = "red";

        message.innerText =
            "Connection error. Please try again.";

        loginButton.disabled = false;

        loginButton.innerText = "Login";
    }

});