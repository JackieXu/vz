(function () {
    "use strict";

    var emailForms = document.querySelectorAll('.invite-form'),
        phoneScreens = document.querySelectorAll('.phone-image'),
        explanationCells = document.querySelectorAll('.explanation-cell'),
        explanationBars = document.querySelectorAll('.progress-bar'),
        explanationCellBars = document.querySelectorAll('.progress-bar-filled'),
        currentScreenIndex = 0;

    [].forEach.call(emailForms, function (form) {
        form.addEventListener('submit', function (event) {
            event.stopPropagation();
            event.preventDefault();

            console.log('Hi');

            return false;
        }, false);
    });

    [].forEach.call(explanationCells, function (cell, index) {
        cell.addEventListener('click', function () {

        }, false);
    });

    function renderScreens() {
        var currentCellBar = explanationCellBars[currentScreenIndex],
            width = parseInt(currentCellBar.style.width, 10) || 0;

        width = (width + 25) % 125;

        if (width === 0) {
            currentScreenIndex = (currentScreenIndex + 1) % 3;

            [].forEach.call(phoneScreens, function (screen, index) {
                screen.classList.toggle('visible', index === currentScreenIndex);
            });

            [].forEach.call(explanationCells, function (cell, index) {
                cell.classList.toggle('active', index === currentScreenIndex);
            });

            [].forEach.call(explanationBars, function (bar, index) {
                bar.classList.toggle('hidden', index !== currentScreenIndex);
                bar.classList.toggle('active', index === currentScreenIndex);
            });
        }

        currentCellBar.style.width = width + '%';

        setTimeout(renderScreens, 1000);
    }

    renderScreens();
}());