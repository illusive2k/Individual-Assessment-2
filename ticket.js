document.addEventListener('DOMContentLoaded', () => {

    
    const form = document.getElementById('registration-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('input').forEach(inp => inp.style.borderColor = '');

            const firstNameInput = document.getElementById('fname');
            const lastNameInput  = document.getElementById('lname');
            const emailInput     = document.getElementById('emailL');
            const githubInput    = document.getElementById('Git');
            const avatarInput    = document.getElementById('avatar');

            const firstName = firstNameInput.value.trim();
            const lastName  = lastNameInput.value.trim();
            const email     = emailInput.value.trim();
            const github    = githubInput.value.trim();
            const avatarFile = avatarInput.files[0];

            let isValid = true;

            if (!firstName) {
                showError(firstNameInput, "First name is required.");
                isValid = false;
            }
            if (!lastName) {
                showError(lastNameInput, "Last name is required.");
                isValid = false;
            }
            if (!email || !email.includes('@')) {
                showError(emailInput, "A valid email is required.");
                isValid = false;
            }
            if (!github || !github.startsWith('@')) {
                showError(githubInput, "GitHub username must start with '@'.");
                isValid = false;
            }
            if (!avatarFile) {
                showError(avatarInput, "Please upload an avatar image.");
                isValid = false;
            } else if (avatarFile.size > 500 * 1024) {
                showError(avatarInput, "Image must be under 500 KB.");
                isValid = false;
            }

            if (!isValid) return;

            const reader = new FileReader();
            reader.onload = function (event) {
                const userData = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    github: github,
                    avatar: event.target.result,
                    serialNumber: "#" + Math.floor(1000 + Math.random() * 9000)
                };

                localStorage.setItem("confUserData", JSON.stringify(userData));
                window.location.href = "ticket.html";
            };
            reader.readAsDataURL(avatarFile);
        });
    }

    
    const ticketName = document.getElementById('ticket-name');
    if (ticketName) {
        const raw = localStorage.getItem("confUserData");
        if (!raw) {
            window.location.href = "login.html";   
            return;
        }

        const data = JSON.parse(raw);

        document.getElementById('ticket-name').textContent   = data.firstName + " " + data.lastName;
        document.getElementById('ticket-email').textContent  = data.email;
        document.getElementById('ticket-github').textContent = data.github;
        document.getElementById('ticket-serial').textContent = "Serial: " + data.serialNumber;

        const avatarImg = document.getElementById('ticket-avatar');
        if (avatarImg) {
            avatarImg.src = data.avatar;
        }
    }
});

function showError(inputElement, message) {
    inputElement.style.borderColor = "#ff4d4d";
    let errorDiv = inputElement.parentElement.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = "#ff4d4d";
        errorDiv.style.fontSize = "12px";
        errorDiv.style.marginTop = "5px";
        inputElement.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}