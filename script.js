// Basic startup confirmation for browser console.
console.log("Personal website loaded.");

const statusText = document.querySelector("#status-text");
const contactBtn = document.querySelector("#contact-btn");
const contactMsg = document.querySelector("#contact-msg");
const sections = document.querySelectorAll("main section");

if (statusText) {
	statusText.textContent = "I build research-driven insights on economics and public policy.";
}

if (contactBtn && contactMsg) {
	contactBtn.addEventListener("click", () => {
		contactMsg.innerHTML = "Thank you! Write me at: <a class=\"mail-link\" href=\"mailto:pietro.fraccaroli00@gmail.com\">pietro.fraccaroli00@gmail.com</a>";
	});
}

// Progressive reveal keeps the page dynamic without heavy animations.
if (sections.length > 0) {
	sections.forEach((section) => section.classList.add("reveal"));

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.2 }
	);

	sections.forEach((section) => observer.observe(section));
}
