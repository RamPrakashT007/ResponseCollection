document.addEventListener("DOMContentLoaded", function () {
    
    const form = document.getElementById("feedbackForm");
    const questionContainer = document.getElementById("question-container");
    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton");
    const trackerContainer = document.getElementById("tracker");

    let score = parseInt(localStorage.getItem("quizScore")) || 0;
    let currentQuestionIndex = 0;

    const questions = [
        {
            id: 1, image1: "image 1.1.jpeg", image2: "image 1.2.png", image3: "image 1.3.png",
            correctAnswer: "Option D",
            options: [
                { label: "Option A", image: "image 1.4.png" },
                { label: "Option B", image: "image 1.5.png" },
                { label: "Option C", image: "image 1.6.png" },
                { label: "Option D", image: "image 1.7.png" },
                { label: "Option E", image: "image 1.8.png" }
            ]
        },
        {
            id: 2, image1: "image2.1.png", image2: "image2.2.png", image3: "image2.3.png",
            correctAnswer: "Option B",
            options: [
                { label: "Option A", image: "image2.4.png" },
                { label: "Option B", image: "image2.5.png" },
                { label: "Option C", image: "image2.6.png" },
                { label: "Option D", image: "image2.7.png" },
                { label: "Option E", image: "image2.8.png" }
            ]
        },
        {
            id: 3, image1: "image3.1.png", image2: "image3.2.png", image3: "image3.3.png",
            correctAnswer: "Option B",
            options: [
                { label: "Option A", image: "image3.4.png" },
                { label: "Option B", image: "image3.5.png" },
                { label: "Option C", image: "image3.6.png" },
                { label: "Option D", image: "image3.7.png" },
                { label: "Option E", image: "image3.8.png" }
            ]
        },
        {
            id: 4, image1: "image4.1.png", image2: "image4.2.png", image3: "image4.3.png",
            correctAnswer: "Option B",
            options: [
                { label: "Option A", image: "image4.4.png" },
                { label: "Option B", image: "image4.5.png" },
                { label: "Option C", image: "image4.6.png" },
                { label: "Option D", image: "image4.7.png" },
                { label: "Option E", image: "image4.8.png" }
            ]
        },
        {
            id: 5, image1: "image5.1.png", image2: "image5.2.png", image3: "image5.3.png",
            correctAnswer: "Option B",
            options: [
                { label: "Option A", image: "image5.4.png" },
                { label: "Option B", image: "image5.5.png" },
                { label: "Option C", image: "image5.6.png" },
                { label: "Option D", image: "image5.7.png" },
                { label: "Option E", image: "image5.8.png" }
            ]
        }
    ];

    function updateTracker() {
        trackerContainer.innerHTML = "";
        questions.forEach((q, index) => {
            const savedAnswer = localStorage.getItem(`question_${q.id}_answer`);
            let boxColor = "red"; 

            if (savedAnswer) {
                boxColor = "green"; 
            } else if (document.querySelector(`input[name="Option"]:checked`)) {
                boxColor = "grey"; 
            }

            const box = document.createElement("div");
            box.classList.add("tracker-box", boxColor);
            box.textContent = index + 1; 
            trackerContainer.appendChild(box);
        });
    }

    function loadQuestion(index) {
        const question = questions[index];
        if (!question) return;

        questionContainer.innerHTML = `
            <h2>Q.No.${question.id}</h2>
            <div class="d-flex justify-content-center align-items-center gap-4">
                <img src="${question.image1}" class="img-fluid" alt="Example 1" style="max-width: 150px;">
                <h3>Is Rotated To</h3>
                <img src="${question.image2}" class="img-fluid" alt="Example 2" style="max-width: 150px;">
            </div>
            <h3 class="mt-3">As</h3>
            <img src="${question.image3}" class="img-fluid" alt="Example 3" style="max-width: 150px;">
            <h3>is Rotated To</h3>
            <div class="d-flex justify-content-center gap-4 flex-wrap">
                ${question.options.map(option => `
                    <label class="text-center">
                        <input type="radio" name="Option" value="${option.label}">
                        <br> <img src="${option.image}" class="img-fluid" alt="${option.label}" style="max-width: 120px;">
                        <br> ${option.label}
                    </label>
                `).join('')}
            </div>
            <div class="mt-3">
                <button type="button" id="clearButton" class="btn btn-warning">Clear Response</button>
            </div>
        `;

        const savedAnswer = localStorage.getItem(`question_${question.id}_answer`);
        if (savedAnswer) {
            document.querySelector(`input[value="${savedAnswer}"]`).checked = true;
        }

        prevButton.disabled = index === 0;
        nextButton.disabled = index === questions.length - 1;

        updateTracker();

        document.getElementById("clearButton").addEventListener("click", function () {
            localStorage.removeItem(`question_${question.id}_answer`);
            document.querySelectorAll('input[name="Option"]').forEach(input => input.checked = false);
            updateTracker();
        });
    }

    loadQuestion(currentQuestionIndex);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const selectedOption = document.querySelector('input[name="Option"]:checked');
        if (!selectedOption) {
            alert("Please select an option before saving.");
            return;
        }

        const question = questions[currentQuestionIndex];
        const userAnswer = selectedOption.value;
        localStorage.setItem(`question_${question.id}_answer`, userAnswer);
        updateTracker();

        if (userAnswer === question.correctAnswer) {
            score++;
        }

        if (currentQuestionIndex === questions.length - 1) {
            localStorage.setItem("quizScore", score);
            localStorage.setItem("totalQuestions", questions.length);
            window.location.href = "score.html";
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        }
    });

    prevButton.addEventListener("click", function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
    });
});
