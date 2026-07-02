document.addEventListener("DOMContentLoaded", () => {
    // Premium Master English Lists
    const masterQuestions = [
        { id: 1, text: "🍓 Sweet or Savory?" },
        { id: 2, text: "🌙 Night date or Morning date?" },
        { id: 3, text: "🍿 Netflix or Karaoke?" },
        { id: 4, text: "📚 Bookstore or Mall?" },
        { id: 5, text: "🌧️ Rainy-day date or Sunny-day date?" },
        { id: 6, text: "🧋 Milk tea or Coffee?" },
        { id: 7, text: "🚗 Road trip or Staycation?" },
        { id: 8, text: "🌹 Flowers or Handwritten letters?" },
        { id: 9, text: "🎢 Theme park or Museum?" },
        { id: 10, text: "📸 Taking pictures or Living in the moment?" },
        { id: 11, text: "🍔 Fast food or Fancy restaurant?" },
        { id: 12, text: "🐱 Cats or Dogs?" },
        { id: 13, text: "🎂 Cake or Ice cream?" },
        { id: 14, text: "💃 Dancing or Singing?" },
        { id: 15, text: "🧩 Board games or Video games?" },
        { id: 16, text: "🌅 What's your ideal first date?" },
        { id: 17, text: "☕ Coffee date, dinner date, picnic, or arcade?" },
        { id: 18, text: "🍕 What's your go-to comfort food?" },
        { id: 19, text: "🎬 Movies at home or going out on an adventure?" },
        { id: 20, text: "🌊 Beach, mountains, or city lights for a date?" },
        { id: 21, text: "🎵 What's your favorite music genre or artist?" }
    ];

    let selectedQuestionIds = [];
    let selectedQuestionTexts = [];
    let recipientAnswers = {};
    let currentQuestionIndex = 0;
    
    // URL Link Parsing Engine (Checks if the user opening the link is the Recipient)
    const urlParams = new URLSearchParams(window.location.search);
    const isRecipientMode = urlParams.get("mode") === "recipient";

    // DOM Elements
    const screenLanding = document.getElementById("screen-landing");
    const screenQuestions = document.getElementById("screen-questions");
    const screenRecipientIntro = document.getElementById("screen-recipient-intro");
    const screenQuestionViewer = document.getElementById("screen-question-viewer");
    
    const senderForm = document.getElementById("senderForm");
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

    // ==========================================
    // 🌍 ROUTING CONTROLLER
    // ==========================================
    if (isRecipientMode) {
        // Recipient Mode: Khylle / Client's partner opens the generated unique link
        const recipientNameParam = urlParams.get("rec") || "Special Someone";
        const senderNameParam = urlParams.get("send") || "Someone Special";
        
        selectedQuestionTexts = [
            urlParams.get("q1"),
            urlParams.get("q2"),
            urlParams.get("q3")
        ].filter(Boolean);

        if (selectedQuestionTexts.length < 3) {
            selectedQuestionTexts = [
                "🍓 Sweet or Savory?",
                "🌙 Night date or Morning date?",
                "🍿 Netflix or Karaoke?"
            ];
        }

        recipientDisplayNames.forEach(el => el.textContent = recipientNameParam);
        senderDisplayName.textContent = senderNameParam;

        screenLanding.classList.remove("active");
        screenRecipientIntro.classList.add("active");

    } else {
        // Normal Mode: Your Paying Customer (The Sender) configures the form
        screenLanding.classList.add("active");
    }

    // ==========================================
    // ✍️ FLOW A: CUSTOMER PIPELINE (The Sender)
    // ==========================================
    senderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const rName = document.getElementById("recipientName").value.trim();
        recipientDisplayNames.forEach(el => el.textContent = rName);
        
        renderQuestionCards();
        screenLanding.classList.remove("active");
        screenQuestions.classList.add("active");
    });

    function renderQuestionCards() {
        questionsGrid.innerHTML = "";
        masterQuestions.forEach(q => {
            const card = document.createElement("div");
            card.className = "glass-card question-card";
            card.style.cursor = "pointer";
            card.style.marginBottom = "12px";
            card.style.padding = "18px 20px";
            card.style.transition = "all 0.2s ease";
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; text-align:left;">
                    <p style="font-weight:500; font-size:0.95rem; margin:0; color:var(--text-dark);">${q.text}</p>
                    <span class="checkbox-indicator" style="color: #ccc;"><i class="fa-regular fa-circle"></i></span>
                </div>
            `;

            card.addEventListener("click", () => {
                const idIndex = selectedQuestionIds.indexOf(q.id);
                if (idIndex > -1) {
                    selectedQuestionIds.splice(idIndex, 1);
                    const textIndex = selectedQuestionTexts.indexOf(q.text);
                    if (textIndex > -1) selectedQuestionTexts.splice(textIndex, 1);

                    card.style.borderColor = "rgba(255, 255, 255, 0.4)";
                    card.style.background = "rgba(255, 255, 255, 0.75)";
                    card.querySelector(".checkbox-indicator").innerHTML = `<i class="fa-regular fa-circle"></i>`;
                } else {
                    if (selectedQuestionIds.length < 3) {
                        selectedQuestionIds.push(q.id);
                        selectedQuestionTexts.push(q.text);
                        card.style.borderColor = "#FF69B4";
                        card.style.background = "rgba(255, 240, 245, 0.9)";
                        card.querySelector(".checkbox-indicator").innerHTML = `<i class="fa-solid fa-circle-check" style="color:#FF1493;"></i>`;
                    }
                }

                questionCounter.textContent = `✨ Selected: ${selectedQuestionIds.length} / 3`;
                btnContinueToFlow.disabled = (selectedQuestionIds.length !== 3);
                btnContinueToFlow.style.opacity = (selectedQuestionIds.length === 3) ? "1" : "0.5";
            });
            questionsGrid.appendChild(card);
        });
    }

    // 🔗 GENERATE DYNAMIC LINK FOR CUSTOMER TO COPY
    btnContinueToFlow.addEventListener("click", () => {
        const sName = document.getElementById("senderName").value.trim();
        const sEmail = document.getElementById("senderEmail").value.trim();
        const rName = document.getElementById("recipientName").value.trim();

        const baseUrl = window.location.origin + window.location.pathname;
        // The sender email parameter is attached securely into the string framework
        const generatedLink = `${baseUrl}?mode=recipient&send=${encodeURIComponent(sName)}&email=${encodeURIComponent(sEmail)}&rec=${encodeURIComponent(rName)}&q1=${encodeURIComponent(selectedQuestionTexts[0])}&q2=${encodeURIComponent(selectedQuestionTexts[1])}&q3=${encodeURIComponent(selectedQuestionTexts[2])}`;

        alert(`🎉 YOUR PERSONALIZED VAULT IS READY!\n\nPlease copy the generated link below and send it to your recipient.`);
        prompt("Copy this link to your clipboard:", generatedLink);
        
        // Return your main app link back to fresh configuration state
        window.location.href = baseUrl;
    });


    // ==========================================
    // 💌 FLOW B: RECIPIENT SUBMISSION ENGINE
    // ==========================================
    btnStartAnswering.addEventListener("click", () => {
        screenRecipientIntro.classList.remove("active");
        screenQuestionViewer.classList.add("active");
        currentQuestionIndex = 0;
        loadActiveQuestionIntoView();
    });

    function loadActiveQuestionIntoView() {
        recipientAnswerField.value = ""; 
        viewerStepCounter.textContent = `Prompt ${currentQuestionIndex + 1} of 3`;
        currentQuestionText.textContent = selectedQuestionTexts[currentQuestionIndex];
        
        if (currentQuestionIndex === 2) {
            btnNextQuestion.innerHTML = `Submit Responses <i class="fa-solid fa-paper-plane"></i>`;
        } else {
            btnNextQuestion.innerHTML = `Next Prompt <i class="fa-solid fa-chevron-right"></i>`;
        }
    }

    btnNextQuestion.addEventListener("click", () => {
        const currentAnswer = recipientAnswerField.value.trim();
        if (currentAnswer === "") {
            alert("Please type your response before continuing! ✨");
            return;
        }

        recipientAnswers[`Prompt_${currentQuestionIndex + 1}`] = {
            Question: selectedQuestionTexts[currentQuestionIndex],
            Answer: currentAnswer
        };

        if (currentQuestionIndex < 2) {
            currentQuestionIndex++;
            loadActiveQuestionIntoView();
        } else {
            btnNextQuestion.disabled = true;
            btnNextQuestion.innerHTML = `Submitting... <i class="fa-solid fa-spinner fa-spin"></i>`;

            // BUSINESS RE-ROUTING ARCHITECTURE:
            // Extract the Customer's own email from the URL parameter stack!
            const customerEmail = urlParams.get("email");
            const senderIdentity = urlParams.get("send");
            const recipientTarget = urlParams.get("rec");
            
            const emailFormData = new FormData();
            
            // 🚨 FORMSPREE DYNAMIC REPLY-TO OVERRIDE ARCHITECTURE
            // This maps the ingestion routing dynamically so it hits the specific customer's records!
            emailFormData.append("_replyto", customerEmail); 
            emailFormData.append("_subject", `✨ Vault Responses Unlocked from ${recipientTarget}!`);
            emailFormData.append("Hey Customer! Here are the answers from", recipientTarget);
            emailFormData.append("Created By (Your Name)", senderIdentity);
            emailFormData.append(`[1] ${recipientAnswers.Prompt_1.Question}`, recipientAnswers.Prompt_1.Answer);
            emailFormData.append(`[2] ${recipientAnswers.Prompt_2.Question}`, recipientAnswers.Prompt_2.Answer);
            emailFormData.append(`[3] ${recipientAnswers.Prompt_3.Question}`, recipientAnswers.Prompt_3.Answer);

            // Using the Aniela Digital Co. core centralized endpoint token
            fetch("https://formspree.io/f/xvggpzee", {
                method: "POST",
                body: emailFormData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert(`✨ Sent! Your responses have been successfully submitted back to ${senderIdentity}'s vault profile!`);
                    btnNextQuestion.innerHTML = `Submitted! ✅`;
                } else {
                    alert("Submission anomaly detected. Please try clicking submit again.");
                    btnNextQuestion.disabled = false;
                }
            })
            .catch(error => {
                console.error("Pipeline Breakdown:", error);
                alert("Network timeout. Please secure connection and try again.");
                btnNextQuestion.disabled = false;
            });
        }
    });
});
