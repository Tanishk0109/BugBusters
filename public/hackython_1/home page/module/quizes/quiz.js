// Redirect to a specific quiz page
function redirectToQuiz(quizPage) {
    window.location.href = quizPage;
}

// Check the answer and provide feedback
function checkAnswer(answer) {
    let resultDiv = document.getElementById("result");

    if (answer === 'correct') {
        resultDiv.innerHTML = "Correct! Well done!";
        resultDiv.style.color = "green";
    } else {
        resultDiv.innerHTML = "Incorrect! Try again.";
        resultDiv.style.color = "red";
    }
}
