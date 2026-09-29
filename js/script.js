document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const submitBtn = document.getElementById("submitBtn");
    const resetBtn = document.getElementById("resetBtn");

    if (!form || !emailInput || !emailError || !submitBtn || !resetBtn) {
        return;
    }

    function isValidEmail(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailPattern.test(value.trim());
    }

    function clearEmailError() {
        emailInput.classList.remove("input-error");
        emailError.textContent = "";
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

        clearEmailError();
        return true;
    }

    emailInput.addEventListener("input", function () {
        if (emailInput.value.trim() === "") {
            clearEmailError();
            return;
        }

        validateEmail();
    });

    emailInput.addEventListener("blur", validateEmail);

    form.addEventListener("reset", function () {
        clearEmailError();
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validateEmail()) {
            emailInput.focus();
            return;
        }

        submitBtn.textContent = "已送出";
        submitBtn.disabled = true;
        submitBtn.classList.add("sent");

        resetBtn.disabled = true;
        emailInput.disabled = true;
    });
});