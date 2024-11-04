// Constants for milestone percentages
const FIRST_MILESTONE_PERCENT = 0.33;
const SECOND_MILESTONE_PERCENT = 0.66;

// DOM Elements
const elements = {
    textContainer: document.getElementById("textContainer"),
    textArea: document.getElementById("textBox"),
    wordCount: document.getElementById("totalWordCount"),
    currentWordCount: document.getElementById("countText"),
    goalDisplay: document.getElementById("goalCount"),
    goalForm: document.getElementById("goalInput")
};

// State management
let state = {
    goalWordCount: 0,
    firstMilestone: 0,
    secondMilestone: 0
};

// Calculate milestones based on goal
function calculateMilestones(goal) {
    return {
        firstMilestone: Math.floor(goal * FIRST_MILESTONE_PERCENT),
        secondMilestone: Math.floor(goal * SECOND_MILESTONE_PERCENT)
    };
}

// Update the display with new word count
function updateWordCountDisplay(currentCount) {
    elements.currentWordCount.innerText = currentCount.toString();
    elements.goalDisplay.innerText = state.goalWordCount.toString();

    // Update colors based on progress
    if (currentCount >= state.goalWordCount) {
        elements.wordCount.style.color = "var(--clr-goal-count)";
        elements.currentWordCount.style.color = "var(--clr-goal-count)";
    } else if (currentCount >= state.firstMilestone && currentCount <= state.goalWordCount) {
        elements.wordCount.style.color = "var(--clr-text)";
        elements.currentWordCount.style.color = "var(--clr-mid-count)";
    } else {
        elements.wordCount.style.color = "var(--clr-text)";
        elements.currentWordCount.style.color = "var(--clr-low-count)";
    }
}

// Handle text input
elements.textArea.addEventListener("input", (e) => {
    const text = e.target.value;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    updateWordCountDisplay(wordCount);
});

// Handle goal submission
elements.goalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGoal = parseInt(formData.get("goal"), 10) || 0;

    // Update state
    state.goalWordCount = newGoal;
    const { firstMilestone, secondMilestone } = calculateMilestones(newGoal);
    state.firstMilestone = firstMilestone;
    state.secondMilestone = secondMilestone;

    elements.goalForm.style.display = "none";
    elements.textContainer.style.display = "block";

    // Update display
    updateWordCountDisplay(elements.textArea.value.trim().split(/\s+/).length);
});

