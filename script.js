document.addEventListener("DOMContentLoaded", () => {
    const senderForm = document.getElementById("senderForm");
    const btnContinue = document.getElementById("btnContinueToQuestions");

    // Form Listener
    senderForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Di anay mag-reload ang page

        // 1. Makuha ang mga input data para ready na sa memory
        const data = {
            senderName: document.getElementById("senderName").value.trim(),
            senderEmail: document.getElementById("senderEmail").value.trim(),
            recipientName: document.getElementById("recipientName").value.trim()
        };

        console.log("🌸 Aniela Co. Debugger - Data Saved:", data);

        // 2. Alert anay subong para mabal-an mo nga naggana ang interaction!
        alert(`Hello ${data.senderName}! Na-save na naton ang info. Next step bwas amo ang Question Cards para kay ${data.recipientName}!`);
        
        // Diri naton i-inject ang screen transition function bwas!
    });
});
