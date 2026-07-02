document.addEventListener("DOMContentLoaded", () => {
    // Repository Array para sa mga Premium Prompts naton
    const masterQuestions = [
        { id: 1, text: "✨ First Impression naton sa isa't isa?" },
        { id: 2, text: "🍕 Ano ang ideal first date food para sa imo?" },
        { id: 3, text: "💭 Isa ka thing nga na-appreciate mo sa akon?" },
        { id: 4, text: "🎵 Ano nga kanta ang naga-remind sa imo sa akon?" },
        { id: 5, text: "🗺️ Diin ang dream travel destination mo?" },
        { id: 6, text: "☕ Coffee date ukon late night drive?" }
    ];

    let selectedQuestions = [];
    let userData = {};

    const senderForm = document.getElementById("senderForm");
    const screenLanding = document.getElementById("screen-landing");
    const screenQuestions = document.getElementById("screen-questions");
    const questionsGrid = document.getElementById("questionsGrid");
    const questionCounter = document.getElementById("questionCounter");
    const btnContinueToFlow = document.getElementById("btnContinueToFlow");
    const dynamicRecipient = document.getElementById("dynamicRecipient");

    // 1. Transition halin sa Landing padulong sa Question Picker
    senderForm.addEventListener("submit", (e) => {
        e.preventDefault();

        userData = {
            senderName: document.getElementById("senderName").value.trim(),
            senderEmail: document.getElementById("senderEmail").value.trim(),
            recipientName: document.getElementById("recipientName").value.trim()
        };

        // Personalize ang text sa Screen 2 gamit ang name ni Khylle
        dynamicRecipient.textContent = userData.recipientName;

        // I-render na ang cards dynamically sa screen
        renderQuestionCards();

        // Switch Screen seamlessly
        screenLanding.classList.remove("active");
        screenQuestions.classList.add("active");
    });

    // 2. Function para mag-generate sang Premium Cards dynamically
    function renderQuestionCards() {
        questionsGrid.innerHTML = ""; // Clear wrapper standard check
        
        masterQuestions.forEach(q => {
            const card = document.createElement("div");
            card.className = "glass-card question-card";
            card.style.cursor = "pointer";
            card.style.marginBottom = "14px";
            card.style.transition = "all 0.2s ease";
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; text-align:left;">
                    <p style="font-weight:500; font-size:0.95rem; padding-right:10px;">${q.text}</p>
                    <span class="checkbox-indicator" style="color: #ccc;"><i class="fa-regular fa-circle"></i></span>
                </div>
            `;

            // Card click toggle state engine
            card.addEventListener("click", () => {
                const index = selectedQuestions.indexOf(q.id);
                
                if (index > -1) {
                    // Kung i-uncheck
                    selectedQuestions.splice(index, 1);
                    card.style.borderColor = "rgba(255, 255, 255, 0.4)";
                    card.style.background = "rgba(255, 255, 255, 0.75)";
                    card.querySelector(".checkbox-indicator").innerHTML = `<i class="fa-regular fa-circle"></i>`;
                    card.querySelector(".checkbox-indicator").style.color = "#ccc";
                } else {
                    // Kung i-check pero dapat max 3 gid lang
                    if (selectedQuestions.length < 3) {
                        selectedQuestions.push(q.id);
                        card.style.borderColor = "#FF69B4";
                        card.style.background = "rgba(255, 240, 245, 0.9)";
                        card.querySelector(".checkbox-indicator").innerHTML = `<i class="fa-solid fa-circle-check" style="color:#FF1493;"></i>`;
                    }
                }

                // Update system counters & validation state
                questionCounter.textContent = `❤️ Selected: ${selectedQuestions.length} / 3`;
                
                if (selectedQuestions.length === 3) {
                    btnContinueToFlow.disabled = false;
                    btnContinueToFlow.style.opacity = "1";
                } else {
                    btnContinueToFlow.disabled = true;
                    btnContinueToFlow.style.opacity = "0.5";
                }
            });

            questionsGrid.appendChild(card);
        });
    }
});
