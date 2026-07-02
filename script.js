document.addEventListener("DOMContentLoaded", () => {
    const masterQuestions = [
        { id: 1, text: "✨ First Impression naton sa isa't isa?" },
        { id: 2, text: "🍕 Ano ang ideal first date food para sa imo?" },
        { id: 3, text: "💭 Isa ka thing nga na-appreciate mo sa akon?" },
        { id: 4, text: "🎵 Ano nga kanta ang naga-remind sa imo sa akon?" },
        { id: 5, text: "🗺️ Diin ang dream travel destination mo?" },
        { id: 6, text: "☕ Coffee date ukon late night drive?" }
    ];

    let selectedQuestionIds = [];
    let selectedQuestionTexts = [];
    let recipientAnswers = {};
    let currentQuestionIndex = 0;
    let userData = {};

    // DOM Elements Declarations
    const senderForm = document.getElementById("senderForm");
    const screenLanding = document.getElementById("screen-landing");
    const screenQuestions = document.getElementById("screen-questions");
    const screenRecipientIntro = document.getElementById("screen-recipient-intro");
    const screenQuestionViewer = document.getElementById("screen-question-viewer");
    
    const questionsGrid = document.getElementById("questionsGrid");
    const questionCounter = document.getElementById("questionCounter");
    const btnContinueToFlow = document.getElementById("btnContinueToFlow");
    const btnStartAnswering = document.getElementById("btnStartAnswering");
    const btnNextQuestion = document.getElementById("btnNextQuestion");
    
    const recipientDisplayNames = document.querySelectorAll(".recipient-display-name");
    const senderDisplayName = document.getElementById("senderDisplayName");
    const currentQuestionText = document.getElementById("currentQuestionText");
    const recipientAnswerField = document.getElementById("recipientAnswerField");
    const viewerStepCounter = document.getElementById("viewerStepCounter");

    // 1. Transition: Landing to Question Picker
    senderForm.addEventListener("submit", (e) => {
        e.preventDefault();

        userData = {
            senderName: document.getElementById("senderName").value.trim(),
            senderEmail: document.getElementById("senderEmail").value.trim(),
            recipientName: document.getElementById("recipientName").value.trim()
        };

        recipientDisplayNames.forEach(el => el.textContent = userData.recipientName);
        renderQuestionCards();

        screenLanding.classList.remove("active");
        screenQuestions.classList.add("active");
    });

    // 2. Render Cards Generation Engine
    function renderQuestionCards() {
        questionsGrid.innerHTML = "";
        
        masterQuestions.forEach(q => {
            const card = document.createElement("div");
            card.className = "glass-card question-card";
            card.style.cursor = "pointer";
            card.style.marginBottom = "14px";
            card.style.transition = "all 0.2s ease";
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; text-align:left;">
                    <p style="font-weight:500; font-size:0.95rem; padding-right:10px; margin:0;">${q.text}</p>
                    <span class="checkbox-indicator" style="color: #ccc;"><i class="fa-regular fa-circle"></i></span>
                </div>
            `;

            card.addEventListener("click", () => {
                const idIndex = selectedQuestionIds.indexOf(q.id);
                
                if (idIndex > -1) {
                    // Remove card state arrays
                    selectedQuestionIds.splice(idIndex, 1);
                    const textIndex = selectedQuestionTexts.indexOf(q.text);
                    if (textIndex > -1) selectedQuestionTexts.splice(textIndex, 1);

                    card.style.borderColor = "rgba(255, 255, 255, 0.4)";
                    card.style.background = "rgba(255, 255, 255, 0.75)";
                    card.querySelector(".checkbox-indicator").innerHTML = `<i class="fa-regular fa-circle"></i>`;
                    card.querySelector(".checkbox-indicator").style.color = "#ccc";
                } else {
                    // Secure capping validation check
                    if (selectedQuestionIds.length < 3) {
                        selectedQuestionIds.push(q.id);
                        selectedQuestionTexts.push(q.text);
                        card.style.borderColor = "#FF69B4";
                        card.style.background = "rgba(255, 240, 245, 0.9)";
                        card.querySelector(".checkbox-indicator").innerHTML = `<i class="fa-solid fa-circle-check" style="color:#FF1493;"></i>`;
                    }
                }

                questionCounter.textContent = `❤️ Selected: ${selectedQuestionIds.length} / 3`;
                
                if (selectedQuestionIds.length === 3) {
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

    // 3. Transition: Question Selection to Recipient Welcome Intro
    btnContinueToFlow.addEventListener("click", () => {
        senderDisplayName.textContent = userData.senderName;
        screenQuestions.classList.remove("active");
        screenRecipientIntro.classList.add("active");
    });

    // 4. Transition: Recipient Welcome Intro to Question Viewer Matrix
    btnStartAnswering.addEventListener("click", () => {
        screenRecipientIntro.classList.remove("active");
        screenQuestionViewer.classList.add("active");
        currentQuestionIndex = 0;
        loadActiveQuestionIntoView();
    });

    // 5. Active Loader Loop Engine
    function loadActiveQuestionIntoView() {
        recipientAnswerField.value = ""; // Auto clean fields
        viewerStepCounter.textContent = `Question ${currentQuestionIndex + 1} of 3`;
        currentQuestionText.textContent = selectedQuestionTexts[currentQuestionIndex];
        
        if (currentQuestionIndex === 2) {
            btnNextQuestion.innerHTML = `Unlock Final Surprise <i class="fa-solid fa-lock-open"></i>`;
        } else {
            btnNextQuestion.innerHTML = `Next Question <i class="fa-solid fa-chevron-right"></i>`;
        }
    }

    // 6. Loop Action Multiplier Handler
    btnNextQuestion.addEventListener("click", () => {
        const currentAnswer = recipientAnswerField.value.trim();
        
        if (currentAnswer === "") {
            alert("Oops! Please write an answer first before continuing! 🌸");
            return;
        }

        // Save target prompt index records
        recipientAnswers[`question_${currentQuestionIndex + 1}`] = {
            prompt: selectedQuestionTexts[currentQuestionIndex],
            answer: currentAnswer
        };

        if (currentQuestionIndex < 2) {
            currentQuestionIndex++;
            loadActiveQuestionIntoView();
        } else {
            console.log("🌸 Aniela Co. System Log - Complete Answers Stored:", recipientAnswers);
            alert("Bwas naman ang pinaka-romantic part, ang Step 5: YES or NO interactive game! Stay tuned, CEO!");
            // Diri ma insert ang final matching page bwas!
        }
    });
});
