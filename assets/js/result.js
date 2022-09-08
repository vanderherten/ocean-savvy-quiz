// Waits for the DOM to finish loading before showing Score Results.
document.addEventListener('DOMContentLoaded', function() {
    showScoreResult();
})

/**
 * Gets score result from local storage and shows score result on result page.
 * Gets max points available from local storage and shows max points result on result page.
 */
function showScoreResult() {
    const scoreResult = localStorage.getItem('scoreResult');
    const scoreResultEl = document.querySelector('#score-result');
    scoreResultEl.innerHTML = scoreResult;

    const maxPointsResult = localStorage.getItem('maxPointsResult');
    const maxPointsResultEl = document.querySelector('#max-points-result');
    maxPointsResultEl.innerHTML = maxPointsResult;
}