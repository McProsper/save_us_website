document.addEventListener("DOMContentLoaded", () => {
    const customInput = document.querySelector(".ul-donate-form-custom-input");
    const radioButtons = document.querySelectorAll('input[name="donate-amount"]');

    if (!customInput || !radioButtons.length) return;

    const defaultSelected = document.querySelector('input[name="donate-amount"]:checked');
    if (defaultSelected && defaultSelected.id !== "donate-amount-custom" && defaultSelected.id !== "d-custom" && defaultSelected.id !== "custom-amount") {
        const label = defaultSelected.nextElementSibling;
        if (label) {
            customInput.value = label.textContent.replace('$', '').trim();
        }
    }

    radioButtons.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.id !== "custom-amount" && radio.id !== "d-custom" && radio.value !== "custom") {
                const label = radio.nextElementSibling;
                if (label) {
                    customInput.value = label.textContent.replace('$', '').trim();
                }
            }
        });
    });

    customInput.addEventListener("focus", () => {
        const selectedRadio = document.querySelector('input[name="donate-amount"]:checked');
        if (selectedRadio && selectedRadio.id !== "custom-amount" && selectedRadio.id !== "d-custom") {
            selectedRadio.checked = true;
        }
    });
});
