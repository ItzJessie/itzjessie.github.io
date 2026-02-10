const toggleButtons = document.querySelectorAll(".toggle__button");
const minutesSection = document.getElementById("exercise-minutes");
const countdownSection = document.getElementById("exercise-countdown");

const minutesForm = document.getElementById("minutes-form");
const minutesResult = document.getElementById("minutes-result");
const minutesRange = document.getElementById("minutes-range");
const minutesValue = document.getElementById("minutes-value");
const countdownResult = document.getElementById("countdown-result");
const countdownMinutes = document.getElementById("countdown-minutes");
const countdownInput = document.getElementById("countdown-input");

const menuBar = document.querySelector(".menu-bar");
const menuToggle = document.querySelector(".menu-bar__toggle");
const menuLinks = document.querySelectorAll('.menu-bar__nav a[href^="#"]');

if (menuBar && menuToggle) {
	menuToggle.addEventListener("click", () => {
		const isOpen = menuBar.classList.toggle("is-open");
		menuToggle.setAttribute("aria-expanded", String(isOpen));
	});
}

const showSection = (target) => {
	const showMinutes = target === "minutes";
	minutesSection.classList.toggle("is-hidden", !showMinutes);
	countdownSection.classList.toggle("is-hidden", showMinutes);

	toggleButtons.forEach((button) => {
		const isActive = button.dataset.target === target;
		button.classList.toggle("is-active", isActive);
	});
};

toggleButtons.forEach((button) => {
	button.addEventListener("click", () => showSection(button.dataset.target));
});

menuLinks.forEach((link) => {
	link.addEventListener("click", (event) => {
		event.preventDefault();

		if (link.getAttribute("href") === "#exercise-minutes") {
			showSection("minutes");
			return;
		}

		if (link.getAttribute("href") === "#exercise-countdown") {
			showSection("countdown");
		}
	});
});

const updateMinutesMessage = (value) => {
	minutesValue.textContent = String(value);

	if (value > 45) {
		minutesResult.textContent = "Let's have bacon and eggs! \ud83e\udd53\ud83e\udd5a";
		return;
	}

	if (value >= 30 && value <= 45) {
		minutesResult.textContent = "Plenty of time to relax. \ud83e\udd8a";
		return;
	}

	if (value >= 15 && value < 30) {
		minutesResult.textContent = "Grab your things soon. \u23f3";
		return;
	}

	minutesResult.textContent = "Less than 15 minutes. Hurry to class! \ud83c\udfc3\u200d\u2640\ufe0f";
};

if (minutesRange) {
	minutesRange.addEventListener("input", (event) => {
		updateMinutesMessage(Number(event.target.value));
	});

	updateMinutesMessage(Number(minutesRange.value));
}

const applyCountdownMessage = (diffMinutes) => {
	if (diffMinutes > 15) {
		countdownResult.textContent = "More than 15 minutes left. Start a mini dance party. \ud83d\udc83";
		return;
	}

	if (diffMinutes >= 10) {
		countdownResult.textContent = "Quick snack time. \ud83c\udf6a";
		return;
	}

	if (diffMinutes >= 5) {
		countdownResult.textContent = "Pack up and head out. \ud83c\udf92";
		return;
	}

	if (diffMinutes >= 0) {
		countdownResult.textContent = "Power walk to class! \ud83d\ude80";
		return;
	}

	if (diffMinutes >= -5) {
		countdownResult.textContent = "Class started up to 5 minutes ago. Slide in quietly. \ud83d\udc40";
		return;
	}

	if (diffMinutes >= -15) {
		countdownResult.textContent = "Class started up to 15 minutes ago. Try to catch up fast. \ud83e\udd79";
		return;
	}

	countdownResult.textContent = "Class started more than 15 minutes ago. Take a deep breath and check in. \u26a0\ufe0f";
};

const updateCountdownFromInput = () => {
	const diffMinutes = Number(countdownInput?.value);

	if (Number.isNaN(diffMinutes)) {
		countdownMinutes.textContent = "0";
		countdownResult.textContent = "Enter minutes until class to see your message. \ud83e\udded";
		return;
	}

	countdownMinutes.textContent = String(Math.abs(diffMinutes));
	applyCountdownMessage(diffMinutes);
};

if (countdownInput) {
	countdownInput.addEventListener("input", updateCountdownFromInput);
	updateCountdownFromInput();
}

showSection("minutes");
