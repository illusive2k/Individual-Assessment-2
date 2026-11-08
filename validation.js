
const form = document.getElementById("registration-form");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    
    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let email = document.getElementById("emailL").value.trim();
    let github = document.getElementById("Git").value.trim();

    let avatar = document.getElementById("avatar").files[0];

    let valid = true;

    document.querySelectorAll(".error-message").forEach(function(error) {
        error.remove();
    });


    if (fname === "") {
        showError("fname", "First name is required.");
        valid = false;
    }

    
    if (lname === "") {
        showError("lname", "Last name is required.");
        valid = false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        showError("emailL", "Enter a valid email.");
        valid = false;
    }

    
    if (!github.startsWith("@") || github.length < 2) {
        showError("Git", "GitHub username must start with @.");
        valid = false;
    }

  
    if (!avatar) {
        showError("avatar", "Please upload an image.");
        valid = false;
    }
    else {

        if (avatar.type !== "image/jpeg" && avatar.type !== "image/png") {
            showError("avatar", "Only JPG and PNG images are allowed.");
            valid = false;
        }

        if (avatar.size > 500 * 1024) {
            showError("avatar", "Image must be smaller than 500KB.");
            valid = false;
        }

    }

   
    if (valid === false) {
        return;
    }

    
    let reader = new FileReader();

    reader.onload = function() {

        
        let user = {
            fname: fname,
            lname: lname,
            email: email,
            github: github,
            avatar: reader.result
        };

        localStorage.setItem("user", JSON.stringify(user));

        
        window.location.href = "ticket.html";

    };

    reader.readAsDataURL(avatar);

});



function showError(id, message) {

    let input = document.getElementById(id);

    let error = document.createElement("p");

    error.className = "error-message";
    error.textContent = message;

    input.parentElement.appendChild(error);

}
