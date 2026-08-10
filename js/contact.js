document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const button = document.querySelector(".contact-submit");
  const buttonText = button?.querySelector("span");
  const status = document.querySelector(".contact-status");

  if (!form || !button || !buttonText || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    button.disabled = true;
    button.classList.add("sending");
    buttonText.textContent = "SENDING...";
    status.textContent = "";
    status.className = "contact-status";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        button.classList.remove("sending");
        button.classList.add("success");
        buttonText.textContent = "MESSAGE SENT";
        status.classList.add("success");
        status.textContent = "Transmission received. I'll get back to within the next 24 to 48 hours.";

        form.reset();

        setTimeout(() => {
          button.classList.remove("success");
          buttonText.textContent = "SEND MESSAGE";
          status.textContent = "";
          status.className = "contact-status";
          button.disabled = false;
        }, 5000);

        return;
      }

      throw new Error(result.message || "Submission failed.");
    } catch (error) {
      button.classList.remove("sending");
      button.classList.add("error");
      buttonText.textContent = "SEND FAILED";
      status.classList.add("error");
      status.textContent = "Something went wrong. Please try again.";

      setTimeout(() => {
        button.classList.remove("error");
        buttonText.textContent = "SEND MESSAGE";
        status.textContent = "";
        status.className = "contact-status";
        button.disabled = false;
      }, 5000);
    }
  });
});