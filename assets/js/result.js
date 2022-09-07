// Waits for the DOM to finish loading before showing Score Results.
document.addEventListener('DOMContentLoaded', function() {
    showScoreResult();
})

/**
 * Gets score result from local storage and
 * shows score result on result page
 */
function showScoreResult() {
    const scoreResult = localStorage.getItem('scoreResult');
    const scoreResultEl = document.querySelector('#score-result');
    scoreResultEl.innerHTML = scoreResult;
}