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
    let userData = {};

    // Elements
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

    // 1. Landing View Controls
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

    // 2. Dynamic Card Injection
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
                    card.querySelector(".checkbox-indicator").style.color = "#ccc";
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

    // 3. Routing Loops
    btnContinueToFlow.addEventListener("click", () => {
        senderDisplayName.textContent = userData.senderName;
        screenQuestions.classList.remove("active");
        screenRecipientIntro.classList.add("active");
    });

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
            btnNextQuestion.innerHTML = `Complete Setup <i class="fa-solid fa-lock-open"></i>`;
        } else {
            btnNextQuestion.innerHTML = `Next Prompt <i class="fa-solid fa-chevron-right"></i>`;
        }
    }

    btnNextQuestion.addEventListener("click", () => {
        const currentAnswer = recipientAnswerField.value.trim();
        if (currentAnswer === "") {
            alert("Please fill in your answer before moving to the next prompt! ✨");
            return;
        }

        recipientAnswers[`question_${currentQuestionIndex + 1}`] = {
            prompt: selectedQuestionTexts[currentQuestionIndex],
            answer: currentAnswer
        };

        if (currentQuestionIndex < 2) {
            currentQuestionIndex++;
            loadActiveQuestionIntoView();
        } else {
            console.log("Aniela Co. Final Records Saved:", recipientAnswers);
            alert("Excellent! All answers have been saved into the vault. Next step ready whenever you are! 🚀");
        }
    });
});
