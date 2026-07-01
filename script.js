// Global State to store application data
const appState = {
    senderName: "",
    senderEmail: "",
    receiverName: "",
    selectedQuestions: []
};

// Elements
const screen1 = document.getElementById("screen-1");
const screen2 = document.getElementById("screen-2");
const senderForm = document.getElementById("senderForm");
const countBadge = document.getElementById("select-count");
const submitBtn2 = document.getElementById("next-to-screen3");
const cards = document.querySelectorAll(".question-card");

// --- SCREEN 1 TRANSITION ---
senderForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Save inputs to our state
    appState.senderName = document.getElementById("senderName").value;
    appState.senderEmail = document.getElementById("senderEmail").value;
    appState.receiverName = document.getElementById("receiverName").value;

    // Smoothly switch screens using utility classes
    screen1.classList.add("hidden");
    screen2.classList.remove("hidden");
});

// --- SCREEN 2 CARD SELECTION LOGIC ---
cards.forEach(card => {
    card.addEventListener("click", () => {
        const questionId = card.getAttribute("data-id");
        
        if (card.classList.contains("selected")) {
            // Deselect card
            card.classList.remove("selected");
            appState.selectedQuestions = appState.selectedQuestions.filter(id => id !== questionId);
        } else {
            // Check if they already hit the limit of 3
            if (appState.selectedQuestions.length < 3) {
                card.classList.add("selected");
                appState.selectedQuestions.push(questionId);
            } else {
                // Shake effect or feedback can go here if they try to click a 4th!
                alert("You can only select exactly 3 questions! 💕");
            }
        }

        // Update the UI counter text
        countBadge.innerText = appState.selectedQuestions.length;

        // Unlock the continue button only if exactly 3 are selected
        if (appState.selectedQuestions.length === 3) {
            submitBtn2.removeAttribute("disabled");
            submitBtn2.classList.remove("disabled-btn");
        } else {
            submitBtn2.setAttribute("disabled", "true");
            submitBtn2.classList.add("disabled-btn");
        }
    });
});

// Next Screen Action handler
submitBtn2.addEventListener("click", () => {
    console.log("Proceeding to Screen 3 with choices: ", appState.selectedQuestions);
    // Next steps go here!
});
