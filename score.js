document.addEventListener("DOMContentLoaded", function () {
    const score = parseInt(localStorage.getItem("quizScore")) || 0;
    const totalQuestions = parseInt(localStorage.getItem("totalQuestions")) || 0;
    const scoreDisplay = document.getElementById("scoreDisplay");
    const remarkDisplay = document.getElementById("remark");

    scoreDisplay.innerHTML = `Your Score: <strong>${score}/${totalQuestions}</strong>`;

    // Display remarks based on performance
    if (score === totalQuestions) {
        remarkDisplay.innerHTML = `<span class="text-success remark excellent">🌟 Excellent! Perfect Score!</span>`;
    } else if (score >= totalQuestions * 0.7) {
        remarkDisplay.innerHTML = `<span class="text-primary remark good">👍 Good Job! Keep Practicing.</span>`;
    } else if (score >= totalQuestions * 0.4) {
        remarkDisplay.innerHTML = `<span class="text-warning remark average">🤔 You Can Do Better!</span>`;
    } else {
        remarkDisplay.innerHTML = `<span class="text-danger remark poor">❌ Try Again! Keep Learning.</span>`;
    }
});

// Function to restart the quiz
function restartQuiz() {
    localStorage.clear(); // Clear all stored answers & score
    window.location.href = "index.html"; // Redirect back to the quiz
}
