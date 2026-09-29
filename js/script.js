document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const submitBtn = document.getElementById("submitBtn");

    if (!form || !emailInput || !emailError || !submitBtn) {
        return;
    }

    function isValidEmail(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailPattern.test(value.trim());
    }

    function validateEmail() {
        const value = emailInput.value.trim();

        if (value === "") {
            emailInput.classList.add("input-error");
            emailError.textContent = "請輸入 Email。";
            return false;
        }

        if (!isValidEmail(value)) {
            emailInput.classList.add("input-error");
            emailError.textContent = "Email 格式不正確，請重新輸入。";
            return false;
        }

        emailInput.classList.remove("input-error");
        emailError.textContent = "";
        return true;
    }

    emailInput.addEventListener("input", function () {
        if (emailInput.value.trim() === "") {
            emailInput.classList.remove("input-error");
            emailError.textContent = "";
            return;
        }

        validateEmail();
    });

    emailInput.addEventListener("blur", validateEmail);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validateEmail()) {
            emailInput.focus();
            return;
        }

        submitBtn.textContent = "已送出";
        submitBtn.disabled = true;
        submitBtn.classList.add("sent");
        emailInput.disabled = true;
    });
});